import { Component, HostListener, OnInit } from '@angular/core';
import { UserHandlerService } from 'src/app/services/user-handler.service';
import * as socketio from '../../../../assets/js/socketio';
import { DrawboardComponent } from '../drawboard/drawboard.component';
import * as chatScrollHandler from './chatScrollHandler.js'

@Component({
  providers:[DrawboardComponent],
  selector: 'app-joinboard',
  templateUrl: './joinboard.component.html',
  styleUrls: ['./joinboard.component.css']
})
export class JoinboardComponent implements OnInit {
  roomName: String = '';
  userName : String = '';
  userIsConnected = false;
  showReturnToRegisterUI = false;

  HTMLRoomText : String = '';
  HTMLOtherUsersText: string = '';
  HTMLdebugDisplayMessage = "";
  HTMLUserListArray: string[] = [];
  HTMLChatMessagesArray: string[] = [];

  constructor(private userHandlerService: UserHandlerService, private zeichenflaeche: DrawboardComponent) {
    this.subcribeToUserHandlerService();
  }

  ngOnInit(): void {
  }

  // Called upon then reloading/closing the Website
  @HostListener('window:beforeunload', ['$event'])
  async onBeforeUnload(): Promise<void> {
    socketio.emit_leaveRoom();
  }

  subcribeToUserHandlerService() {
    this.userHandlerService.clientName$.subscribe(userName => {
      this.userName = userName.toString();
      this.showReturnToRegisterUI = true;
    });
  }

  buttonGenerateRoomName() {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var code = '';
    for(var i = 0; i < 9; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    this.roomName = code;
    this.copyRoomNameToClipboard();
  }

  inputFieldRoomName_onChangeValue(newRoomName) {
    this.roomName = newRoomName;
  }

  copyRoomNameToClipboard() {
    navigator.clipboard.writeText(this.roomName.toString());
    this.HTMLdebugDisplayMessage = "Raumname \"" + this.roomName + "\" wurde in die Zwischenablage kopiert.";
  }

  returnToHomeComponent() {
    this.userHandlerService.updateClientName("");
    // if clientName is empty, the sign-up UI will be displayed
  }

  enterRoom() {
    if (!this.roomName) {
      this.HTMLdebugDisplayMessage = "Kein Raum-Name eingegeben";
      return;
    }
    this.initSocketConnection();
    socketio.emit_enterRoom(this.roomName); // request Room-ID from Server
    socketio.emit_requestRoomClientsNames();
    this.sendMessageToServer(" ist dem Raum beigetreten");
  }

  disconnectFromRoom() {
    socketio.emit_leaveRoom();
    this.zeichenflaeche.closeSocketConnection();
    this.userIsConnected = false;
    this.showReturnToRegisterUI = true;
    this.HTMLdebugDisplayMessage = '';
    this.HTMLOtherUsersText = '';
    this.HTMLRoomText = '';
    this.HTMLUserListArray = [];
    this.HTMLChatMessagesArray = [];
  }

  createRoom() {
    if (!this.roomName) {
      this.HTMLdebugDisplayMessage = "Kein Raum-Name eingegeben";
      return;
    }
    this.initSocketConnection();
    socketio.emit_createRoom(this.roomName);
    this.sendMessageToServer("hat einen Raum erstellt :^)");
  }

  sendMessageToServer(msg: string) {
    if (msg.length == 0) return;

    var today = new Date();
    var time = this.prefixNumberWithZero(today.getHours()) + ":" + this.prefixNumberWithZero(today.getMinutes());
    socketio.emit_chatMessageToServer("[ " + time + " ]  " + this.userName + ": " + msg)
  }

  private initSocketConnection() {
    socketio.disconnect();
    socketio.connect();
    this.HTMLdebugDisplayMessage = "";
    this.zeichenflaeche.initSocketConnection();

    // Set Room-ID Text in HTML
    socketio.getSocket().on("enterRoomSuccessfull", (data) => {
      this.HTMLRoomText = "Raum \"" + data + "\"";
      this.userIsConnected = true;
      this.showReturnToRegisterUI = false;
      this.HTMLUserListArray = [];
      this.HTMLOtherUsersText = "Andere Nutzer in der Session:";
      socketio.emit_requestRoomClientsNames();
      socketio.emit_requestRoomClientsIDs();
    })

    socketio.getSocket().on("enterRoomFailure", () => {
      this.disconnectFromRoom();
      this.HTMLdebugDisplayMessage = "Der Raum ist nicht vorhanden.";
    })

    socketio.getSocket().on("createRoomFailure", () => {
      this.disconnectFromRoom();
      this.HTMLdebugDisplayMessage = "Der Raum existiert schon. Wähle anderen Raumcode";
    })

    socketio.getSocket().on("requestRoomClientsNamesFromServer", () =>{
      socketio.emit_sendClientNameToServer(this.userName);
    });

    socketio.getSocket().on("sendClientNameToClients", (clientName) =>{
      if (clientName && clientName != this.userName && !this.HTMLUserListArray.includes(clientName)) {
        this.HTMLUserListArray.push(clientName);
      }
    });

    socketio.getSocket().on("clientDisconnected", () => {
      this.HTMLUserListArray = [];
      socketio.emit_requestRoomClientsNames();
      socketio.emit_requestRoomClientsIDs();
    })

    socketio.getSocket().on("chatMessageToClient", (data) => {
      this.HTMLChatMessagesArray.push(data);
      chatScrollHandler.scrollToBottomOf_li();
    })
  }

  private prefixNumberWithZero(number) {
    var s = number.toString();
    for (var i = 0; i < 2 - s.length; i++) {
      s = '0' + number;
    }
    return s;
  }
}
