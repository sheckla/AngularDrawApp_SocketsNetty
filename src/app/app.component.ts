import { Component, OnInit } from '@angular/core';
import * as socketio from '../../assets/js/socketio.js';


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
  }

  notifyClients() {
    this.socket.emit("notifyClients", "notifyClients");
  }
}
