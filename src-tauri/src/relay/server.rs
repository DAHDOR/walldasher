use std::{
    collections::HashMap,
    io::Error as IoError,
    net::SocketAddr,
    sync::Arc,
    time::{SystemTime, UNIX_EPOCH},
};

use futures::channel::mpsc::{unbounded, UnboundedReceiver, UnboundedSender};
use futures_util::{stream::TryStreamExt, SinkExt, StreamExt};
use serde_json::Value;
use tauri::{Manager, Runtime};
use tokio::net::{TcpListener, TcpStream};
use tokio::sync::Mutex;
use tokio_tungstenite::{accept_async, tungstenite::protocol::Message};

pub type Relay = UnboundedSender<Message>;

// Connection info structure.
#[derive(Debug)]
pub struct Connection {
    pub tx: UnboundedSender<Message>,
    registered_functions: Vec<String>,
}

// Global connections map: mapping connection id to ConnectionInfo.
pub type ConnectionMap = Arc<Mutex<HashMap<String, Connection>>>;

/// Handles incoming WebSocket connections and manages the connection lifecycle.
///
/// This function accepts a raw TCP stream, performs the WebSocket handshake,
/// assigns a unique ID to the connection, and manages the reading and writing
/// of messages to and from the WebSocket. It also updates the global connection
/// map with the new connection and removes it upon disconnection.
///
/// # Arguments
///
/// * `connections` - A shared, thread-safe map of active connections.
/// * `raw_stream` - The raw TCP stream for the incoming connection.
/// * `addr` - The socket address of the incoming connection.
async fn handle_connection(connections: ConnectionMap, raw_stream: TcpStream, addr: SocketAddr) {
    println!("Incoming TCP connection from: {}", addr);

    let ws_stream = accept_async(raw_stream)
        .await
        .expect("Error during the websocket handshake occurred");
    println!("WebSocket connection established: {}", addr);

    // Create a unique id based on current timestamp.
    let id = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_millis()
        .to_string();
    println!("Received connection: {}", id);

    // Split the websocket stream.
    let (mut write, read) = ws_stream.split();

    // Create a channel for sending messages to this connection.
    let (tx, mut rx) = unbounded::<Message>();

    // Insert connection info in the global map.
    connections.lock().await.insert(
        id.clone(),
        Connection {
            tx,
            registered_functions: Vec::new(),
        },
    );

    // Immediately send an initial JSON message to the client.
    let init_msg = serde_json::json!({
        "event": "wsRelay:info",
        "data": "Connected!"
    })
    .to_string();
    let _ = write.send(Message::Text(init_msg.into())).await;

    // Spawn a task that forwards messages from our rx channel to the websocket write sink.
    let write_task = tauri::async_runtime::spawn(async move {
        while let Some(msg) = rx.next().await {
            if write.send(msg).await.is_err() {
                break;
            }
        }
    });

    // Process each incoming message.
    let read_task = read.try_for_each(|msg| {
        let connections_clone = connections.clone();
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
            send_relay_message(&id_clone, text, &connections_clone).await;
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
    connections.lock().await.remove(&id);
}

/// Sends a relay message to other connected clients based on the event and command.
///
/// This function processes an incoming message, parses it as JSON, and determines the event and command.
/// If the event is a relay command (`relay:register` or `relay:unregister`), it updates the connection's
/// registered functions accordingly. For other events, it relays the message to all other connections
/// that are registered to receive the specific event.
///
/// # Arguments
///
/// * `sender_id` - The unique identifier of the sender connection.
/// * `message` - The JSON message received from the sender.
/// * `conns` - A shared, thread-safe map of active connections.
///
/// # JSON Message Format
///
/// The JSON message should have the following format:
/// ```json
/// {
///     "event": "event_name:command",
///     "data": "message_data"
/// }
/// ```
///
/// - `event_name` is the name of the event (e.g., "relay").
/// - `command` is the specific command for the event (e.g., "register").
/// - `message_data` is the data associated with the event.
///
/// # Example
///
/// ```json
/// {
///     "event": "relay:register",
///     "data": "some_function"
/// }
/// ```
///
/// This example registers the sender connection to receive messages for the "some_function" event.
async fn send_relay_message(sender_id: &str, message: &str, conns: &ConnectionMap) {
    // Parse the JSON message.
    let json: Value = match serde_json::from_str(message) {
        Ok(v) => v,
        Err(e) => {
            println!("Failed to parse JSON: {}", e);
            return;
        }
    };

    // Log the event.
    let event_command = match json.get("event").and_then(|v| v.as_str()) {
        Some(e) => e,
        None => {
            println!("No event provided in message");
            return;
        }
    };

    println!("{}> Sent {}", sender_id, event_command);

    // Split the event string up
    let (event, cmd) = match event_command.split_once(':') {
        Some((e, c)) => (e, c),
        None => {
            println!("Invalid event format: {}", event_command);
            return;
        }
    };

    let data = match json.get("data").and_then(|v| v.as_str()) {
        Some(d) => d,
        None => {
            println!("No data provided in message");
            return;
        }
    };

    // If it's a relay command, handle registration/unregistration.
    if event == "relay" {
        match cmd {
            "register" => {
                let mut map = conns.lock().await;
                if let Some(conn) = map.get_mut(sender_id) {
                    if !conn.registered_functions.contains(&data.to_string()) {
                        conn.registered_functions.push(data.to_string());
                        println!("{}> Registered to receive: {}", sender_id, data);
                    } else {
                        println!("{}> Already registered: {}", sender_id, data);
                    }
                }
            }
            "unregister" => {
                let mut map = conns.lock().await;
                if let Some(conn) = map.get_mut(sender_id) {
                    if let Some(pos) = conn.registered_functions.iter().position(|f| f == data) {
                        conn.registered_functions.remove(pos);
                        println!("{}> Unregistered: {}", sender_id, data);
                    } else {
                        println!("{}> Not registered: {}", sender_id, data);
                    }
                }
            }
            _ => {
                println!("{}> Unknown relay command: {}", sender_id, cmd);
            }
        }

        // Don't send relay commands
        return;
    }

    // Relay message to other connections that are registered for this event.
    let map = conns.lock().await;
    for (id, conn) in map.iter() {
        if id == sender_id {
            continue;
        }
        if conn
            .registered_functions
            .contains(&event_command.to_string())
        {
            let msg = Message::Text(message.into());
            let _ = conn.tx.unbounded_send(msg);
        }
    }
}

/// Initializes the WebSocket server and listens for incoming connections.
///
/// This function binds a TCP listener to the specified address and port, and then
/// continuously accepts incoming connections. For each incoming connection, it spawns
/// a new task to handle the connection lifecycle using the `handle_connection` function.
/// The function maintains a global, thread-safe map of active connections to manage
/// the state of each connection.
///
/// # Returns
///
/// This function returns a `Result` indicating success or failure. On success, it returns
/// `Ok(())`. On failure, it returns an `IoError`.
///
/// # Errors
///
/// This function will return an `IoError` if the TCP listener fails to bind to the specified
/// address or if there is an error accepting an incoming connection.
///
/// # Panics
///
/// This function does not explicitly panic, but it may panic if there are issues with
/// the underlying Tokio runtime or if the `handle_connection` function panics.
pub async fn init<R: Runtime>(app: tauri::AppHandle<R>) -> Result<(), IoError> {
    let addr = "localhost:49322".to_string();
    let listener = TcpListener::bind(&addr).await?;
    println!("Opened WebSocket server on port {}", addr);

    let connections: ConnectionMap = Arc::new(Mutex::new(HashMap::new()));

    // Create a channel for the server itself.
    let (tx, mut rx) = unbounded::<Message>();

    // Store the connections map in the app state.
    app.manage::<Relay>(tx.clone());

    // Spawn a task to handle messages sent to the server.
    let conns_clone = connections.clone();
    tauri::async_runtime::spawn(async move {
        while let Some(msg) = rx.next().await {
            if let Message::Text(text) = msg {
                send_relay_message("server", &text, &conns_clone).await;
            }
        }
    });

    // Spawn a task for each incoming connection.
    while let Ok((stream, addr)) = listener.accept().await {
        let connections = connections.clone();
        tauri::async_runtime::spawn(async move {
            handle_connection(connections, stream, addr).await;
        });
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use serde_json::json;

    use super::*;

    // Helper function to create a connection with a channel that collects sent messages.
    fn create_test_connection() -> (Connection, UnboundedReceiver<Message>) {
        let (tx, rx) = unbounded::<Message>();
        (
            Connection {
                tx,
                registered_functions: Vec::new(),
            },
            rx,
        )
    }

    #[tokio::test]
    async fn test_relay_register() {
        // Create a connections map and insert a test connection.
        let connections: ConnectionMap = Arc::new(Mutex::new(HashMap::new()));
        let sender_id = "test_sender".to_string();
        let (conn, _) = create_test_connection();
        connections.lock().await.insert(sender_id.clone(), conn);

        // Create a JSON message for relay:register.
        let msg = json!({
            "event": "relay:register",
            "data": "function_a"
        })
        .to_string();

        // Call the relay message function.
        send_relay_message(&sender_id, &msg, &connections).await;

        // Verify that the connection is now registered for "function_a".
        let map = connections.lock().await;
        let connection = map.get(&sender_id).unwrap();
        assert!(connection
            .registered_functions
            .contains(&"function_a".to_string()));
    }

    #[tokio::test]
    async fn test_relay_unregister() {
        // Create a connections map and insert a test connection with pre-registered function.
        let connections: ConnectionMap = Arc::new(Mutex::new(HashMap::new()));
        let sender_id = "test_sender".to_string();
        let mut connection = create_test_connection().0;
        connection
            .registered_functions
            .push("function_b".to_string());
        connections
            .lock()
            .await
            .insert(sender_id.clone(), connection);

        // Create a JSON message for relay:unregister.
        let msg = json!({
            "event": "relay:unregister",
            "data": "function_b"
        })
        .to_string();

        // Call the relay message function.
        send_relay_message(&sender_id, &msg, &connections).await;

        // Verify that the function has been unregistered.
        let map = connections.lock().await;
        let connection = map.get(&sender_id).unwrap();
        assert!(!connection
            .registered_functions
            .contains(&"function_b".to_string()));
    }

    #[tokio::test]
    async fn test_relay_forward() {
        // Setup two connections: sender and receiver.
        let connections: ConnectionMap = Arc::new(Mutex::new(HashMap::new()));
        let sender_id = "sender".to_string();
        let receiver_id = "receiver".to_string();

        // Create sender connection.
        let (sender_conn, _) = create_test_connection();
        // Create receiver connection and get its rx channel.
        let (mut receiver_conn, mut rx) = create_test_connection();
        // Register receiver to an event message.
        // The registration token is the full event string that will be forwarded.
        let event_token = "notify:message".to_string();
        receiver_conn.registered_functions.push(event_token.clone());

        {
            let mut map = connections.lock().await;
            map.insert(sender_id.clone(), sender_conn);
            map.insert(receiver_id.clone(), receiver_conn);
        }

        // Create a JSON message that is not a relay command but targets event "notify:message".
        let msg = json!({
            "event": event_token,
            "data": "Hello, receiver!"
        })
        .to_string();

        // Send the message from the sender.
        send_relay_message(&sender_id, &msg, &connections).await;

        // Check that the receiver got the message.
        if let Some(received) = rx.next().await {
            match received {
                Message::Text(text) => {
                    let received_json: serde_json::Value = serde_json::from_str(&text).unwrap();
                    assert_eq!(received_json["event"], event_token);
                    assert_eq!(received_json["data"], "Hello, receiver!");
                }
                _ => panic!("Expected Text message"),
            }
        } else {
            panic!("Receiver did not get any message");
        }
    }

    #[tokio::test]
    async fn test_invalid_json() {
        // Create a connection and test with an invalid JSON message.
        let connections: ConnectionMap = Arc::new(Mutex::new(HashMap::new()));
        let sender_id = "test_sender".to_string();
        let (conn, _) = create_test_connection();
        connections.lock().await.insert(sender_id.clone(), conn);

        // Invalid JSON string.
        let invalid_msg = "This is not a JSON message";

        // Call the relay message function. Should not panic.
        send_relay_message(&sender_id, invalid_msg, &connections).await;
    }
}
