import { Component, OnInit } from '@angular/core';
import * as canvasHandler from '../../js/canvasHandler.js'
import * as socketio from '../../../../assets/js/socketio.js';
import { PathModel } from 'src/app/PathModel.js';

@Component({
  selector: 'app-zeichenflaeche',
  templateUrl: './zeichenflaeche.component.html',
  styleUrls: ['./zeichenflaeche.component.css']
})


export class ZeichenflaecheComponent implements OnInit {
  model: PathModel = {
    x: 20,
    y: 30
  };
  paths;
  messages: string[] = [];

  ngOnInit(): void {
  }

  constructor() {
    this.paths = window["paths"]
    this.initCanvasPathDataListeneverEvent();
    this.initChatEvent();

    setInterval(function() {
      var paths = window["paths"];
      if (paths.length == 0) return;
      var _paths: Paths = new Paths();
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
      socketio.getSocket().emit("sendCanvasPathDataToServer", JSON.stringify(_paths));
    }, 200);

  }

  resetPaths() {
    var point1 = new Point(22,22,30,"rgb(22,22,22");
    var point2 = new Point(222,222,30,"rgb(22,22,22");

    var point3 = new Point(100,122,10,"rgb(111,22,22");
    var point4 = new Point(500,122,10,"rgb(111,22,22");

    var path1 = new Path();
    path1.push(point1);
    path1.push(point2);

    var path2 = new Path();
    path2.push(point4)
    path2.push(point3)

    var paths: Path[] = [path1, path2, path1, path2, path2];
    canvasHandler.resetTypescript(paths);
  }

  randomDots() {
    canvasHandler.random();
  }

  printPath() {
    this.paths = window["paths"] // varFromJsFile = 'test'
    console.log(this.paths);
  }



  sendPaths() {
    this.paths = window["paths"];
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

  initCanvasPathDataListeneverEvent() {
    socketio.getSocket().on("sendCanvasPathDataToClient", (data) => {
      console.log("received paths");
      canvasHandler.reset(data);
    })
  }

  sendMessage(msg: string) {
    socketio.getSocket().emit("chatMessageToServer", msg);
  }

  initChatEvent() {
    socketio.getSocket().on("chatMessageToClient", (data) => {
      this.messages.push(data);
    })
  }
}


class Paths {
  paths: Path[];

  constructor() {
    this.paths = [];
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
