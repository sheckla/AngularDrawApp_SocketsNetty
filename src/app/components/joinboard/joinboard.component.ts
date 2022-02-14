import { Component, HostListener, OnInit } from '@angular/core';
import { UserHandlerService } from 'src/app/services/user-handler.service';
import * as socketio from '../../../assets/js/socketio';
import { ZeichenflaecheComponent } from '../zeichenflaeche/zeichenflaeche.component';
import * as chatScrollHandler from './chatScrollHandler.js'

@Component({
  providers:[ZeichenflaecheComponent],
  selector: 'app-joinboard',
  templateUrl: './joinboard.component.html',
  styleUrls: ['./joinboard.component.css']
})
export class JoinboardComponent implements OnInit {
  roomName: String = '';
  currentRoomText : String = '';
  otherUsersText: string = '';
  errorDisplayMessage = "";
  userName : String = '';
  userList: string[] = [];
  messages: string[] = [];
  userConnected = false;
  showReturnToRegisterUI = false;

  constructor(private userHandlerService: UserHandlerService, private zeichenflaeche: ZeichenflaecheComponent) {
    this.subcribeToUserHandlerService();
  }

  subcribeToUserHandlerService() {
    this.userHandlerService.clientName$.subscribe(userName => {
      this.userName = userName.toString();
      this.showReturnToRegisterUI = true;
    });
  }

  ngOnInit(): void {
  }

  generateCode() {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var code = '';
    for(var i = 0; i < 9; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    this.roomName = code;
    this.copyRoomNameToClipboard();
  }

  onRoomNameChange(newRoomName) {
    this.roomName = newRoomName;
  }

  copyRoomNameToClipboard() {
    navigator.clipboard.writeText(this.roomName.toString());
    this.errorDisplayMessage = "Raumname \"" + this.roomName + "\" wurde in die Zwischenablage kopiert.";
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
      this.currentRoomText = "Raum \"" + data + "\"";
      this.userConnected = true;
      this.showReturnToRegisterUI = false;
      this.userList = [];
      this.otherUsersText = "Andere Nutzer in der Session:";
      socketio.getSocket().emit("requestRoomClientsNames");
    })

    socketio.getSocket().on("enterRoomFailure", () => {
      console.log("Raum nicht vorhanden!");
      this.disconnect();
      this.errorDisplayMessage = "Der Raum ist nicht vorhanden.";
    })

    socketio.getSocket().on("createRoomFailure", () => {
      console.log("Raum schon vorhanden!");
      this.disconnect();
      this.errorDisplayMessage = "Der Raum existiert schon. Wähle anderen Raumcode";
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

  returnToHome() {
    this.userHandlerService.updateClientName("");
  }

  disconnect() {
    socketio.getSocket().emit("leaveRoom");
    this.zeichenflaeche.closeConnection();
    this.userConnected = false;
    this.showReturnToRegisterUI = true;
    this.errorDisplayMessage = '';
    this.otherUsersText = '';
    this.currentRoomText = '';
    this.userList = [];
    this.messages = [];
  }

  enterRoom() {
    if (!this.roomName) {
      this.errorDisplayMessage = "Kein Raum-Name eingegeben";
      return;
    }
    this.initConnection();
    socketio.getSocket().emit("enterRoom", this.roomName); // request Room-ID from Server
    socketio.getSocket().emit("requestRoomClientsIDs");
  }

  startRoom() {
    if (!this.roomName) {
      this.errorDisplayMessage = "Kein Raum-Name eingegeben";
      return;
    }
    this.initConnection();
    socketio.getSocket().emit("createRoom", this.roomName);
    this.sendMessage("ich habe einen Raum erstellt :^)");
  }

  sendMessage(msg: string) {
    if (msg.length == 0) return;

    var today = new Date();
    var time = this.prefixNumberWithZero(today.getHours()) + ":" + this.prefixNumberWithZero(today.getMinutes());

    socketio.getSocket().emit("chatMessageToServer","[ " + time + " ]  " + this.userName + ": " + msg);
    chatScrollHandler.scrollToBottomOf_li();
  }

  private prefixNumberWithZero(number) {
    var s = number.toString();
    for (var i = 0; i < 2 - s.length; i++) {
        s = '0' + number;
    }
    return s;
  }
}
