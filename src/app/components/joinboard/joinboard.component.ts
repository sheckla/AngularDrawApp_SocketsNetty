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
  currentRoomText : String = '';
  otherUsersText: string = '';
  errorDisplayMessage = "";
  userName : String = '';
  userList: string[] = [];
  messages: string[] = [];
  userConnected = false;
  showReturnToRegisterUI = false;

  constructor(private userHandlerService: UserHandlerService, private zeichenflaeche: ZeichenflaecheComponent) {
    this.userHandlerService.resultList$.subscribe(userName => {
      this.userName = userName.toString();
      this.showReturnToRegisterUI = true;
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
      this.currentRoomText = "Aktueller Raum: \"" + data + "\"";
      this.userConnected = true;
      this.showReturnToRegisterUI = false;
      this.userList = [];
      this.otherUsersText = "Andere Nutzer in der Session:";
      socketio.getSocket().emit("requestRoomClientsNames");
    })

    socketio.getSocket().on("enterRoomFailure", () => {
      console.log("Raum nicht vorhanden!");
      this.errorDisplayMessage = "Der Raum ist nicht vorhanden.";
      this.disconnect();
    })

    socketio.getSocket().on("createRoomFailure", () => {
      console.log("Raum schon vorhanden!");
      this.errorDisplayMessage = "Der Raum existiert schon. Wähle anderen Raumcode";
      this.disconnect();
    })

    socketio.getSocket().on("requestRoomClientsNamesFromServer", () =>{
      socketio.getSocket().emit("sendClientNameToServer", this.userName);
    });

    socketio.getSocket().on("sendClientNameToClients", (clientName) =>{
      if (clientName && clientName != this.userName && !this.userList.includes(clientName)) {
        this.userList.push(clientName);
      }
    });

    socketio.getSocket().on("clientDisconnected", () => {
      this.userList = [];
      socketio.getSocket().emit("requestRoomClientsNames");
    })

    socketio.getSocket().on("chatMessageToClient", (data) => {
      this.messages.push(data);
    })
  }

  changeName() {
    this.userHandlerService.updateResultList("");
  }

  disconnect() {
    socketio.getSocket().emit("leaveRoom");
    this.zeichenflaeche.closeConnection();
    this.userConnected = false;
    this.showReturnToRegisterUI = true;
    this.otherUsersText = '';
    this.currentRoomText = '';
    this.userList = [];
    this.messages = [];
  }

  enterRoom(code: any) {
    this.initConnection();
    socketio.getSocket().emit("enterRoom", code); // request Room-ID from Server
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
