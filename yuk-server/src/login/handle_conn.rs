use super::{Connection, WsMsg};
use log::error;
use sqlx::{query, PgPool};
use std::sync::Arc;

pub(super) async fn handle_connection(pool: Arc<PgPool>, mut conn: Connection) {
    while let Some(msg) = conn.recv_msg().await {
        if let Err(e) = handle_msg(pool.as_ref(), msg).await {
            error!("handle message ({}): {}", conn.id(), e);
        }
    }
}

async fn handle_msg(pool: &PgPool, msg: WsMsg) -> anyhow::Result<()> {
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
        .execute(pool)
        .await?;
    }
    Ok(())
}
