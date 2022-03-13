// mvnw spring-boot:run
// stop with strg + c

var socket;
var host = "https://netty-server-drawapp.herokuapp.com/";

export function test() {
  socket =  io(host, {
    transports: ['websocket'],
  });
  console.log("emit");
  socket.emit("connection");
  socket.on("send", () => {
    console.log("fucking works");
  });
}

export function connect() {
  socket =  io(host,{
    transports: ['websocket'],
    upgrade: false
  });
  socket.emit("connection");

  socket.on("connectionSuccessfull", () => {
    console.log("connected to host with id@" + socket.id);
    socket.emit("notifyClients", "")
  });
  return socket;
}

export function getSocket() {
  if (!socket) return;
  return socket;
}

export function getId() {
  if (!socket) return;
  return socket.id;
}

export function disconnect() {
  if (!socket) return;
  socket.disconnect();
}

export function emit_sendCanvasPathDataToServer(path) {
  if (!socket) return;
  socket.emit("sendCanvasPathDataToServer", path);
}

export function emit_requestRoomClientsNames() {
  if (!socket) return;
  socket.emit("requestRoomClientsNames");
}

export function emit_sendClientNameToServer(clientName) {
  if (!socket) return;
  socket.emit("sendClientNameToServer", clientName);
}

export function emit_enterRoom(roomName) {
  if (!socket) return;
  socket.emit("enterRoom", roomName);
}

export function emit_createRoom(roomName) {
  if (!socket) return;
  socket.emit("createRoom", roomName);
}

export function emit_leaveRoom() {
  if (!socket) return;
  socket.emit("leaveRoom");
}

export function emit_chatMessageToServer(msg) {
  if (!socket) return;
  socket.emit("chatMessageToServer", msg);
}

export function emit_resetPathsRequestFromClient() {
  if (!socket) return;
  socket.emit("resetPathsRequestfromClient");
}

export function emit_requestRoomClientsIDs() {
  if (!socket) return;
  socket.emit("requestRoomClientsIDs");
}
