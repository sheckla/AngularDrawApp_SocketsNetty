import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: any;

  constructor() {   }


  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  emitTest(val: number) {
    this.socket.emit('my message', val);
  }
}