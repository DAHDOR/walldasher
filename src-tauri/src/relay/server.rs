use std::sync::Arc;

use futures::{
    channel::mpsc::{unbounded, UnboundedReceiver, UnboundedSender},
    SinkExt, StreamExt, TryStreamExt,
};
use serde_json::Value;
use tauri::Manager;
use tokio::{
    net::{TcpListener, TcpStream},
    sync::Mutex,
};
use tokio_tungstenite::{accept_async, tungstenite::Message, WebSocketStream};

use crate::relay::connections::{ConnectionMap, ConnectionMapExt};

pub type RelayHandle = Arc<Relay>;

pub struct Relay {
    tx: UnboundedSender<Message>,
    rx: Mutex<UnboundedReceiver<Message>>,
    listener: TcpListener,
    connections: ConnectionMap,
}

impl Relay {
    async fn new() -> Result<Self, std::io::Error> {
        let (tx, rx) = unbounded();
        let listener = TcpListener::bind("localhost:49322").await?;
        let connections = ConnectionMap::default();
        Ok(Self {
            tx,
            rx: Mutex::new(rx),
            listener,
            connections,
        })
    }

    pub fn get_tx(&self) -> UnboundedSender<Message> {
        self.tx.clone()
    }

    async fn register(&self, id: &str, data: String) {
        let mut map = self.connections.lock().await;
        if let Some(connection) = map.get_mut(id) {
            connection.register_function(data);
        }
    }

    async fn unregister(&self, id: &str, data: String) {
        let mut map = self.connections.lock().await;
        if let Some(connection) = map.get_mut(id) {
            connection.unregister_function(data);
        }
    }

    async fn send_message(&self, event: &str, msg: &str) {
        let map = self.connections.lock().await;
        for (_, connection) in map.iter() {
            if connection.registered_functions.contains(&event.to_string()) {
                let msg = Message::Text(msg.into());
                let _ = connection.tx.unbounded_send(msg);
            }
        }
    }

    async fn relay_message(&self, sender_id: &str, msg: &str) {
        let json: Value = match serde_json::from_str(msg) {
            Ok(v) => v,
            Err(_) => return,
        };

        let event = match json.get("event").and_then(|v| v.as_str()) {
            Some(e) => e,
            None => return,
        };

        let data = match json.get("data").and_then(|v| v.as_str()) {
            Some(d) => d.to_string(),
            None => return,
        };

        let (channel, command) = match event.split_once(':') {
            Some((channel, command)) => (channel, command),
            None => return,
        };

        if channel == "relay" {
            match command {
                "register" => self.register(sender_id, data).await,
                "unregister" => self.unregister(sender_id, data).await,
                _ => println!("{}> Unknown relay command: {}", sender_id, command),
            }
            return;
        }

        self.send_message(event, msg).await;

        println!("{}> Sent {}", sender_id, event);
    }

    async fn handle_connection(&self, stream: WebSocketStream<TcpStream>) {
        let (mut write, read) = stream.split();

        let (tx, mut rx) = unbounded::<Message>();

        let id = self.connections.create_connection(tx).await;

        let id_clone = id.clone();
        let write_task = tauri::async_runtime::spawn(async move {
            while let Some(msg) = rx.next().await {
                if write.send(msg).await.is_err() {
                    println!("Error sending message to {}", &id_clone);
                }
            }
        });

        let read_task = read.try_for_each(|msg| {
            let id_clone = id.clone();
            async move {
                let text = match msg.to_text() {
                    Ok(t) => t,
                    Err(e) => {
                        println!("Error reading text: {:?}", e);
                        return Ok(());
                    }
                };
                self.relay_message(&id_clone, text).await;
                Ok(())
            }
        });

        tokio::select! {
            _ = write_task => (),
            _ = read_task => (),
        }

        println!("{} disconnected", &id);

        self.connections.lock().await.remove(&id);
    }

    fn handle_messages(self: Arc<Self>) {
        tauri::async_runtime::spawn(async move {
            let relay = self.clone();
            while let Some(msg) = relay.rx.lock().await.next().await {
                if let Message::Text(text) = msg {
                    relay.relay_message("server", &text).await;
                }
            }
        });
    }

    async fn handle_connections(self: Arc<Self>) {
        while let Ok((raw_stream, _)) = self.listener.accept().await {
            let relay = self.clone();
            tauri::async_runtime::spawn(async move {
                let stream = accept_async(raw_stream).await.expect("WS handshake error");
                relay.handle_connection(stream).await;
            });
        }
    }

    pub async fn run(self: Arc<Self>) {
        self.clone().handle_messages();
        self.handle_connections().await;
    }
}

pub fn spawn(app_handle: tauri::AppHandle) {
    tauri::async_runtime::spawn(async move {
        let relay = RelayHandle::new(Relay::new().await.unwrap());
        app_handle.manage::<RelayHandle>(relay.clone());
        relay.run().await;
    });
}
