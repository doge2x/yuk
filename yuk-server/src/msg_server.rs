use anyhow::{anyhow, Result};
use futures_util::{
    stream::{SplitSink, SplitStream},
    SinkExt, StreamExt,
};
use log::{error, info};
use std::{collections::HashMap, net::SocketAddr};
use tokio::{net::TcpStream, sync::mpsc};
use tokio_tungstenite::{accept_async, tungstenite::Message, WebSocketStream};

type WsTx = SplitSink<WebSocketStream<TcpStream>, Message>;
type WsRx = SplitStream<WebSocketStream<TcpStream>>;

pub fn new_server(buffer: usize) -> (MsgServer, Channel) {
    let (tx, rx) = mpsc::channel(buffer);
    let server = MsgServer::new(rx);
    let channel = Channel::new(MsgSender(tx));
    (server, channel)
}

/// Central message server which forwards all received messages to each connection.
pub struct MsgServer {
    rx: mpsc::Receiver<Msg>,
    pool: HashMap<SocketAddr, WsTx>,
}

impl MsgServer {
    fn new(rx: mpsc::Receiver<Msg>) -> Self {
        Self {
            rx,
            pool: HashMap::new(),
        }
    }

    pub async fn serve(&mut self) {
        info!("start server");

        while let Some(msg) = self.rx.recv().await {
            let Msg { ty, id } = msg;
            match ty {
                MsgType::ConnCreated { ws_tx } => {
                    info!("connection created ({})", id);
                    self.pool.insert(id, ws_tx);
                }
                MsgType::TextReceived { text: msg } => {
                    for (id, ws_tx) in &mut self.pool {
                        if let Err(e) = ws_tx
                            .send(Message::text(format!("{{id: {}, msg: {}}}", id, msg)))
                            .await
                        {
                            error!("send message ({}): {}", id, e);
                        }
                    }
                }
                MsgType::ConnClosed => {
                    info!("connection closed ({})", id);
                    self.pool.remove(&id);
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

pub struct Channel {
    tx: MsgSender,
}

impl Channel {
    fn new(tx: MsgSender) -> Self {
        Self { tx }
    }

    pub async fn connect(&self, stream: TcpStream) -> Result<Connection> {
        let peer = stream
            .peer_addr()
            .map_err(|e| anyhow!("peer address of connected stream: {}", e))?;
        info!("peer address: {}", peer);

        let (ws_tx, ws_rx) = accept_async(stream)
            .await
            .map_err(|e| anyhow!("accept websocket stream ({}): {}", peer, e))?
            .split();

        // Announce the creation of this connection
        let ty = MsgType::ConnCreated { ws_tx };
        self.tx.send_msg(Msg { id: peer, ty }).await;

        // Create a new sender
        Ok(Connection {
            id: peer,
            ws_rx,
            msg_tx: self.tx.clone(),
        })
    }
}

/// A websocket connection.
pub struct Connection {
    id: SocketAddr,
    ws_rx: WsRx,
    msg_tx: MsgSender,
}

impl Connection {
    /// Wait for a message from the client, this will also forwards the message to the center.
    /// Connection will be closed when error occurs or the connected socket is closed.
    pub async fn recv_msg(&mut self) -> Option<String> {
        while let Some(res) = self.ws_rx.next().await {
            match res {
                Ok(msg) => {
                    // Handle text message.
                    if let Message::Text(text) = msg {
                        let ty = MsgType::TextReceived { text: text.clone() };
                        self.msg_tx.send_msg(Msg { id: self.id, ty }).await;
                        return Some(text);
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
