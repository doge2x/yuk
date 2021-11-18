mod msg_server;

use anyhow::bail;
use axum::{
    extract::{
        ws::{WebSocket, WebSocketUpgrade},
        ConnectInfo, Extension, Query,
    },
    response::IntoResponse,
};
use log::{error, info};
use msg_server::Port;
use once_cell::sync::Lazy;
use regex::Regex;
use serde::Deserialize;
use serde_json::Value;
use serde_with::DeserializeFromStr;
use sqlx::{query, PgPool};
use std::{net::SocketAddr, str::FromStr, sync::Arc};

pub use msg_server::msg_server;

pub struct State {
    pool: Arc<PgPool>,
    port: Port,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WsMsg {
    exam_id: String,
    answers: Vec<Answer>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Answer {
    problem_id: i64,
    result: Value,
}

// TODO: require exam_id
#[derive(Deserialize)]
pub struct Param {
    username: Username,
}

#[derive(DeserializeFromStr)]
pub struct Username(String);

impl FromStr for Username {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        static RE: Lazy<Regex> = Lazy::new(|| Regex::new(r"[[:alpha:]][[:word:]]+").unwrap());

        if s.is_empty() {
            bail!("name is empty")
        } else if s.len() > 31 {
            bail!("name is too long")
        } else if !RE.is_match(s) {
            bail!("name is invalid")
        } else {
            Ok(Self(s.to_owned()))
        }
    }
}

pub async fn login(
    addr: ConnectInfo<SocketAddr>,
    ws: WebSocketUpgrade,
    param: Query<Param>,
    state: Extension<Arc<State>>,
) -> impl IntoResponse {
    let ConnectInfo(addr) = addr;
    let Query(param) = param;
    let Extension(state) = state;

    ws.on_upgrade(move |socket| async move {
        handle_login(state, addr, param, socket).await.map_err(|e| {
            error!("handle login ({}): {}", addr, e);
            e
        })
    })
}

pub async fn handle_login(
    state: Arc<State>,
    addr: SocketAddr,
    param: Param,
    socket: WebSocket,
) -> anyhow::Result<()> {
    let Param {
        username: Username(username),
    } = param;
    let pool = &*state.pool;

    // Read user's id, register if not exists.
    info!("user login: {}", username);
    let user_id = if let Some(id) = select_user(pool, &username).await? {
        id
    } else {
        info!("register user: {}", username);
        insert_user(pool, &username).await?
    };

    // Connect to message center.
    let mut conn = state.port.connect(addr, socket).await?;

    // Handle messages.
    while let Some(msg) = conn.recv_msg().await {
        if let Err(e) = handle_msg(pool, user_id, msg).await {
            error!("handle message ({}): {}", conn.id(), e);
        }
    }

    Ok(())
}

async fn handle_msg(pool: &PgPool, user_id: i64, msg: WsMsg) -> anyhow::Result<()> {
    for ans in msg.answers {
        // Update answers.
        update_answers(pool, &msg.exam_id, ans.problem_id, user_id, ans.result).await?;
    }
    Ok(())
}

async fn select_user(pool: &PgPool, username: &str) -> sqlx::Result<Option<i64>> {
    let id = query!(
        r#"
        SELECT id FROM users
        WHERE username = $1
        "#,
        username,
    )
    .fetch_optional(pool)
    .await?
    .map(|record| record.id);
    Ok(id)
}

async fn insert_user(pool: &PgPool, username: &str) -> sqlx::Result<i64> {
    let id = query!(
        r#"
        INSERT INTO users
            VALUES (DEFAULT, $1)
        RETURNING id
        "#,
        username,
    )
    .fetch_one(pool)
    .await?
    .id;
    Ok(id)
}

async fn update_answers(
    pool: &PgPool,
    exam_id: &str,
    problem_id: i64,
    user_id: i64,
    answers: Value,
) -> sqlx::Result<()> {
    query!(
        r#"
        UPDATE answers
        SET
            answers = $1
        WHERE
            exam_id = $2
            AND problem_id = $3
            AND user_id = $4
        "#,
        answers,
        exam_id,
        problem_id,
        user_id,
    )
    .execute(pool)
    .await?;
    Ok(())
}
