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
use tokio_tungstenite::{accept_async, tungstenite::Message};

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

    async fn relay_message(&self, sender_id: &str, msg: &str) {
        let json: Value = match serde_json::from_str(msg) {
            Ok(v) => v,
            Err(_) => {
                return;
            }
        };

        let event = match json.get("event").and_then(|v| v.as_str()) {
            Some(e) => e,
            None => {
                return;
            }
        };

        if json.get("data").is_none() {
            return;
        }

        let (channel, command) = match event.split_once(':') {
            Some((channel, command)) => (channel, command),
            None => {
                return;
            }
        };

        // If it's a relay command, handle registration/unregistration.
        if channel == "relay" {
            let data = match json.get("data").and_then(|v| v.as_str()) {
                Some(d) => d.to_string(),
                None => {
                    return;
                }
            };
            match command {
                "register" => {
                    let mut map = self.connections.lock().await;
                    if let Some(connection) = map.get_mut(sender_id) {
                        connection.register_function(data);
                    }
                }
                "unregister" => {
                    let mut map = self.connections.lock().await;
                    if let Some(connection) = map.get_mut(sender_id) {
                        connection.unregister_function(data);
                    }
                }
                _ => {
                    println!("{}> Unknown relay command: {}", sender_id, command);
                }
            }
            return;
        }

        let map = self.connections.lock().await;
        for (_, connection) in map.iter() {
            if connection
                .registered_functions
                .contains(&channel.to_string())
            {
                let msg = Message::Text(msg.into());
                let _ = connection.tx.unbounded_send(msg);
            }
        }

        println!("{}> Sent {}", sender_id, event);
    }

    async fn handle_connection(&self, raw_stream: TcpStream) {
        let stream = accept_async(raw_stream)
            .await
            .expect("Error during WebSocket handshake");

        // Split the websocket stream.
        let (mut write, read) = stream.split();

        // Create a channel for sending messages to this connection.
        let (tx, mut rx) = unbounded::<Message>();

        let id = self.connections.create_connection(tx).await;

        // Spawn a task that forwards messages from our rx channel to the websocket write sink.
        let id_clone = id.clone();
        let write_task = tauri::async_runtime::spawn(async move {
            while let Some(msg) = rx.next().await {
                if write.send(msg).await.is_err() {
                    println!("Error sending message to {}", &id_clone);
                    break;
                }
            }
        });

        // Process each incoming message.
        let read_task = read.try_for_each(|msg| {
            let id_clone = id.clone();
            async move {
                // Assume messages come as Text.
                let text = match msg.to_text() {
                    Ok(t) => t,
                    Err(e) => {
                        println!("Error reading text: {:?}", e);
                        return Ok(());
                    }
                };

                // Process this message.
                self.relay_message(&id_clone, text).await;
                Ok(())
            }
        });

        // Await both tasks concurrently.
        tokio::select! {
            _ = write_task => (),
            _ = read_task => (),
        }

        println!("{} disconnected", &id);
        // Remove the connection from the map.
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
                relay.handle_connection(raw_stream).await;
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
