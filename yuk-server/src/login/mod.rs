mod handle_conn;
mod msg_server;

use axum::{
    extract::{ws::WebSocketUpgrade, ConnectInfo, Extension},
    response::IntoResponse,
};
use handle_conn::handle_connection;
use msg_server::{Connection, Port};
use serde::Deserialize;
use serde_json::Value;
use sqlx::PgPool;
use std::{net::SocketAddr, sync::Arc};

pub use msg_server::msg_server;

#[derive(Clone)]
pub struct SharedState(Arc<State>);

struct State {
    pool: Arc<PgPool>,
    port: Port,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WsMsg {
    // TODO: extract author in '/login'
    #[allow(dead_code)]
    author: String,
    exam_id: String,
    answers: Vec<Answer>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Answer {
    problem_id: i64,
    result: Value,
}

pub async fn login(
    state: Extension<SharedState>,
    ws: WebSocketUpgrade,
    addr: ConnectInfo<SocketAddr>,
) -> impl IntoResponse {
    let Extension(SharedState(state)) = state;
    let ConnectInfo(addr) = addr;

    ws.on_upgrade(move |socket| async move {
        let conn = state.port.connect(addr, socket).await.unwrap();
        handle_connection(state.pool.clone(), conn).await;
    })
}
