$( document ).ready(function() {
    var canvas = document.getElementById("zeichenflaeche");
    var ctx = canvas.getContext("2d");
    var isPainting = false;

    canvas.width = document.getElementById("zeichenflaeche").parentNode.parentElement.clientWidth;
    canvas.height = 500;

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
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "red";
        ctx.lineTo(getMousePosX(e), getMousePosY(e));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(getMousePosX(e), getMousePosY(e));
    }

    canvas.addEventListener('mousedown', startpainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', draw);
    document.getElementById("clear").onclick = function() {clearAll()};

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
    }
});

