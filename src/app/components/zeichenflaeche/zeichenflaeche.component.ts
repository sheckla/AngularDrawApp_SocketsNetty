import { Component, NgZone, OnInit } from '@angular/core';
import * as canvas from '../../js/canvas.js'
import * as socketio from '../../../../assets/js/socketio.js';
import { interval } from 'rxjs';

@Component({
  selector: 'app-zeichenflaeche',
  templateUrl: './zeichenflaeche.component.html',
  styleUrls: ['./zeichenflaeche.component.css']
})


export class ZeichenflaecheComponent implements OnInit {
  ngZone: NgZone;
  paths;
  previousPaths: any[] = [];

  ngOnInit(): void {
  }

  constructor(ngZone: NgZone) {
    this.ngZone = ngZone;
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
    var _paths: Paths = new Paths();
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

  publicFun() {
    this.ngZone.run(() => {
      console.log("yep");
    });
  }

  privateFun() {
    console.log("priv fun");
  }

}

class Paths {
  clientID: string = '';
  paths: Path[];

  constructor() {
    this.paths = [];
    this.clientID = socketio.getName();
  }

  push(path: Path) {
    this.paths.push(path);
  }

  getPaths() {
    return this.paths;
  }
}

class Path {
  points: Point[];

  constructor() {
    this.points = [];
  }

  push(point: Point) {
    this.points.push(point);
  }

  getPoints() {
    return this.points;
  }


}

class Point {
  x: number;
  y: number;
  size: number;
  color: string;

  constructor(x: number, y:number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  getValues() {
    var vals: any = [this.x, this.y, this.size, this.color];
    return vals;
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
      size: this.size,
      color: this.color
    }
  }
}
