use crate::msg_server::Connection;

pub struct MsgHandler {
    conn: Connection,
}

impl MsgHandler {
    pub fn new(conn: Connection) -> Self {
        Self { conn }
    }

    pub async fn serve(&mut self) {
        while let Some(_) = self.conn.recv_msg().await {}
    }
}
