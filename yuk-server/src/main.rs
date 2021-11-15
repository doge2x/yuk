mod msg_handler;
mod msg_server;

use log::info;
use msg_handler::MsgHandler;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    env_logger::init();

    let addr = "127.0.0.1:9009";
    let listener = TcpListener::bind(&addr).await.expect("can't listen");
    info!("listening on: {}", addr);

    let (mut server, channel) = msg_server::new_server(16);

    tokio::spawn(async move {
        server.serve().await;
    });

    while let Ok((stream, _)) = listener.accept().await {
        let conn = channel.connect(stream).await;
        tokio::spawn(async move {
            MsgHandler::new(conn).serve().await;
        });
    }
}
