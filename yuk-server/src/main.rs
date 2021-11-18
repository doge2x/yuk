mod login;

use axum::{routing::get, AddExtensionLayer, Router};
use sqlx::PgPool;
use std::{env, net::SocketAddr, sync::Arc};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init();

    // Collect env.
    let addr = env::var("YUK_ADDR")?.parse::<SocketAddr>()?;
    let db_url = env::var("DATABASE_URL")?;

    // Connect to SQL server.
    let pool = Arc::new(PgPool::connect(&db_url).await?);

    // Init center message server.
    let (receiver, login_state) = login::msg_server(128, pool.clone());
    tokio::spawn(async move {
        receiver.serve().await;
    });

    let app = Router::new()
        .route("/login", get(login::login))
        .layer(AddExtensionLayer::new(Arc::new(login_state)));

    // Start server.
    axum::Server::bind(&addr)
        .serve(app.into_make_service_with_connect_info::<SocketAddr, _>())
        .await?;

    Ok(())
}
