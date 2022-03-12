
class PathData{
  constructor(clientID, paths) {
    this.clientID = clientID;
    this.paths = [];
  }

  setPaths(paths) {
    this.paths = paths;
  }
}

export var client = new PathData("0");
var otherClients = [];
const drawSizeIncrement = 3;
var ctx;
var canvas;



export function canvasEngine() {
  canvas = document.getElementById("zeichenflaeche");
  ctx = canvas.getContext("2d");
  var buttons = document.getElementsByClassName('color-button');
  var clientPathsRedoStack = [];
  var isPainting = false;
  var drawSize = 4;
  var color = "black";

  clearAllPaths();
  initButtons();
  initListeners();
  initCanvasDim();
  updateDrawSizeDisplay();

  function initButtons() {
    // General Buttons
    document.getElementById("resetDrawSizeButton").onclick = function() {resetDrawSize()};
    document.getElementById("drawSizePlusButton").onclick = function() {increaseDrawSize()};
    document.getElementById("drawSizeMinusButton").onclick = function() {decreaseDrawSize()};
    document.getElementById("undo").onclick = function() {undo()};
    document.getElementById("redo").onclick = function() {redo()};
    document.getElementById("saveImageButton").onclick = function() {saveImage()};

    // Color Buttons
    // Upper Row
    document.getElementById("colorButton1").onclick = function() {changeColor(0)};
    document.getElementById("colorButton2").onclick = function() {changeColor(1)};
    document.getElementById("colorButton3").onclick = function() {changeColor(2)};
    document.getElementById("colorButton4").onclick = function() {changeColor(3)};
    document.getElementById("colorButton5").onclick = function() {changeColor(4)};
    document.getElementById("colorButton6").onclick = function() {changeColor(5)};
    document.getElementById("colorButton7").onclick = function() {changeColor(6)};
    document.getElementById("colorButton8").onclick = function() {changeColor(7)};
    document.getElementById("colorButton9").onclick = function() {changeColor(8)};
    document.getElementById("colorButton10").onclick = function() {changeColor(9)};
    document.getElementById("colorButton11").onclick = function() {changeColor(10)};
    document.getElementById("colorButton12").onclick = function() {changeColor(11)};

    // Lower Row
    document.getElementById("colorButton101").onclick = function() {changeColor(12)};
    document.getElementById("colorButton102").onclick = function() {changeColor(13)};
    document.getElementById("colorButton103").onclick = function() {changeColor(14)};
    document.getElementById("colorButton104").onclick = function() {changeColor(15)};
    document.getElementById("colorButton105").onclick = function() {changeColor(16)};
    document.getElementById("colorButton106").onclick = function() {changeColor(17)};
    document.getElementById("colorButton107").onclick = function() {changeColor(18)};
    document.getElementById("colorButton108").onclick = function() {changeColor(19)};
    document.getElementById("colorButton109").onclick = function() {changeColor(20)};
    document.getElementById("colorButton110").onclick = function() {changeColor(21)};
    document.getElementById("colorButton111").onclick = function() {changeColor(22)};
    document.getElementById("colorButton112").onclick = function() {changeColor(23)};

  }

  function initListeners() {
    canvas.addEventListener('mousedown', startpainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', mouseLeftCanvas);
    window.addEventListener("resize", resizeCanvas, false);
  }

  function initCanvasDim() {
    canvas.width = document.getElementById("zeichenflaeche").parentNode.parentElement.clientWidth;
    canvas.height = document.getElementById("zeichenflaeche").parentNode.parentElement.clientHeight;
  }

  function mouseLeftCanvas(e) {
    isPainting=false;
  }

  function startpainting(e) {
    isPainting = true;
    client.paths.push([]);
    draw(e);
  }

  function stopPainting() {
    isPainting = false;
  }

  function draw(e) {
    if(!isPainting) return;
    client.paths[client.paths.length-1].push({
      x: getMousePosX(e),
      y: getMousePosY(e),
      size: drawSize,
      color: color,
    })
    _redrawAll(e);
  }

  function getMousePosX(e) {
    var rect = canvas.getBoundingClientRect();
    return e.clientX - rect.left;
  }
  function getMousePosY(e) {
    var rect = canvas.getBoundingClientRect();
    return e.clientY - rect.top
  }

  function resizeCanvas(e) {
    var myCanvas = document.getElementById("zeichenflaeche");
    myCanvas.width = document.getElementById("zeichenflaeche").parentNode.parentElement.clientWidth;
  }

  function resetDrawSize() {
    drawSize = 3;
    updateDrawSizeDisplay();
  }


  function increaseDrawSize() {
    if (drawSize + drawSizeIncrement > 30) {
      drawSize = 30;
      updateDrawSizeDisplay();
      return;
    }
    drawSize += drawSizeIncrement;
    updateDrawSizeDisplay();
  }

  function decreaseDrawSize() {
    if (drawSize - drawSizeIncrement < 1) {
      drawSize = 1;
      updateDrawSizeDisplay();
      return;
    }
    drawSize -= drawSizeIncrement;
    updateDrawSizeDisplay();
  }

  function updateDrawSizeDisplay() {
    resetDrawSizeButton.firstChild.data = "Brush Size : " + drawSize;
  }

  function undo() {
    if (client.paths.length > 0) {
      clientPathsRedoStack.push(client.paths.pop());
      _redrawAll();
    }
  }

  function redo() {
    if (clientPathsRedoStack.length > 0) {
      client.paths.push(clientPathsRedoStack.pop());
      _redrawAll(ctx);
    }
  }

  function changeColor(index) {
    var button = buttons[index];
    color = window.getComputedStyle(button).backgroundColor;
    ctx.strokeStyle = color;
  }

  //https://jsfiddle.net/kgt5vzdh/
  function saveImage() {
    var w = 480;
    var h = 340;

    if (document.getElementById) {
      w = screen.availWidth;
      h = screen.availHeight;
    }

    var popW = document.getElementById("zeichenflaeche").parentNode.parentElement.clientWidth + 8;
    var popH = 600 + 16;

    var leftPos = (w - popW) / 2;
    var topPos = (h - popH) / 2;

    var msgWindow = window.open('', 'Image', 'width=' + popW + ',height=' + popH +
    ',top=' + topPos + ',left=' + leftPos + ',       scrollbars=yes, resizeable=no');

    var canvas = document.getElementById("zeichenflaeche");
    var dataURL = canvas.toDataURL("image/png");
    msgWindow.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
  }

  function _redrawAll() {
    redrawAll();
  }
}

// --------------------------------------------------
export function prepareOtherClientPathData(paths) {
  var json = JSON.parse(paths);
  var paths = json.paths;
  var clientID = json.clientSessionID;

  var pathsArr = [];
  for (var i = 0; i < paths.length; i++) {
    pathsArr.push(paths[i].points);
  }
  updateOtherClientPathData(pathsArr, clientID);
}

export function updateOtherClientPathData(newPaths, clientID) {
  for (var i = 0; i < otherClients.length; i++) {
    if (otherClients[i].clientID == clientID) {
      otherClients[i].paths = newPaths;
    }
  }
  redrawAll();
}

export function clearAllPaths() {
  client.paths = [];
  for (var i = 0; i < otherClients.length; i++) {
    otherClients[i].paths = [];
  }
  redrawAll();
}

export function clearClientPaths() {
  client.paths = [];
  redrawAll();
}

function redrawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  redrawPaths(client.paths);
  for (var i = 0; i < otherClients.length; i++) {
    redrawPaths(otherClients[i].paths);
  }
}

