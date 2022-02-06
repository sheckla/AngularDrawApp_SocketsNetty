import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { SocketioService } from './socketio.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newMessage: string = "";
  messageList: string[] = [];
  title = 'socketio-angular';
  userLoggedIn = true;
  socket: SocketioService = new SocketioService;

  constructor() {
    /* this.socket.connected();
    this.socket.getNewMessage().subscribe((message: string) => {
      this.messageList.push("appComponentTsOnInit");
    }) */
  }

  ngOnInit(){
  }

  public sendMessage() {
    //this.socket.sendMessage(this.newMessage);
    //this.messageList.push('appComponentTsSendMessage');
  }


  /*sendMessage() {
    this.chatServiceService.sendMessage(this.newMessage);
    this.newMessage = '';
  } */
  /* constructor(private websocketServiceService: WebsocketServiceService) {
    this.websocketServiceService.emit("test", "Hello World");
  }
  ngOnInit() {
    this.websocketServiceService.listen("testEvent").subscribe((data) => {
      console.log(data);
    });
  } */

}
