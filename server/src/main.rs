mod server;

use jsonrpsee::{
    core::{async_trait, RpcResult},
    http_server::HttpServerBuilder,
    proc_macros::rpc,
};
use log::info;
use mongodb::{bson::doc, Client};
use serde_json::Value as Json;
use server::{PostAnswer, Server, UserAnswer};
use std::{env, net::SocketAddr};
use tokio::signal::{
    ctrl_c,
    unix::{signal, SignalKind},
};

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
        let token = self.server.login(username, exam_id).await?;
        Ok(token.to_string())
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

    // Start server.
    info!("start server at: {}", addr);
    let server = HttpServerBuilder::new().build(addr).await.unwrap();
    let handler = server
        .start(
            YukServer {
                server: Server::new(db),
            }
            .into_rpc(),
        )
        .unwrap();

    let mut sig_int = signal(SignalKind::interrupt()).unwrap();
    let mut sig_term = signal(SignalKind::terminate()).unwrap();
    tokio::select! {
        _ = sig_int.recv() => info!("receive SININT"),
        _ = sig_term.recv() => info!("receive SIGTERM"),
        _ = ctrl_c() => info!("receive CTRL_C"),
    }
    info!("shutdown server");
    handler.stop().unwrap();

    Ok(())
}
