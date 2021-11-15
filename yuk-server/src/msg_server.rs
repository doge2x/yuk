use futures_util::{
    stream::{SplitSink, SplitStream},
    SinkExt, StreamExt,
};
use log::{error, info};
use std::{collections::HashMap, net::SocketAddr};
use tokio::{net::TcpStream, sync::mpsc};
use tokio_tungstenite::{
    accept_async,
    tungstenite::{Error, Message},
    WebSocketStream,
};

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
                    info!("connection created: {}", id);
                    self.pool.insert(id, ws_tx);
                }
                MsgType::TextReceived { text: msg } => {
                    for (id, ws_tx) in &mut self.pool {
                        ws_tx
                            .send(Message::text(format!("{{id: {}, msg: {}}}", id, msg)))
                            .await
                            .unwrap_or_else(|e| log_ws_error(*id, e));
                    }
                }
                MsgType::ConnClosed => {
                    info!("connection closed: {}", id);
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

    pub async fn connect(&self, stream: TcpStream) -> Connection {
        let id = stream
            .peer_addr()
            .expect("connected streams should have a peer address");
        info!("peer address: {}", id);

        let (ws_tx, ws_rx) = accept_async(stream)
            .await
            .expect("failed to accept streams")
            .split();

        // Announce the creation of this connection
        let ty = MsgType::ConnCreated { ws_tx };
        self.tx.send_msg(Msg { id, ty }).await;

        // Create a new sender
        Connection {
            id,
            ws_rx,
            msg_tx: self.tx.clone(),
        }
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
        match self.ws_rx.next().await {
            Some(Ok(msg)) => {
                match msg {
                    // Forward text to the message center.
                    Message::Text(text) => {
                        let ty = MsgType::TextReceived { text: text.clone() };
                        self.msg_tx.send_msg(Msg { id: self.id, ty }).await;
                        return Some(text);
                    }
                    Message::Close(_) => (),
                    _ => error!("unexpected message type: {}", self.id),
                }
            }
            Some(Err(e)) => log_ws_error(self.id, e),
            _ => (),
        };
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

fn log_ws_error(addr: SocketAddr, e: Error) {
    match e {
        Error::ConnectionClosed | Error::Protocol(_) => (),
        err => error!("error processing connection({}): {}", addr, err),
    }
}
