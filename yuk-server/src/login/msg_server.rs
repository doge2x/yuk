use super::{RetMsg, State, WsMsg};
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

pub fn msg_server(buffer: usize, pool: Arc<PgPool>) -> (MsgServer, State) {
    let (tx, rx) = mpsc::channel(buffer);
    let receiver = MsgServer(rx);
    let state = State {
        pool,
        port: Port::new(MsgSender(tx)),
    };
    (receiver, state)
}

pub struct MsgServer(mpsc::Receiver<Msg>);

impl MsgServer {
    pub async fn serve(self) {
        info!("start server");

        struct Conn {
            ws_tx: WsTx,
            username: String,
        }

        let Self(mut rx) = self;
        // Map: exam id => <Map: connection address => connection>
        let mut connections: HashMap<i64, HashMap<SocketAddr, Conn>> = HashMap::new();

        while let Some(msg) = rx.recv().await {
            let Msg { ty, addr, exam_id } = msg;
            match ty {
                MsgType::ConnCreated { ws_tx, username } => {
                    info!("connection created ({})", addr);
                    let conn = Conn { ws_tx, username };
                    connections.entry(exam_id).or_default().insert(addr, conn);
                }
                // Broadcast answers to all connections of the exam;
                MsgType::MsgBroadcast { msg } => {
                    let exam = connections.get_mut(&exam_id).unwrap();
                    let username = &exam.get(&addr).unwrap().username;
                    let msg = format!(r#"[{{"username":"{}","answers":{}}}]"#, username, msg);
                    for (id, conn) in exam {
                        if let Err(e) = conn.ws_tx.send(Message::Text(msg.clone())).await {
                            error!("send message ({}): {}", id, e);
                        }
                    }
                }
                // Return a message to the connection.
                MsgType::MsgReturn { ret_msg } => match serde_json::to_string(&ret_msg) {
                    Ok(msg) => {
                        let conn = connections
                            .get_mut(&exam_id)
                            .unwrap()
                            .get_mut(&addr)
                            .unwrap();
                        if let Err(e) = conn.ws_tx.send(Message::Text(msg)).await {
                            error!("send message ({}): {}", addr, e)
                        }
                    }
                    Err(e) => error!("serialize message ({}): {}", addr, e),
                },
                MsgType::ConnClosed => {
                    info!("connection closed ({})", addr);
                    connections
                        .get_mut(&exam_id)
                        .unwrap()
                        .remove(&addr)
                        .unwrap();
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

    pub async fn connect(
        &self,
        addr: SocketAddr,
        exam_id: i64,
        username: String,
        socket: WebSocket,
    ) -> anyhow::Result<Connection> {
        let (ws_tx, ws_rx) = socket.split();

        // Announce the creation of this connection
        let ty = MsgType::ConnCreated { ws_tx, username };
        let conn = Connection {
            addr,
            exam_id,
            ws_rx,
            msg_tx: self.tx.clone(),
        };
        self.tx.send_msg(conn.msg(ty)).await;

        // Create a new sender
        Ok(conn)
    }
}

/// A websocket connection.
pub(super) struct Connection {
    addr: SocketAddr,
    exam_id: i64,
    ws_rx: WsRx,
    msg_tx: MsgSender,
}

impl Connection {
    pub fn id(&self) -> &SocketAddr {
        &self.addr
    }

    pub async fn send_msg(&mut self, ret_msg: RetMsg) {
        let ty = MsgType::MsgReturn { ret_msg };
        self.msg_tx.send_msg(self.msg(ty)).await;
    }

    /// Wait for a message from the client, this will also broadcast the message to others.
    /// Connection will be closed when error occurs or the connected socket is closed.
    pub async fn recv_msg(&mut self) -> Option<WsMsg> {
        while let Some(res) = self.ws_rx.next().await {
            match res {
                Ok(msg) => {
                    // Handle text message.
                    if let Message::Text(text) = msg {
                        match serde_json::from_str::<WsMsg>(&text) {
                            Ok(ws_msg) => {
                                let ty = MsgType::MsgBroadcast { msg: text };
                                self.msg_tx.send_msg(self.msg(ty)).await;
                                return Some(ws_msg);
                            }
                            Err(e) => error!("deserialize message ({}): {}", self.addr, e),
                        }
                    }
                }
                Err(e) => error!("receive message ({}): {}", self.addr, e),
            }
        }
        self.close().await;
        None
    }

    async fn close(&mut self) {
        let ty = MsgType::ConnClosed;
        self.msg_tx.send_msg(self.msg(ty)).await;
    }

    fn msg(&self, ty: MsgType) -> Msg {
        Msg {
            addr: self.addr,
            exam_id: self.exam_id,
            ty,
        }
    }
}

#[derive(Debug)]
struct Msg {
    addr: SocketAddr,
    exam_id: i64,
    ty: MsgType,
}

#[derive(Debug)]
enum MsgType {
    ConnCreated { ws_tx: WsTx, username: String },
    MsgBroadcast { msg: String },
    MsgReturn { ret_msg: RetMsg },
    ConnClosed,
}
