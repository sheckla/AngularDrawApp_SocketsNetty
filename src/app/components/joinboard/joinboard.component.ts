import { Component, HostListener, OnInit } from '@angular/core';
import { UserHandlerService } from 'src/app/user-handler.service';
import * as socketio from '../../../../assets/js/socketio';
import { ZeichenflaecheComponent } from '../zeichenflaeche/zeichenflaeche.component';

@Component({
  providers:[ZeichenflaecheComponent],
  selector: 'app-joinboard',
  templateUrl: './joinboard.component.html',
  styleUrls: ['./joinboard.component.css']
})
export class JoinboardComponent implements OnInit {
  userName : String = '';
  roomText : String = '';
  users: string[] = [];
  otherUsers: string = '';
  messages: string[] = [];
  userConnected = false;
  errorDisplayMessage = "";

  constructor(private userHandlerService: UserHandlerService, private zeichenflaeche: ZeichenflaecheComponent) {
    this.userHandlerService.resultList$.subscribe(userName => {
      this.userName = userName.toString();
    });
  }

  ngOnInit(): void {
  }

  // Called upon then reloading/closing the Website
  @HostListener('window:beforeunload', ['$event'])
  async onBeforeUnload(): Promise<void> {
    socketio.getSocket().emit("leaveRoom");
  }

  initConnection() {
    if (socketio.getSocket()) {
      socketio.getSocket().disconnect();
    }
    socketio.connect();
    this.errorDisplayMessage = "";
    this.zeichenflaeche.initConnection();

    // Set Room-ID Text in HTML
    socketio.getSocket().on("enterRoomSuccessfull", (data) => {
      this.roomText = "Aktueller Raum: \"" + data + "\"";
      this.userConnected = true;
    })

    socketio.getSocket().on("enterRoomFailure", () => {
      console.log("nicht vorhanden!");
      this.errorDisplayMessage = "Der Raum ist nicht vorhanden.";
      this.disconnect();
    })

    socketio.getSocket().on("createRoomFailure", () => {
      console.log("doppelt!");
      this.errorDisplayMessage = "Der Raum existiert schon. Wähle anderen Raumcode";
      this.disconnect();
    })

    socketio.getSocket().on("sendRoomClientsIDs", (data) =>{
      this.users = [];
      var json = JSON.parse(data);

      if (json.length == 1) {
        this.otherUsers = "";
      } else {
        for (var i = 0; i < json.length; i++) {
          this.otherUsers = "Andere Nutzer in der Session:";
          if (socketio.getName() != json[i]) {
            this.users.push(json[i]);
          }
        }
      }
    });

    socketio.getSocket().on("clientDisconnected", () => {
      socketio.getSocket().emit("requestRoomClientsIDs");
    })

    socketio.getSocket().on("chatMessageToClient", (data) => {
      this.messages.push(data);
    })
  }

  disconnect() {
    socketio.getSocket().emit("leaveRoom");
    this.zeichenflaeche.closeConnection();
    this.userConnected = false;
    this.otherUsers = '';
    this.roomText = '';
    this.users = [];
    this.messages = [];
  }

  enterRoom(code: any) {
    this.initConnection();
    socketio.getSocket().emit("enterRoom", code); // request Room-ID from Server
    socketio.getSocket().emit("requestRoomClientsIDs"); // requests other Clients in current Session
  }

  startRoom(code: any) {
    this.initConnection();
    socketio.getSocket().emit("createRoom", code);
    this.sendMessage("hat einen Raum erstellt!");
  }

  sendMessage(msg: string) {
    if (msg.length == 0) return;

    socketio.getSocket().emit("chatMessageToServer", this.userName + ": " + msg);
  }

  pop() {
    console.log("pop");
  }
}
