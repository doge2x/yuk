mod error;
mod rpc;
mod server;
mod types;

use crate::rpc::{YukRpcServer, YukServer};
use jsonrpsee::server::ServerBuilder;
use log::info;
use mongodb::{bson::doc, Client};
use server::Server;
use std::{env, net::SocketAddr};
use tokio::signal::{
    ctrl_c,
    unix::{signal, SignalKind},
};

shadow_rs::shadow!(shadow);

#[tokio::main]
async fn main() -> error::Result<()> {
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info")).init();

    // Collect env.
    let addr = env::var("YUK_ADDR")
        .expect("YUK_ADDR must be set")
        .parse::<SocketAddr>()?;
    let db_uri = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // Connect database.
    info!("connect to database: {}", db_uri);
    let db = Client::with_uri_str(db_uri).await?.database("yuk");
    db.run_command(doc! { "ping": 1 }, None).await?;

    // Apply migrations.
    let server = Server::new(db);
    info!("apply migrations");
    server.migrate().await?;

    // Start server.
    info!("start server at: {}", addr);
    let rpc_server = ServerBuilder::new().build(addr).await.unwrap();
    let handler = rpc_server.start(YukServer::new(server).into_rpc()).unwrap();

    let mut sig_int = signal(SignalKind::interrupt()).unwrap();
    let mut sig_term = signal(SignalKind::terminate()).unwrap();
    tokio::select! {
        _ = sig_int.recv() => info!("receive SIGINT"),
        _ = sig_term.recv() => info!("receive SIGTERM"),
        _ = ctrl_c() => info!("receive CTRL_C"),
    }
    info!("shutdown server");
    handler.stop().unwrap();

    Ok(())
}
