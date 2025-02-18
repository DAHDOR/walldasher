use crate::relay::server::Relay;
use futures::channel::mpsc::{unbounded, UnboundedReceiver, UnboundedSender};
use futures_util::{future::FutureExt, SinkExt, StreamExt};
use serde_json::json;
use serde_json::Value;
use std::time::Duration;
use tauri::async_runtime::JoinHandle;
use tauri::{Manager, Runtime};
use tauri_plugin_store::StoreExt;
use tokio::io::AsyncWriteExt;
use tokio::net::TcpListener;
use tokio::sync::Mutex;
use tokio_tungstenite::{connect_async, tungstenite::Message};

pub type RL = Mutex<RLInner>;

pub struct RLInner {
    pub handle: Option<JoinHandle<()>>,
}

async fn connect(url: &String, server: UnboundedSender<Message>) {
    server
        .unbounded_send(
            json!({"event": "rl:connecting", "data": ""})
                .to_string()
                .into(),
        )
        .unwrap();
    let ws_stream = match connect_async(format!("ws://{}", url)).await {
        Ok((ws_stream, _)) => ws_stream,
        Err(e) => {
            println!("Failed to connect to WebSocket: {}", e);
            return;
        }
    };
    println!("WebSocket handshake has been successfully completed");
    server
        .unbounded_send(
            json!({"event": "rl:connected", "data": ""})
                .to_string()
                .into(),
        )
        .unwrap();

    let (_, read) = ws_stream.split();

    let ws_to_stdout = {
        read.for_each(|message| async {
            let data = message.unwrap().into_data();
            tokio::io::stdout().write_all(&data).await.unwrap();
        })
    };

    ws_to_stdout.await;
}

#[tauri::command]
pub async fn connect_to_rl<R: Runtime>(
    app: tauri::AppHandle<R>,
    url: String,
) -> Result<(), String> {
    if let Some(handle) = app.state::<RL>().lock().await.handle.take() {
        handle.abort();
    }

    let url_clone = url.clone();
    match app.store("store.json") {
        Ok(store) => {
            let _ = store.set("rl_url", url_clone);
        }
        Err(e) => {
            println!("Failed to save RL URL: {}", e);
        }
    };

    let server = app.state::<Relay>().inner().clone();

    let handle = tauri::async_runtime::spawn(async move {
        loop {
            connect(&url, server.clone()).await;
            server
                .unbounded_send(
                    json!({"event": "rl:disconnected", "data": ""})
                        .to_string()
                        .into(),
                )
                .unwrap();
            tokio::time::sleep(Duration::from_secs(5)).await;
        }
    });

    app.state::<RL>().lock().await.handle = Some(handle);

    Ok(())
}

#[cfg(test)]
mod tests {
    use tokio_tungstenite::accept_async;

    use super::*;

    // Helper to try to fetch a message from the channel with a timeout.
    async fn try_recv(rx: &mut UnboundedReceiver<Message>) -> Option<Message> {
        tokio::time::timeout(Duration::from_secs(1), rx.next())
            .await
            .ok()
            .flatten()
    }

    // Test when connection fails (e.g. invalid server address).
    #[tokio::test]
    async fn test_connect_failure() {
        let (tx, mut rx) = unbounded();
        // Use an address that is unlikely to be open.
        let invalid_url = "ws://127.0.0.1:59999".to_owned();
        // Call connect; it should send an "rl:connecting" event, then fail to connect.
        connect(&invalid_url, tx.clone()).await;

        // Check that we got a "rl:connecting" event.
        let msg = try_recv(&mut rx).await.expect("Expected a message");
        let val: Value =
            serde_json::from_str(&msg.to_string()).expect("Expected valid JSON from channel");
        assert_eq!(val["event"], "rl:connecting");

        // Because connection failed, no "rl:connected" event is sent.
        let next = try_recv(&mut rx).await;
        assert!(next.is_none(), "Expected no further messages on failure");
    }

    // Test a successful connection using a local websocket server.
    #[tokio::test]
    async fn test_connect_success() {
        // Bind a TCP listener to an available port.
        let listener = TcpListener::bind("127.0.0.1:0")
            .await
            .expect("Failed to bind listener");
        let addr = listener.local_addr().unwrap();

        // Spawn a simple websocket server that accepts one connection.
        tokio::spawn(async move {
            if let Ok((stream, _)) = listener.accept().await {
                let mut ws_stream = accept_async(stream)
                    .await
                    .expect("Error during the websocket handshake");
                // Wait a moment to simulate activity.
                tokio::time::sleep(Duration::from_millis(100)).await;
                // Send a text message then close.
                ws_stream.send(Message::Text("hello".into())).await.unwrap();
                ws_stream.close(None).await.unwrap();
            }
        });

        let (tx, mut rx) = unbounded();
        let url = format!("ws://{}", addr);
        connect(&url, tx.clone()).await;

        // Verify that we first got a "rl:connecting" event.
        let msg1 = try_recv(&mut rx)
            .await
            .expect("Expected a connecting event");
        let val1: Value =
            serde_json::from_str(&msg1.to_string()).expect("Invalid JSON in connecting event");
        assert_eq!(val1["event"], "rl:connecting");

        // Then we should get a "rl:connected" event.
        let msg2 = try_recv(&mut rx).await.expect("Expected a connected event");
        let val2: Value =
            serde_json::from_str(&msg2.to_string()).expect("Invalid JSON in connected event");
        assert_eq!(val2["event"], "rl:connected");

        // Note: The websocket message "hello" is written to stdout in the real function.
        // For testing purposes, we focus on the relay events.
    }
}
