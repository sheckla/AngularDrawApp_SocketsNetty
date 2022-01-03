import { Component, OnInit } from '@angular/core';
import { SocketioService } from './socketio.service';
import { NgModel } from '@angular/forms';
//import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  count: number = 0;
  title = 'socketio-angular';
  
  constructor(private socketService: SocketioService) {}
  
  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  increment() {
    this.socketService.emitTest(this.count++);
    
  }
}

export class Clicker {
  number: number;
  constructor () {
    this.number= 0;
  }

  onClick() {
    this.number++;
  }
}