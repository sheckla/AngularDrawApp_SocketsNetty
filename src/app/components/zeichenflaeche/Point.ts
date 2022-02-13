export class Point {
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
