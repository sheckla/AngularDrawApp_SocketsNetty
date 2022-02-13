import { Path } from "./Path";

export class Paths {
  clientID: string = '';
  paths: Path[];

  constructor(clientID: string) {
    this.paths = [];
    this.clientID = clientID;
  }

  push(path: Path) {
    this.paths.push(path);
  }

  getPaths() {
    return this.paths;
  }
}
