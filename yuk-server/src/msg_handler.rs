use crate::{msg::WsMsg, msg_server::Connection};
use log::error;
use sqlx::{query, PgPool};
use std::sync::Arc;

pub struct MsgHandler {
    conn: Connection,
    pool: Arc<PgPool>,
}

impl MsgHandler {
    pub fn new(conn: Connection, pool: Arc<PgPool>) -> Self {
        Self { conn, pool }
    }

    pub async fn serve(&mut self) {
        while let Some(msg) = self.conn.recv_msg().await {
            if let Err(e) = self.handle_msg(msg).await {
                error!("handle message ({}): {}", self.conn.id(), e);
            }
        }
    }

    pub async fn handle_msg(&mut self, msg: WsMsg) -> anyhow::Result<()> {
        for ans in msg.answers {
            // Update answers.
            // TODO: use user_id as condition
            query!(
                r#"
                UPDATE answers
                SET
                    answers = $1
                WHERE
                    exam_id = $2
                    AND problem_id = $3
                "#,
                ans.result,
                msg.exam_id,
                ans.problem_id,
            )
            .fetch_one(self.pool.as_ref())
            .await?;
        }
        Ok(())
    }
}
