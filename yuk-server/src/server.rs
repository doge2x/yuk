use futures_util::{
    stream::{SplitSink, SplitStream},
    SinkExt, StreamExt,
};
use log::{error, info};
use std::{collections::HashMap, net::SocketAddr};
use tokio::{net::TcpStream, sync::mpsc};
use tokio_tungstenite::{
    accept_async,
    tungstenite::{Error, Message, Result},
    WebSocketStream,
};

type WsTx = SplitSink<WebSocketStream<TcpStream>, Message>;
type WsRx = SplitStream<WebSocketStream<TcpStream>>;

pub fn new_server(buffer: usize) -> (MsgCenter, Channel) {
    let (tx, rx) = mpsc::channel(buffer);
    let server = MsgCenter::new(rx);
    let channel = Channel::new(tx);
    (server, channel)
}

pub struct MsgCenter {
    rx: mpsc::Receiver<Msg>,
    pool: HashMap<SocketAddr, WsTx>,
}

impl MsgCenter {
    fn new(rx: mpsc::Receiver<Msg>) -> Self {
        Self {
            rx,
            pool: HashMap::new(),
        }
    }

    pub async fn serve(&mut self) {
        info!("start server");

        while let Some(msg) = self.rx.recv().await {
            match msg {
                Msg::ConnCreated { id, ws_tx } => {
                    info!("connection created: {}", id);
                    self.pool.insert(id, ws_tx);
                }
                Msg::WsMsgReceived { msg } => {
                    for (id, ws_tx) in &mut self.pool {
                        ws_tx
                            .send(Message::text(format!("{{id: {}, msg: {}}}", id, msg)))
                            .await
                            .unwrap_or_else(|e| log_ws_error(*id, e));
                    }
                }
                Msg::ConnClosed { id } => {
                    info!("connection closed: {}", id);
                    self.pool.remove(&id);
                }
            }
        }

        info!("server closed");
    }
}

pub struct Channel {
    tx: mpsc::Sender<Msg>,
}

impl Channel {
    fn new(tx: mpsc::Sender<Msg>) -> Self {
        Self { tx }
    }

    pub async fn connect(&self, stream: TcpStream) -> MsgServer {
        let id = stream
            .peer_addr()
            .expect("connected streams should have a peer address");
        info!("peer address: {}", id);

        let ws_stream = accept_async(stream)
            .await
            .expect("failed to accept streams");
        let (ws_tx, ws_rx) = ws_stream.split();

        // add to connections pool
        self.tx
            .send(Msg::ConnCreated { id, ws_tx })
            .await
            .expect("can't send message");

        // create a new sender
        let tx = self.tx.clone();
        MsgServer { id, ws_rx, tx }
    }
}

pub struct MsgServer {
    id: SocketAddr,
    ws_rx: WsRx,
    tx: mpsc::Sender<Msg>,
}

impl MsgServer {
    pub async fn serve(&mut self) {
        self.handle_conn()
            .await
            .unwrap_or_else(|e| log_ws_error(self.id, e));
        self.tx
            .send(Msg::ConnClosed { id: self.id })
            .await
            .expect("can't send message");
    }

    async fn handle_conn(&mut self) -> Result<()> {
        while let Some(msg) = self.ws_rx.next().await {
            let msg = msg?;
            self.send_msg(msg).await;
        }
        Ok(())
    }

    async fn send_msg(&self, msg: Message) {
        self.tx
            .send(Msg::WsMsgReceived { msg })
            .await
            .expect("can't send message");
    }
}

#[derive(Debug)]
enum Msg {
    ConnCreated { id: SocketAddr, ws_tx: WsTx },
    WsMsgReceived { msg: Message },
    ConnClosed { id: SocketAddr },
}

fn log_ws_error(addr: SocketAddr, e: Error) {
    match e {
        Error::ConnectionClosed | Error::Protocol(_) => (),
        err => error!("error processing connection({}): {}", addr, err),
    }
}
