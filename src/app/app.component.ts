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

  ngOnInit(): void {
    var socket = socketio.connect();
    socket.emit("test", "daniel 123");
  }
