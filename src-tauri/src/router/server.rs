use std::{collections::HashMap, io::Error as IoError, net::SocketAddr, sync::Arc};
use tokio::sync::Mutex;

use futures::channel::mpsc::{unbounded, UnboundedSender};
use futures_util::{future, pin_mut, stream::TryStreamExt, StreamExt};

use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::tungstenite::protocol::Message;

type Tx = UnboundedSender<Message>;
type PeerMap = Arc<Mutex<HashMap<SocketAddr, Tx>>>;

async fn handle_connection(peer_map: PeerMap, raw_stream: TcpStream, addr: SocketAddr) {
    println!("Incoming TCP connection from: {}", addr);

    let ws_stream = tokio_tungstenite::accept_async(raw_stream)
        .await
        .expect("Error during the websocket handshake occurred");
    println!("WebSocket connection established: {}", addr);

    // Insert the write part of this peer to the peer map.
    let (tx, rx) = unbounded();
    peer_map.lock().await.insert(addr, tx);

    let (outgoing, incoming) = ws_stream.split();

    let broadcast_incoming = incoming.try_for_each(|msg| {
        // Clone the peer_map inside the closure so every invocation gets its own clone.
        let peer_map_clone = peer_map.clone();
        async move {
            println!(
                "Received a message from {}: {}",
                addr,
                msg.to_text().unwrap()
            );
            let peers = peer_map_clone.lock().await;

            // We want to broadcast the message to everyone except ourselves.
            let broadcast_recipients = peers
                .iter()
                .filter(|(peer_addr, _)| peer_addr != &&addr)
                .map(|(_, ws_sink)| ws_sink);

            for recp in broadcast_recipients {
                recp.unbounded_send(msg.clone()).unwrap();
            }

            Ok::<(), tokio_tungstenite::tungstenite::Error>(())
        }
    });

    let receive_from_others = rx.map(Ok).forward(outgoing);

    pin_mut!(broadcast_incoming, receive_from_others);
    future::select(broadcast_incoming, receive_from_others).await;

    println!("{} disconnected", &addr);
    peer_map.lock().await.remove(&addr);
}

pub async fn init() -> Result<(), IoError> {
    let addr = "localhost:49322".to_string();
    let listener = TcpListener::bind(&addr).await?;
    println!("Listening on: {}", addr);

    let peer_map = PeerMap::new(Mutex::new(HashMap::new()));

    while let Ok((stream, addr)) = listener.accept().await {
        tauri::async_runtime::spawn(handle_connection(peer_map.clone(), stream, addr));
    }

    Ok(())
}
