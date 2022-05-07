mod server;

use jsonrpsee::{
    core::{async_trait, RpcResult},
    http_server::HttpServerBuilder,
    proc_macros::rpc,
};
use log::info;
use mongodb::{bson::doc, Client};
use server::{Server, UserAnswer};
use std::{env, net::SocketAddr};

#[rpc(server)]
trait YukRpc {
    #[method(name = "answer_problem")]
    async fn answer_problem(
        &self,
        exam_id: i64,
        answers: Vec<UserAnswer>,
    ) -> RpcResult<Vec<UserAnswer>>;
}

struct YukServer {
    server: Server,
}

#[async_trait]
impl YukRpcServer for YukServer {
    async fn answer_problem(
        &self,
        exam_id: i64,
        answers: Vec<UserAnswer>,
    ) -> RpcResult<Vec<UserAnswer>> {
        self.server.update_answer(exam_id, answers).await?;
        Ok(self.server.fetch_answers(exam_id).await?)
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
