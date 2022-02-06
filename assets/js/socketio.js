export function connect() {
    var socket =  io('http://localhost:9092',{
        transports: ['websocket'], 
        upgrade: false
    }); 

    socket.on("connect", () => {  console.log(socket.id)}); // x8WIv7-mJelg7on_ALbx});
    socket.emit("test", "alex 123");

    return socket;
}
