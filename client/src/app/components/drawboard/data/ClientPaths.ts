import { Path } from "./Path";

export class Paths {
  clientSessionID: string = '';
  paths: Path[];

  constructor(clientSessionID: string) {
    this.paths = [];
    this.clientSessionID = clientSessionID;
  }

  push(path: Path) {
    this.paths.push(path);
  }

  getPaths() {
    return this.paths;
  }
}
