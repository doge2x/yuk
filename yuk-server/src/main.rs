mod msg_handler;
mod msg_server;

use log::info;
use msg_handler::MsgHandler;
use std::{env, net::SocketAddr};
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    env_logger::init();

    let addr = env::var("YUK_ADDR")
        .expect("can't interpret $YUK_ADDR")
        .parse::<SocketAddr>()
        .expect("invalid socket address");
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
