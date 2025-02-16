use futures_util::StreamExt;
use tokio::io::AsyncWriteExt;
use tokio_tungstenite::connect_async;

pub async fn init() {
    let url = "ws://localhost:49122".to_string();

    let (ws_stream, _) = connect_async(&url).await.expect("Failed to connect");
    println!("WebSocket handshake has been successfully completed");

    let (_, read) = ws_stream.split();

    let ws_to_stdout = {
        read.for_each(|message| async {
            let data = message.unwrap().into_data();
            tokio::io::stdout().write_all(&data).await.unwrap();
        })
    };

    ws_to_stdout.await;
}
