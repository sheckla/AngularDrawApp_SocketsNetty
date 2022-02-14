import { Component, OnInit } from '@angular/core';
import * as canvas from '../../../assets/js/canvas.js'
import * as socketio from '../../../assets/js/socketio.js';
import { interval } from 'rxjs';
import { Point } from './Point';
import { Paths } from './ClientPaths';
import { Path } from './Path';

@Component({
  selector: 'app-zeichenflaeche',
  templateUrl: './zeichenflaeche.component.html',
  styleUrls: ['./zeichenflaeche.component.css']
})


export class ZeichenflaecheComponent implements OnInit {
  paths;
  previousPaths: any[] = [];

  ngOnInit(): void {
  }

  constructor() {
  }

  initConnection() {
    socketio.getSocket().on("sendCanvasPathDataToClient", (data) => {
      canvas.prepareOtherClientPathData(data);
    })

    socketio.getSocket().on("resetPathsRequestToClient", () =>{
      canvas.clearAllPaths();
    });

    socketio.getSocket().on("sendRoomClientsIDs", (clients) =>{
      var json = JSON.parse(clients);
      for (var i = 0; i < json.length; i++) {
        if (socketio.getName() != json[i]) {
          canvas.createNewClientPaths(json[i]);
        }
      }
    });

    socketio.getSocket().on("clientDisconnected", (clientID) => {
      canvas.removeClientPaths(clientID);
    })

    const sourceInterval = interval(1);
    const sendPathsIntervallEvent = sourceInterval.subscribe(() => {
      this.sendPaths();
    });
  }

  closeConnection() {
    socketio.getSocket().disconnect();
    canvas.clearClientPaths();
  }

  sendPaths() {
    if (!socketio.getSocket()) return;

    this.paths = canvas.client.paths;
    this.previousPaths.push(JSON.parse(JSON.stringify(this.paths)));
    if (this.previousPaths.length > 5) this.previousPaths.shift();

    if (JSON.stringify(this.paths) == JSON.stringify(this.previousPaths[this.previousPaths.length-2])) return;

    this.emitPaths();
  }

  emitPaths() {
    this.paths = canvas.client.paths;
    var _paths: Paths = new Paths(socketio.getName());
    for (var i = 0; i < this.paths.length; i++) {
      var _path: Path = new Path();
      var points = this.paths[i];
      for (var j = 0; j < points.length; j++) {
        var p = points[j];
        var point: Point = new Point(p.x, p.y, p.size, p.color);
        _path.push(point);
      }
      _paths.push(_path);
    }

    socketio.getSocket().emit("sendCanvasPathDataToServer", JSON.stringify(_paths));
  }

  // Buttons
  clearClientCanvas() {
    canvas.clearClientPaths();
    this.sendPaths;
  }

  randomDots() {
    canvas.generateRandomPaths();
    this.sendPaths();
  }

  clearAllPaths() {
    if (socketio.getSocket()) {
      socketio.getSocket().emit("resetPathsRequestfromClient");
    }
  }

  printPath() {
    this.paths = canvas.client.paths;
    console.log(this.paths);
  }

  sendMessage(msg: string) {
    // TODO clear text after sent message
    socketio.getSocket().emit("chatMessageToServer", msg);
  }
}
