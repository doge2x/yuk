function getEnv(name: string, defaultVal?: string): string {
  const env = Deno.env.get(name);
  if (env === undefined) {
    if (defaultVal === undefined) {
      throw new Error(`can't interpret $${name}`);
    }
    return defaultVal;
  }
  return env;
}

const YUK_ADDR = getEnv("YUK_ADDR")!;
const TOTAL = parseInt(getEnv("YUK_TOTAL", "1000")!);
const INTERVAL = parseInt(getEnv("YUK_INTERVAL", "50")!);

class WsMsg {
  author: string;
  examId: string;
  answers: [];

  constructor(author: string, examId: string) {
    this.author = author;
    this.examId = examId;
    this.answers = [];
  }
}

const connections = new Map();

function newWs(id: number): Promise<WebSocket> {
  return new Promise((resolve, _) => {
    const ws = new WebSocket(YUK_ADDR);
    // ws.onmessage = (e) => console.log(e.data);
    ws.onclose = () => console.log(`#${id} closed, ${connections.size} left`);
    ws.onopen = (_) => resolve(ws);
  });
}

setInterval(() => {
  const id = Math.floor(Math.random() * TOTAL);
  const conn = connections.get(id);
  if (conn === undefined) {
    newWs(id).then((ws) => {
      const msg = new WsMsg("doge2x", "0");
      ws.send(JSON.stringify(msg));
      connections.set(id, ws);
    });
  } else {
    connections.delete(id);
    conn.close();
  }
}, INTERVAL);
