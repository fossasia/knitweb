var pos;
var simulatorCanvas = document.getElementById('simulatorCanvas');
var pointerCanvas = document.getElementById('pointerCanvas');
var simulatorCtx = simulatorCanvas.getContext("2d");
var pointorCtx = pointerCanvas.getContext("2d");

simulatorCanvas.width = simulatorCtx.canvas.clientWidth;
simulatorCanvas.height= simulatorCtx.canvas.clientHeight;
pointerCanvas.width = pointorCtx.canvas.clientWidth;
pointerCanvas.height = pointorCtx.canvas.clientHeight;

function loadPattern() {
    pos = 0;
    simulatorCtx.drawImage(pixelCanvas, 0, 0, simulatorCanvas.width, simulatorCanvas.height);
    pointorCtx.clearRect(0,0,pointerCanvas.width,pointerCanvas.height);
    document.getElementById('column-num').innerHTML = "<br/>";
    document.getElementById('row-num').innerHTML = "";
}

function updateHead (){

    var simulateDistX = simulatorCanvas.width/parseInt(numOfColumns);
    var simulateDistY = simulatorCanvas.height/parseInt(numOfRows);

    console.log("row num:"+pos/numOfColumns+" column num:"+pos%numOfColumns);
    simulatorCtx.fillStyle = "rgba(0,0,0,0.2)";
    //simulatorCtx.globalAlpha = 0.2;
    document.getElementById('column-num').innerHTML = pos % numOfColumns+"<br/>";
    document.getElementById('row-num').innerHTML = parseInt(pos/numOfColumns)+"";
    pointorCtx.strokeStyle = "rgba(255,0,0,255)";
    pointorCtx.lineWidth = 2;
    simulatorCtx.fillRect(pos % numOfColumns*simulateDistX,Math.floor(pos/numOfColumns)*simulateDistY,simulateDistX,simulateDistY);
    pointorCtx.clearRect(0,0,pointerCanvas.width,pointerCanvas.height);
    pointorCtx.strokeRect(pos%numOfColumns*simulateDistX,Math.floor(pos/numOfColumns)*simulateDistY,simulateDistX,simulateDistY);
    pos++;
}
