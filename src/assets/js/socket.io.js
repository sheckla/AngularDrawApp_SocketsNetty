import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

$( document ).ready(function() { 
    
    var socket =  io.connect('http://localhost:9092',{
    }); 

    socket.on("connect", () => {
        console.log(socket.connected); // true
    });
      
    socket.on("disconnect", () => {
        console.log(socket.connected); // false
    });

    socket.emit("test", "ProggnMachtSpaß");
    
});
