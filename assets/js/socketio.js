export function connect() {
  var eventCount = 1;
  var socket =  io('http://localhost:9092',{
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

//socket.emit("test", "from socketio.js");

return socket;
}
