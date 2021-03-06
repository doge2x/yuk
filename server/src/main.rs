mod server;

use jsonrpsee::{
    core::{async_trait, RpcResult},
    http_server::HttpServerBuilder,
    proc_macros::rpc,
};
use log::info;
use mongodb::{bson::doc, Client};
use serde_json::Value as Json;
use server::{GetPaper, ListPaper, PostAnswer, PostPaper, Server, UserAnswer};
use std::{env, net::SocketAddr};
use tokio::signal::{
    ctrl_c,
    unix::{signal, SignalKind},
};

#[rpc(server)]
trait YukRpc {
    #[method(name = "login")]
    async fn login(
        &self,
        username: String,
        exam_id: i64,
        paper: Option<PostPaper>,
    ) -> RpcResult<String>;

    #[method(name = "answer_problem")]
    async fn answer_problem(
        &self,
        token: String,
        answers: Vec<PostAnswer>,
    ) -> RpcResult<Vec<UserAnswer>>;
    #[method(name = "list_papers")]
    async fn list_papers(&self) -> RpcResult<Vec<ListPaper>>;
    #[method(name = "get_paper")]
    async fn get_paper(&self, exam_id: i64) -> RpcResult<GetPaper>;
}

struct YukServer {
    server: Server,
}

#[async_trait]
impl YukRpcServer for YukServer {
    async fn login(
        &self,
        username: String,
        exam_id: i64,
        paper: Option<PostPaper>,
    ) -> RpcResult<String> {
        if let Some(paper) = paper {
            self.server.update_paper(exam_id, paper).await?;
        }
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

    async fn list_papers(&self) -> RpcResult<Vec<ListPaper>> {
        Ok(self.server.list_papers().await?)
    }

    async fn get_paper(&self, exam_id: i64) -> RpcResult<GetPaper> {
        Ok(self.server.get_paper(exam_id).await?)
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

    // Apply migrations.
    let server = Server::new(db);
    info!("apply migrations");
    server.migrate().await?;

    // Start server.
    info!("start server at: {}", addr);
    let rpc_server = HttpServerBuilder::new().build(addr).await.unwrap();
    let handler = rpc_server.start(YukServer { server }.into_rpc()).unwrap();

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
