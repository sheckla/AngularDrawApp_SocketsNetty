import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  private ws: WebSocket = new WebSocket('ws://localhost:9092/socket.io/?EIO=3&transport=websocket');

  // Konstrukor wird mehrmals aufgerufen
  constructor() {
    console.log("constructor socket");
    /*     this.socket = io("https://localhost:9092", {
    transports: ["websocket"] // use WebSocket first, if available});
  });

  this.socket.on("connect_error", () => {  // revert to classic upgrade
    this.socket.io.opts.transports = ["polling", "websocket"];
  }); */




  /* this.ws.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);

  }); */

  /* event = new Event("message", {"bubbles":true, "cancelable":false});
  dispatchEvent(event);

  this.ws.addEventListener('open', (event) => {
    this.ws.send('Hello Server!');
  }); */

}

public sendMessage(message) {
  //this.ws.send('message');
  this.socket.emit("message", "Test");
  console.log("sendMessage");
  console.log(this.socket.connected);
  this.socket.on("connect"), (event: any) => {
    console.log("connect");
  }
}

public getNewMessage = () => {
  this.socket.on('message', (message) => {
    this.message$.next(message);
  })
  return this.message$.asObservable();
}


connected() {
  console.log("socket_connected()")
  this.socket = io.connect('http://localhost:9092'), { // Source CORS Error
  widthCredentials: false,
  transports: ["websocket"],
  upgrade: false
}
this.socket.on('reconnect_attempt', () => {  this.socket.io.opts.transports = ['polling', 'websocket'];});

this.socket.on("connect_error"), (event: any) => {
  console.log("connect error");
}

this.socket.on("connect"), (event: any) => {
  console.log("connect");
}
}
}
