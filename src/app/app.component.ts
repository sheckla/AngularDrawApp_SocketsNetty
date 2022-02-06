import { Component, OnInit } from '@angular/core';
import * as socketio from '../../assets/js/socketio.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
<<<<<<< HEAD

=======
>>>>>>> ae52c9e6a89299e04e79a87796aa9eaca323d06b
  title = 'socketio-angular';
  userLoggedIn = true;

  ngOnInit(): void {
    var socket = socketio.connect();
    socket.emit("test", "daniel 123");
  }
<<<<<<< HEAD

  
}
=======
>>>>>>> ae52c9e6a89299e04e79a87796aa9eaca323d06b
