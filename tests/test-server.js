const YUK_ADDR = "ws://127.0.0.1:9009";
const WS_NUM = 150;
const MSG = {
  author: "doge2x",
  exam_id: "0",
  answers: [
    {
      problem_id: 0,
      result: null,
    },
  ],
};

const connections = new Map();

function new_ws(id) {
  return new Promise((resolve, _) => {
    const ws = new WebSocket(YUK_ADDR);
    ws.onmessage = (e) => console.log(e.data);
    ws.onclose = () => console.info(`#${id} closed, ${connections.size} left`);
    ws.onopen = (_) => resolve(ws);
  });
}

function monkey() {
  setInterval(() => {
    const id = Math.floor(Math.random() * WS_NUM);
    const conn = connections.get(id);
    if (conn === undefined) {
      new_ws(id).then((ws) => {
        ws.send(JSON.stringify(MSG));
        console.info(`#${id}: connected`);
        connections.set(id, ws);
      });
    } else {
      connections.delete(id);
      conn.close();
    }
  }, 100);
}
