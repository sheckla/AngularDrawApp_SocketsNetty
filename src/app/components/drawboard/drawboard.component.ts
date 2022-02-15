import { Component, OnInit } from '@angular/core';
import * as canvas from '../../../assets/js/canvas.js'
import * as socketio from '../../../assets/js/socketio.js';
import { interval } from 'rxjs';
import { Point } from './Point';
import { Paths } from './ClientPaths';
import { Path } from './Path';

@Component({
  selector: 'app-drawboard',
  templateUrl: './drawboard.component.html',
  styleUrls: ['./drawboard.component.css']
})


export class DrawboardComponent implements OnInit {
  previousClientCanvasStates: any[] = [];

  ngOnInit(): void {
  }

  constructor() {
  }

  initSocketConnection() {
    socketio.getSocket().on("sendCanvasPathDataToClient", (data) => {
      canvas.prepareOtherClientPathData(data);
    })

    socketio.getSocket().on("resetPathsRequestToClient", () =>{
      canvas.clearAllPaths();
    });

    socketio.getSocket().on("sendRoomClientsIDs", (clients) =>{
      var json = JSON.parse(clients);
      for (var i = 0; i < json.length; i++) {
        if (socketio.getId() != json[i]) {
          canvas.createNewClientPaths(json[i]);
        }
      }
    });

    socketio.getSocket().on("clientDisconnected", (clientID) => {
      canvas.removeClientPaths(clientID);
    })

    const sourceInterval = interval(1);
    const sendPathsIntervallEvent = sourceInterval.subscribe(() => {
      this.checkIfCanvasChanged();
    });
  }

  closeSocketConnection() {
    socketio.getSocket().disconnect();
    canvas.clearClientPaths();
  }

  // -------- Buttons --------
  buttonClearClientCanvas() {
    canvas.clearClientPaths();
    this.checkIfCanvasChanged;
  }

  buttonGenerateConfetti() {
    canvas.generateRandomPaths();
    this.checkIfCanvasChanged();
  }

  buttonClearSessionCanvas() {
    socketio.emit_resetPathsRequestFromClient();
  }

  buttonPrintPathToConsole() {
    var paths = canvas.client.paths;
    console.log(paths);
  }

  private checkIfCanvasChanged() {
    if (!socketio.getSocket()) return;

    var paths = canvas.client.paths;
    this.previousClientCanvasStates.push(JSON.parse(JSON.stringify(paths)));
    if (this.previousClientCanvasStates.length > 5) this.previousClientCanvasStates.shift();

    if (JSON.stringify(paths) == JSON.stringify(this.previousClientCanvasStates[this.previousClientCanvasStates.length-2])) return;

    this.sendPathsToServer();
  }

  private sendPathsToServer() {
    var paths = canvas.client.paths;
    var _paths: Paths = new Paths(socketio.getId());
    for (var i = 0; i < paths.length; i++) {
      var _path: Path = new Path();
      var points = paths[i];
      for (var j = 0; j < points.length; j++) {
        var p = points[j];
        var point: Point = new Point(p.x, p.y, p.size, p.color);
        _path.push(point);
      }
      _paths.push(_path);
    }

    socketio.emit_sendCanvasPathDataToServer(JSON.stringify(_paths));
  }
}
