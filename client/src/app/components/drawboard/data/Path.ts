import { Point } from "./Point";

export class Path {
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
