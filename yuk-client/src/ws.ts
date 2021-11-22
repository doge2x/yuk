import { MsgReceive, MsgSend } from "./types";

export class Connection {
  ws: WebSocket;

  private constructor(ws: WebSocket) {
    this.ws = ws;
  }

  static connect(addr: string): Promise<Connection> {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(addr);
      ws.onerror = (e) => reject(e);
      ws.onclose = () => reject(new Error("服务器关闭"));
      ws.onopen = () => resolve(new Connection(ws));
    });
  }

  listen(handler: (msg: MsgReceive) => void) {
    this.ws.addEventListener("message", (e) => handler(JSON.parse(e.data)));
  }

  send(msg: MsgSend) {
    if (this.ws.readyState === WebSocket.CLOSED) {
      throw new Error("服务器已关闭");
    }
    this.ws.send(JSON.stringify(msg));
  }
}
