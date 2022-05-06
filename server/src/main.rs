mod server;

use jsonrpsee::{
    core::{async_trait, RpcResult},
    http_server::HttpServerBuilder,
    proc_macros::rpc,
};
use log::info;
use mongodb::Client;
use serde_json::Value as Json;
use server::{Server, UserAnswer};
use std::{env, net::SocketAddr, time::Duration};

#[rpc(server)]
trait YukRpc {
    #[method(name = "login")]
    async fn login(&self, username: String, exam_id: i32, dur: Option<u64>) -> RpcResult<String>;
    #[method(name = "answer_problem")]
    async fn answer_problem(
        &self,
        token: String,
        problem_id: i32,
        result: Json,
    ) -> RpcResult<Vec<UserAnswer>>;
}

struct YukServer {
    server: Server,
}

#[async_trait]
impl YukRpcServer for YukServer {
    async fn login(&self, username: String, exam_id: i32, dur: Option<u64>) -> RpcResult<String> {
        info!("login: {}, {}", username, exam_id);
        let token = self
            .server
            .login(username, exam_id, Duration::from_secs(dur.unwrap_or(3600)))
            .await?
            .to_string();
        Ok(token)
    }

    async fn answer_problem(
        &self,
        token: String,
        problem_id: i32,
        result: Json,
    ) -> RpcResult<Vec<UserAnswer>> {
        info!("answer_problem: {}, {}", token, problem_id);
        let token = token.parse()?;
        self.server.update_answer(token, problem_id, result).await?;
        Ok(self.server.fetch_answers(token).await?)
    }
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    env_logger::init();

    // Collect env.
    let addr = env::var("YUK_ADDR")
        .expect("YUK_ADDR must be set")
        .parse::<SocketAddr>()?;
    let db_uri = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // Migrate database.
    let db = Client::with_uri_str(db_uri).await?.database("yuk");

    // Start server.
    info!("start server at: {}", addr);
    let server = HttpServerBuilder::new().build(addr).await.unwrap();
    server
        .start(
            YukServer {
                server: Server::new(db),
            }
            .into_rpc(),
        )
        .unwrap()
        .await;

    Ok(())
}
