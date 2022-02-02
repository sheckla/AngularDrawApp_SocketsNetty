import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import {io} from 'socket.io-client';

//https://www.youtube.com/watch?v=66T2A2dvplY
@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
/*
  // Our socket connection
  private readonly url = "localhost:8080";
  private socket = io(this.url, {
    transports: ['websocket']
  });

  constructor() {
    console.log("test");
    this.socket.on("test", (arg) => {
      console.log(arg);
    }); 
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data:any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
*/
}