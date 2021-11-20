mod msg_server;

use anyhow::bail;
use axum::{
    extract::{
        ws::{WebSocket, WebSocketUpgrade},
        ConnectInfo, Extension, Query,
    },
    response::IntoResponse,
};
use itertools::Itertools;
use log::{error, info};
use msg_server::Port;
use once_cell::sync::Lazy;
use regex::Regex;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use serde_with::DeserializeFromStr;
use sqlx::{query, PgPool};
use std::{net::SocketAddr, str::FromStr, sync::Arc};

pub use msg_server::msg_server;

pub struct State {
    pool: Arc<PgPool>,
    port: Port,
}

#[derive(Debug, Deserialize)]
pub struct WsMsg(Vec<Answer>);

#[derive(Debug, Deserialize, Serialize)]
struct Answer {
    problem_id: i64,
    result: Value,
}

#[derive(Debug, Serialize)]
struct RetMsg(Vec<UserAnswer>);

#[derive(Debug, Serialize)]
struct UserAnswer {
    username: String,
    answers: Vec<Answer>,
}

#[derive(Deserialize)]
pub struct Param {
    username: Username,
    exam_id: i64,
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
        exam_id,
    } = param;
    let pool = &*state.pool;

    // Read user's id, register if not exists.
    info!("user login ({}): {}", username, exam_id);
    let user_id = if let Some(id) = select_user(pool, &username).await? {
        id
    } else {
        info!("register user ({})", username);
        insert_user(pool, &username).await?
    };

    // Connect to message center.
    let mut conn = state.port.connect(addr, username, socket).await?;

    // Send answers of this exam.
    let answers = select_answers(pool, exam_id).await?;
    conn.send_msg(answers).await;

    // Handle messages.
    while let Some(msg) = conn.recv_msg().await {
        if let Err(e) = handle_msg(pool, user_id, exam_id, msg).await {
            error!("handle message ({}): {}", conn.id(), e);
        }
    }

    Ok(())
}

async fn handle_msg(pool: &PgPool, user_id: i64, exam_id: i64, msg: WsMsg) -> anyhow::Result<()> {
    let WsMsg(msg) = msg;
    for ans in msg {
        // Update answers.
        update_answers(pool, user_id, exam_id, ans.problem_id, ans.result).await?;
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
    query!(
        r#"
        INSERT INTO users (username)
            VALUES ($1)
        RETURNING id
        "#,
        username,
    )
    .fetch_one(pool)
    .await
    .map(|rec| rec.id)
}

async fn update_answers(
    pool: &PgPool,
    user_id: i64,
    exam_id: i64,
    problem_id: i64,
    result: Value,
) -> sqlx::Result<()> {
    query!(
        r#"
        INSERT INTO answers (exam_id, problem_id, user_id, result)
            VALUES ($1, $2, $3, $4)
        ON CONFLICT ON CONSTRAINT answer_unique DO UPDATE
            SET result = $4
        "#,
        exam_id,
        problem_id,
        user_id,
        result,
    )
    .execute(pool)
    .await
    .map(|_| ())
}

async fn select_answers(pool: &PgPool, exam_id: i64) -> sqlx::Result<RetMsg> {
    query!(
        r#"
        SELECT a.problem_id, u.username, a.result FROM answers a
        JOIN users u
        ON a.user_id = u.id
        WHERE a.exam_id = $1
        "#,
        exam_id,
    )
    .fetch_all(pool)
    .await
    .map(|answers| {
        RetMsg(
            answers
                .into_iter()
                .map(|ans| {
                    (
                        ans.username,
                        Answer {
                            problem_id: ans.problem_id,
                            result: ans.result,
                        },
                    )
                })
                .into_group_map()
                .into_iter()
                .map(|(username, answers)| UserAnswer { username, answers })
                .collect(),
        )
    })
}
