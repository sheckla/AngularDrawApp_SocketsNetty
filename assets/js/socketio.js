// mvnw spring-boot:run
// stop with strg + c

var socket;

export function connect() {
  var eventCount = 1;
  socket =  io('http://localhost:9092',{
  transports: ['websocket'],
  upgrade: false
});

socket.on("connect", () => {
  console.log("(this client) socketio.js - client connected successfully @" + socket.id);
  socket.emit("notifyClients", "")
});

socket.on("notifyClients", (data) => {
  if (socket.id != data) {
    console.log("(different Client) notifyClients from: @" + data + " eventCount:" + eventCount++);
  }
});
return socket;
}

export function getSocket() {
  return socket;
}

export function sendCanvasPathDataEvent(path) {
  socket.emit("sendCanvasPathDataToServer", path);
}

export function sendChatEvent(msg) {
  socket.emit("chatEvent", msg);
}

export function getName() {
  return socket.id;
}
