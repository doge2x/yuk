mod entity;
mod migration;
mod server;

use jsonrpsee::{
    core::{async_trait, RpcResult},
    http_server::HttpServerBuilder,
    proc_macros::rpc,
};
use log::info;
use migration::Migrator;
use sea_orm::{prelude::*, Database};
use sea_schema::migration::prelude::*;
use server::{Server, UserResult};
use std::{env, net::SocketAddr};
use tokio::sync::RwLock;

#[rpc(server)]
trait YukRpc {
    #[method(name = "login")]
    async fn login(&self, username: String, exam_id: i32) -> RpcResult<String>;
    #[method(name = "answer_problem")]
    async fn answer_problem(
        &self,
        token: String,
        problem_id: i32,
        result: Json,
    ) -> RpcResult<Vec<UserResult>>;
}

struct YukServer {
    server: RwLock<Server>,
}

#[async_trait]
impl YukRpcServer for YukServer {
    async fn login(&self, username: String, exam_id: i32) -> RpcResult<String> {
        Ok(self
            .server
            .write()
            .await
            .login(username, exam_id)
            .await?
            .to_string())
    }

    async fn answer_problem(
        &self,
        token: String,
        problem_id: i32,
        result: Json,
    ) -> RpcResult<Vec<UserResult>> {
        let mut server = self.server.write().await;
        let token = token.parse()?;
        server.update_answer(token, problem_id, result).await?;
        Ok(server.fetch_answers(token).await?)
    }
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    env_logger::init();

    // Collect env.
    let addr = env::var("YUK_ADDR")
        .expect("YUK_ADDR must be set")
        .parse::<SocketAddr>()?;
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // Migrate database.
    info!("apply migrations");
    let db = Database::connect(db_url).await?;
    Migrator::up(&db, None).await?;

    // Start server.
    info!("start server at: {}", addr);
    let server = HttpServerBuilder::new().build(addr).await.unwrap();
    server
        .start(
            YukServer {
                server: RwLock::new(Server::new(db)),
            }
            .into_rpc(),
        )
        .unwrap()
        .await;

    Ok(())
}
