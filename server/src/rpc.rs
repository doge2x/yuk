use crate::{error, server::Server, shadow, types::*};
use jsonrpsee::{core::async_trait, proc_macros::rpc};
use mongodb::bson::doc;
use once_cell::sync::Lazy;
use regex::Regex;
use thisctx::IntoError;
use tracing::info;

#[rpc(server)]
pub trait YukRpc {
    #[method(name = "login")]
    async fn login(
        &self,
        username: String,
        exam_id: i64,
        paper: Option<PostPaper>,
        version: Option<String>,
    ) -> error::Result<String>;

    #[method(name = "answer_problem")]
    async fn answer_problem(
        &self,
        token: String,
        answers: Vec<PostAnswer>,
    ) -> error::Result<Vec<UserAnswer>>;

    #[method(name = "list_papers")]
    async fn list_papers(&self) -> error::Result<Vec<ListPaper>>;

    #[method(name = "get_paper")]
    async fn get_paper(&self, exam_id: i64) -> error::Result<GetPaper>;
}

pub struct YukServer {
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
    ) -> error::Result<String> {
        static USERNAME_RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"^[a-z][a-z0-9_]*$").unwrap());

        info!(
            "login: {}, {}, {}",
            username,
            exam_id,
            version.as_deref().unwrap_or("no_version")
        );

        if !USERNAME_RE.is_match(&username) {
            return error::InvalidName.fail();
        }

        if let Some(paper) = paper {
            self.server.update_paper(exam_id, paper).await?;
        }

        let msg = if matches!(version.as_deref(), Some(shadow::PKG_VERSION)) {
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
    ) -> error::Result<Vec<UserAnswer>> {
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

    async fn list_papers(&self) -> error::Result<Vec<ListPaper>> {
        Ok(self.server.list_papers().await?)
    }

    async fn get_paper(&self, exam_id: i64) -> error::Result<GetPaper> {
        Ok(self.server.get_paper(exam_id).await?)
    }
}

impl YukServer {
    pub fn new(server: Server) -> Self {
        Self { server }
    }
}
