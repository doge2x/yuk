use super::{SharedState, State, WsMsg};
use axum::extract::ws::{Message, WebSocket};
use futures::{
    stream::{SplitSink, SplitStream},
    SinkExt, StreamExt,
};
use log::{error, info};
use sqlx::PgPool;
use std::{collections::HashMap, net::SocketAddr, sync::Arc};
use tokio::sync::mpsc;

type WsTx = SplitSink<WebSocket, Message>;
type WsRx = SplitStream<WebSocket>;

pub fn msg_server(buffer: usize, pool: Arc<PgPool>) -> (MsgServer, SharedState) {
    let (tx, rx) = mpsc::channel(buffer);
    let receiver = MsgServer(rx);
    let state = State {
        pool,
        port: Port::new(MsgSender(tx)),
    };
    (receiver, SharedState(Arc::new(state)))
}

pub struct MsgServer(mpsc::Receiver<Msg>);

impl MsgServer {
    pub async fn serve(self) {
        info!("start server");

        let Self(mut rx) = self;
        let mut pool = HashMap::new();

        while let Some(msg) = rx.recv().await {
            let Msg { ty, id } = msg;
            match ty {
                MsgType::ConnCreated { ws_tx } => {
                    info!("connection created ({})", id);
                    pool.insert(id, ws_tx);
                }
                MsgType::TextReceived { text: msg } => {
                    for (id, ws_tx) in &mut pool {
                        if let Err(e) = ws_tx
                            .send(Message::Text(format!("{{id: {}, msg: {}}}", id, msg)))
                            .await
                        {
                            error!("send message ({}): {}", id, e);
                        }
                    }
                }
                MsgType::ConnClosed => {
                    info!("connection closed ({})", id);
                    pool.remove(&id);
                }
            }
        }

        info!("server closed");
    }
}

/// A wrapper of [`mpsc::Sender`], panic if sending message is not available.
#[derive(Clone)]
struct MsgSender(mpsc::Sender<Msg>);

impl MsgSender {
    pub async fn send_msg(&self, msg: Msg) {
        self.0.send(msg).await.expect("can't send message")
    }
}

pub(super) struct Port {
    tx: MsgSender,
}

impl Port {
    fn new(tx: MsgSender) -> Self {
        Self { tx }
    }

    pub async fn connect(&self, addr: SocketAddr, socket: WebSocket) -> anyhow::Result<Connection> {
        let (ws_tx, ws_rx) = socket.split();

        // Announce the creation of this connection
        let ty = MsgType::ConnCreated { ws_tx };
        self.tx.send_msg(Msg { id: addr, ty }).await;

        // Create a new sender
        Ok(Connection {
            id: addr,
            ws_rx,
            msg_tx: self.tx.clone(),
        })
    }
}

/// A websocket connection.
pub(super) struct Connection {
    id: SocketAddr,
    ws_rx: WsRx,
    msg_tx: MsgSender,
}

impl Connection {
    pub fn id(&self) -> &SocketAddr {
        &self.id
    }

    /// Wait for a message from the client, this will also forwards the message to the center.
    /// Connection will be closed when error occurs or the connected socket is closed.
    pub async fn recv_msg(&mut self) -> Option<WsMsg> {
        while let Some(res) = self.ws_rx.next().await {
            match res {
                Ok(msg) => {
                    // Handle text message.
                    if let Message::Text(text) = msg {
                        match serde_json::from_str::<WsMsg>(&text) {
                            Ok(ws_msg) => {
                                let ty = MsgType::TextReceived { text: text.clone() };
                                self.msg_tx.send_msg(Msg { id: self.id, ty }).await;
                                return Some(ws_msg);
                            }
                            Err(e) => error!("deserialize message ({}): {}", self.id, e),
                        }
                    }
                }
                Err(e) => error!("receive message ({}): {}", self.id, e),
            }
        }
        self.close().await;
        None
    }

    async fn close(&mut self) {
        let ty = MsgType::ConnClosed;
        self.msg_tx.send_msg(Msg { id: self.id, ty }).await;
    }
}

#[derive(Debug)]
struct Msg {
    id: SocketAddr,
    ty: MsgType,
}

#[derive(Debug)]
enum MsgType {
    ConnCreated { ws_tx: WsTx },
    TextReceived { text: String },
    ConnClosed,
}
