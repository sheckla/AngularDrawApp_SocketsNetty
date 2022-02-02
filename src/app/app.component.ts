import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { WebsocketServiceService } from './services/websocket-service.service';
//import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'socketio-angular';
  userLoggedIn = true;

  ngOnInit(): void {
  }
  /* constructor(private websocketServiceService: WebsocketServiceService) {
    this.websocketServiceService.emit("test", "Hello World");
  }
  
  ngOnInit() {
    this.websocketServiceService.listen("testEvent").subscribe((data) => {
      console.log(data);
    });

  } */

}
