$( document ).ready(function() {
  canvasEngine();
});

var paths = [];

function canvasEngine() {
  var canvas = document.getElementById("zeichenflaeche");
  var ctx = canvas.getContext("2d");
  canvas.width = document.getElementById("zeichenflaeche").parentNode.parentElement.clientWidth;
  canvas.height = 600;

  var isPainting = false;
  var buttons = document.getElementsByClassName('color-button');
  var drawSize = 10;
  var drawSizeIncrement = 3;
  var color = "black";

  paths = [];
  var RedoPathsStack = [];

  canvas.addEventListener('mousedown', startpainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseleave', mouseLeftCanvas);


  // Buttons
  var resetDrawSizeButton = document.getElementById("resetDrawSizeButton");
  resetDrawSizeButton.onclick = function() {resetDrawSize()};
  document.getElementById("clear").onclick = function() {clearAll()};
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

  window.addEventListener("resize", resizeCanvas, false);

  function mouseLeftCanvas(e) {
    isPainting=false;
  }

  function startpainting(e) {
    isPainting = true;
    var points = [];
    paths.push(points);
    draw(e);
  }

  function stopPainting() {
    isPainting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if(!isPainting) return;
    ctx.strokeStyle = color;
    paths[paths.length-1].push({
      x: getMousePosX(e),
      y: getMousePosY(e),
      size: drawSize,
      color: color,
    })
    redrawAll(e);
  }

  function getMousePosX(e) {
    var rect = canvas.getBoundingClientRect();
    return e.clientX - rect.left;
  }
  function getMousePosY(e) {
    var rect = canvas.getBoundingClientRect();
    return e.clientY - rect.top
  }


  // TODO kann geloescht werden?
  function resizeCanvas(e) {
    var myCanvas = document.getElementById("zeichenflaeche");
    myCanvas.width = document.getElementById("zeichenflaeche").parentNode.parentElement.clientWidth;
  }

  function clearAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paths = [];
    RedoPathsStack = [];
  }

  function resetDrawSize() {
    drawSize = 10;
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
    if (paths.length > 0) {
      RedoPathsStack.push(paths.pop());
      redrawAll();
    }
  }

  function redo() {
    if (RedoPathsStack.length > 0) {
      paths.push(RedoPathsStack.pop());
      redrawAll(ctx);
    }
  }

  function changeColor(index) {
    var button = buttons[index];
    color = window.getComputedStyle(button).backgroundColor;
  }

  https://jsfiddle.net/kgt5vzdh/
  function saveImage() {
    var w = 480;
    var h = 340;

    if (document.getElementById) {
      w = screen.availWidth;
      h = screen.availHeight;
    }

    var popW = document.getElementById("zeichenflaeche").parentNode.parentElement.clientWidth + 75;
    var popH = 600 + 75;

    var leftPos = (w - popW) / 2;
    var topPos = (h - popH) / 2;

    msgWindow = window.open('', 'Image', 'width=' + popW + ',height=' + popH +
    ',top=' + topPos + ',left=' + leftPos + ',       scrollbars=yes, resizeable=no');

    var canvas = document.getElementById("zeichenflaeche");
    var dataURL = canvas.toDataURL("image/png");
    msgWindow.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
  }

  function redrawAll() {
    _redrawAll(ctx, canvas, paths);
  }
}

// --------------------------------------------------

function resetPaths() {
  paths = [];
  paths[0].push({
    x: 20,
    y: 30,
    size: 30,
    color: "black"
  })
  //redrawAll();
}

function _redrawAll(ctx, canvas, paths) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    _fillPoints(ctx, points);
  }
}

// Verbindet die einzelnen Punkte von _redrawAll()
function _fillPoints(ctx, points) {
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

