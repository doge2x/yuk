const YUK_ADDR = "ws://127.0.0.1:9009";
const WS_NUM = 150;

const connections = new Map();

function new_ws(id) {
  const ws = new WebSocket(YUK_ADDR);
  ws.onmessage = (e) => console.log(e.data);
  ws.onclose = () => console.info(`#${id} closed, ${connections.size} left`);
  return new Promise((resolve, _) => (ws.onopen = (_) => resolve(ws)));
}

setInterval(() => {
  const id = Math.floor(Math.random() * WS_NUM);
  const conn = connections.get(id);
  if (conn === undefined) {
    new_ws(id).then((ws) => {
      ws.send(`#${id}: hello`);
      console.info(`#${id}: connected`);
      connections.set(id, ws);
    });
  } else {
    connections.get(id).close();
    connections.delete(id);
  }
}, 100);
