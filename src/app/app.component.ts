import { Component, OnInit } from '@angular/core';
import * as socketio from '../../assets/js/socketio.js';
import * as zeichentools from './js/zeichentools.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'socketio-angular';
  userLoggedIn = true;
  private socket;

  constructor(){
    this.socket = socketio.connect();
  }

  ngOnInit(): void {
    //socket.emit("test", "from app.component.ts");
  }

  sendTest() {
    zeichentools.tools();
    this.socket.emit("test","from app.component.ts::sendTest()");
    this.socket.emit("notifyClients", "notifyClients");
  }
}
// terminal ooad/whiteboard
