$( document ).ready(function() {
  var canvas = document.getElementById("zeichenflaeche");
  var ctx = canvas.getContext("2d");
  var isPainting = false;
  var buttons = document.getElementsByClassName('color-button');
  canvas.width = document.getElementById("zeichenflaeche").parentNode.parentElement.clientWidth;
  canvas.height = 500;
  var drawSize = 10;
  var drawSizeIncrement = 3;
  var color = "black";

  // redo/undo http://jsfiddle.net/m1erickson/AEYYq/
  var points = [];
  var redoStack = [];

  canvas.addEventListener('mousedown', startpainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mousemove', draw);

  document.getElementById("clear").onclick = function() {clearAll()};
  document.getElementById("draw-size-plus").onclick = function() {increaseDrawSize()};
  document.getElementById("draw-size-minus").onclick = function() {decreaseDrawSize()};
  document.getElementById("undo").onclick = function() {undo()};
  document.getElementById("redo").onclick = function() {redo()};
  document.getElementById("resetDrawSizeButton").onclick = function() {resetDrawSize()};

  document.getElementById("colorButton1").onclick = function() {changeColor(0)};
  document.getElementById("colorButton2").onclick = function() {changeColor(1)};
  document.getElementById("colorButton3").onclick = function() {changeColor(2)};
  document.getElementById("colorButton4").onclick = function() {changeColor(3)};
  document.getElementById("colorButton5").onclick = function() {changeColor(4)};
  document.getElementById("colorButton6").onclick = function() {changeColor(5)};
  document.getElementById("colorButton7").onclick = function() {changeColor(6)};
  document.getElementById("colorButton8").onclick = function() {changeColor(7)};

  function startpainting(e) {
    isPainting = true;
    draw(e);
  }

  function stopPainting() {
    isPainting = false;
    ctx.beginPath();
  }

  function changeLineWidth(lineWidth) {
    ctx.lineWidth = lineWidth;
  }

  function draw(e) {
    if(!isPainting) return;
    ctx.lineWidth = drawSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = "" + color;
    ctx.lineTo(getMousePosX(e), getMousePosY(e));
    ctx.stroke();
    ctx.beginPath();

    points.push({
      x: getMousePosX(e),
      y: getMousePosY(e),
      size: drawSize,
      color: "" + color,
      mode: "draw"
    });

    ctx.moveTo(getMousePosX(e), getMousePosY(e));
    ctx.closePath();
  }

  function getMousePosX(e) {
    var rect = canvas.getBoundingClientRect();
    return e.clientX - rect.left;
  }
  function getMousePosY(e) {
    var rect = canvas.getBoundingClientRect();
    return e.clientY - rect.top
  }

  window.addEventListener("resize", resizeCanvas, false);

  function resizeCanvas(e) {
    var myCanvas = document.getElementById("zeichenflaeche");
    myCanvas.width = document.getElementById("zeichenflaeche").parentNode.parentElement.clientWidth;
  }

  function clearAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
  }

  function resetDrawSize() {
    drawSize = 10;
  }

  function increaseDrawSize() {
    if (drawSize + drawSizeIncrement > 30) {
      drawSize = 30;
      return;
    }
    drawSize += drawSizeIncrement;
  }

  function decreaseDrawSize() {
    if (drawSize - drawSizeIncrement < 1) {
      drawSize = 1;
      return;
    }
    drawSize -= drawSizeIncrement;
  }

  function undo() {
    var lastPoint = points.pop();
    redoStack.push(lastPoint);
    redrawAll();
  }

  function redo() {
    ctx.save();
    points.push(redoStack.pop());
    redrawAll();
  }

  function changeColor(index) {
    var button = buttons[index];
    color = window.getComputedStyle(button).backgroundColor;
  }

  function redrawAll() {
    if (points.length == 0) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < points.length-1; i++) {
      var pt = points[i];
      var pt2 = points[i+1];
      ctx.strokeStyle = points[i].color;
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
      ctx.lineTo(pt2.x, pt2.y);
      ctx.stroke();
    }
  }

  var interval;
  $("#undo").mousedown(function () {
    interval = setInterval(undo, 50);
  }).mouseup(function () {
    clearInterval(interval);
  });

  $("#redo").mousedown(function () {
    interval = setInterval(redo, 50);
  }).mouseup(function () {
    clearInterval(interval);
  });
});

