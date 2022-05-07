mod server;

use jsonrpsee::{
    core::{async_trait, RpcResult},
    http_server::HttpServerBuilder,
    proc_macros::rpc,
};
use log::info;
use mongodb::{bson::doc, Client};
use server::{PostAnswer, Server, UserAnswer};
use std::{env, net::SocketAddr};

#[rpc(server)]
trait YukRpc {
    #[method(name = "login")]
    async fn login(&self, username: String, exam_id: i64) -> RpcResult<String>;

    #[method(name = "answer_problem")]
    async fn answer_problem(
        &self,
        token: String,
        answers: Vec<PostAnswer>,
    ) -> RpcResult<Vec<UserAnswer>>;
}

struct YukServer {
    server: Server,
}

#[async_trait]
impl YukRpcServer for YukServer {
    async fn login(&self, username: String, exam_id: i64) -> RpcResult<String> {
        Ok(self.server.login(username, exam_id).await?.to_string())
    }

    async fn answer_problem(
        &self,
        token: String,
        answers: Vec<PostAnswer>,
    ) -> RpcResult<Vec<UserAnswer>> {
        let (exam_id, last_post) = self.server.update_answer(token.parse()?, answers).await?;
        Ok(self.server.fetch_answers(exam_id, last_post).await?)
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

    // Connect database.
    info!("connect to database: {}", db_uri);
    let db = Client::with_uri_str(db_uri).await?.database("yuk");
    db.run_command(doc! { "ping": 1 }, None).await?;

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