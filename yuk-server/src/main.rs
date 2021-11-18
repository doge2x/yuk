mod msg;
mod msg_handler;
mod msg_server;

use log::{error, info};
use msg_handler::MsgHandler;
use sqlx::PgPool;
use std::{env, net::SocketAddr, sync::Arc};
use tokio::net::TcpListener;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init();

    let pool = Arc::new(PgPool::connect(&env::var("DATABASE_URL")?).await?);

    let addr = env::var("YUK_ADDR")
        .expect("can't interpret $YUK_ADDR")
        .parse::<SocketAddr>()
        .expect("invalid socket address");
    let listener = TcpListener::bind(&addr).await.expect("can't listen");
    info!("listen on: {}", addr);

    let (mut server, channel) = msg_server::new_server(16);

    tokio::spawn(async move {
        server.serve().await;
    });

    while let Ok((stream, _)) = listener.accept().await {
        match channel.connect(stream).await {
            Ok(conn) => {
                let mut handler = MsgHandler::new(conn, pool.clone());
                tokio::spawn(async move {
                    handler.serve().await;
                });
            }
            Err(e) => error!("{}", e),
        }
    }

    Ok(())
}
