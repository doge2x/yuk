use futures_util::{SinkExt, StreamExt};
use log::{error, info};
use std::net::SocketAddr;
use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::{
    accept_async,
    tungstenite::{Error, Result},
};

async fn accpet_connetcion(stream: TcpStream) {
    let peer = stream
        .peer_addr()
        .expect("connected streams should have a peer address");
    info!("peer address: {}", peer);

    if let Err(e) = handle_connection(peer, stream).await {
        match e {
            Error::ConnectionClosed | Error::Protocol(_) => (),
            err => error!("error processing connection: {}", err),
        }
    }
}

async fn handle_connection(peer: SocketAddr, stream: TcpStream) -> Result<()> {
    let mut ws_stream = accept_async(stream).await?;
    info!("new websocket connection: {}", peer);

    while let Some(msg) = ws_stream.next().await {
        let msg = msg?;
        if msg.is_text() {
            ws_stream.send(msg).await?;
        }
    }

    info!("connection closed: {}", peer);
    Ok(())
}

#[tokio::main]
async fn main() {
    env_logger::init();

    let addr = "127.0.0.1:9009";
    let listener = TcpListener::bind(&addr).await.expect("can't listen");
    info!("listening on: {}", addr);

    while let Ok((stream, _)) = listener.accept().await {
        tokio::spawn(accpet_connetcion(stream));
    }
}
