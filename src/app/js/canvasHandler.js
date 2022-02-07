export function reset(paths) {
  var json = JSON.parse(paths);
  var paths = json.paths;
  console.log(paths);

  var pathsArr = [];
  for (var i = 0; i < paths.length; i++) {
    pathsArr.push(paths[i].points);
  }
  console.log(pathsArr);
  resetPaths(pathsArr);
}

export function resetTypescript(paths) {
  clearPaths();
}

export function random() {
  randomPaths();
}

export function getPaths() {
  return paths();
}

function convertObjectsPath(paths) {
  var pathsArr = [];
  for (var i = 0; i < paths.length; i++) {
    var pointsArr = [];
    pointsArr = paths[i].getPoints();
    for (var j = 0; j < pointsArr.length; j++) {
    }
    pathsArr.push(pointsArr);
  }
  return pathsArr;
}

// print out parsed 'paths' from zeichenflaeche.component.ts
function printObjectPath(paths) {
  for (var i = 0; i < paths.length; i++) {
    var points = [];
    points = paths[i].getPoints();
    console.log("------------ Path[" + i + "] ------------ ");
    for (var j = 0; j < points.length; j++) {
      console.log("Point[" + j + "]\n" +
      "x: " + points[j].x + "\n" +
      "y: " + points[j].y + "\n" +
      "size: " + points[j].size + "\n" +
      "color: " + points[j].color);
    }
  }
}
