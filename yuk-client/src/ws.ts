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

  set onmessage(handler: (msg: MsgReceive) => void) {
    this.ws.onmessage = (e) => {
      handler(JSON.parse(e.data));
    };
  }

  send(msg: MsgSend) {
    this.ws.send(JSON.stringify(msg));
  }
}
