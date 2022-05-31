mod server;

use jsonrpsee::{
    core::{async_trait, RpcResult},
    http_server::HttpServerBuilder,
    proc_macros::rpc,
};
use log::info;
use mongodb::{bson::doc, Client};
use once_cell::sync::Lazy;
use regex::Regex;
use serde_json::Value as Json;
use server::{AnswerContext, GetPaper, ListPaper, PostAnswer, PostPaper, Server, UserAnswer};
use std::{env, net::SocketAddr};
use tokio::signal::{
    ctrl_c,
    unix::{signal, SignalKind},
};

shadow_rs::shadow!(shadow);

#[rpc(server)]
trait YukRpc {
    #[method(name = "login")]
    async fn login(
        &self,
        username: String,
        exam_id: i64,
        paper: Option<PostPaper>,
        version: Option<String>,
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
        version: Option<String>,
    ) -> RpcResult<String> {
        static USERNAME_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"^[a-z][a-z0-9_]*$").unwrap());

        info!(
            "login: {}, {}, {}",
            username,
            exam_id,
            version.as_ref().map(String::as_str).unwrap_or("no_version")
        );

        if !USERNAME_RE.is_match(&username) {
            return Err(jsonrpsee::core::Error::Custom(format!("invalid username")));
        }

        if let Some(paper) = paper {
            self.server.update_paper(exam_id, paper).await?;
        }

        let msg = if matches!(
            version.as_ref().map(String::as_str),
            Some(shadow::PKG_VERSION)
        ) {
            None
        } else {
            Some(format!("[系统通知] 请更新至 v{}", shadow::PKG_VERSION))
        };
        let token = self.server.login(username, exam_id, msg).await?;
        Ok(token.to_string())
    }

    async fn answer_problem(
        &self,
        token: String,
        answers: Vec<PostAnswer>,
    ) -> RpcResult<Vec<UserAnswer>> {
        let (exam_id, last_post, msg) = self.server.update_answer(token.parse()?, answers).await?;
        let mut answers = self.server.fetch_answers(exam_id, last_post).await?;
        // Inject messages.
        if let Some(msg) = msg {
            answers.extend(
                answers
                    .iter()
                    .map(|&UserAnswer { problem_id, .. }| UserAnswer {
                        username: "_".to_owned(),
                        problem_id,
                        result: None,
                        context: Some(AnswerContext {
                            state: Some(2),
                            msg: Some(msg.clone()),
                        }),
                    })
                    .collect::<Vec<_>>(),
            );
        }
        Ok(answers)
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