export function createNewClientPaths(clientID) {
  var newClient = new PathData(clientID);
  for (var i = 0; i < otherClients.length; i++) {
    if (otherClients[i].clientID == clientID) return;
  }

  otherClients.push(newClient);
  console.log(otherClients);
}

export function removeClientPaths(clientID) {
  for (var i = 0; i < otherClients.length; i++) {
    if (otherClients[i].clientID == clientID) {
      otherClients.splice(i,1);
    }
  }
  redrawAll();
}

export function generateRandomPaths() {
  for (var i = 0; i < 500; i++) {
    var points = [];
    points.push({
      x: rand(canvas.width + 100) - 20,
      y: rand(canvas.height + 100) - 20,
      size: rand(10),
      color: "rgb(" + rand(255) +", " + rand(255) + ", " + rand(255) + ")",
    })
    client.paths.push(points);
  }
  redrawAll();
}

function rand(max) {
  return Math.floor(Math.random() * max);
}

function redrawPaths(paths) {
  for (var j = 0; j < paths.length; j++) {
    var points = paths[j];
    for (var i = 0; i < points.length; i++) {
      var pt = points[i];
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fillStyle = pt.color;
      ctx.fill();
    }
    fillPoints(ctx, points);
  }
}

// Verbindet die einzelnen Punkte von _redrawAll()
function fillPoints(ctx, points) {
  for (var i = 0; i < points.length-1; i++) {
    var pt1 = points[i];
    var pt2= points[i+1];
    ctx.strokeStyle = pt1.color;
    ctx.beginPath();
    ctx.lineWidth = pt1.size*2; // Radius vom Kreis = 2 * Höhe vom Rechteck
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.stroke();
  }
}
