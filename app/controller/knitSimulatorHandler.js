var pos;
var simulatorCanvas = document.getElementById('simulatorCanvas');
var pointerCanvas = document.getElementById('pointerCanvas');
var simulatorCtx = simulatorCanvas.getContext("2d");
var pointorCtx = pointerCanvas.getContext("2d");



function loadPattern() {

    var pixelCanvas = document.getElementById("canvas");
    pos = 0;
    bufferCtx.drawImage(pixelCanvas,0,0,
        bufferCanvas.width,bufferCanvas.height);
    loadSimulationPage();

    simulatorCanvas.width = simulatorCtx.canvas.clientWidth;
    simulatorCanvas.height= simulatorCtx.canvas.clientHeight;
    pointerCanvas.width = pointorCtx.canvas.clientWidth;
    pointerCanvas.height = pointorCtx.canvas.clientHeight;

    var pixelCanvas = document.getElementById("canvas");
    simulatorCtx.drawImage(pixelCanvas, 0, 0,
        simulatorCanvas.width, simulatorCanvas.height);
    pointorCtx.clearRect(0,0,pointerCanvas.width,pointerCanvas.height);
    document.getElementById('column-num').innerHTML = "<br/>";
    document.getElementById('row-num').innerHTML = "";

    var margin = parseInt(simulatorCanvas.height+20)+'px';
    document.getElementById('back-nav-btn').style.marginTop = margin;
    createJob();

    document.getElementById('back-nav-btn').style.marginTop = '5px';
    document.getElementById('colour-count').value = document.
        getElementById("previewTable").rows.length;

}

//knitting simulation of the knitting head position
function updateHead (){


    var simulateDistX = simulatorCanvas.width/parseInt(numOfColumns);
    var simulateDistY = simulatorCanvas.height/parseInt(numOfRows);

    console.log("row num:"+pos/numOfColumns+" column num:"+pos%numOfColumns);
    simulatorCtx.fillStyle = "rgba(0,0,0,0.2)";

    document.getElementById('column-num').value = pos % numOfColumns;
    document.getElementById('row-num').value = parseInt(pos/numOfColumns)+"";
    pointorCtx.strokeStyle = "rgba(255,0,0,255)";
    pointorCtx.lineWidth = 2;
    simulatorCtx.fillRect(pos % numOfColumns*simulateDistX,
        Math.floor(pos/numOfColumns)*simulateDistY,simulateDistX,simulateDistY);
    pointorCtx.clearRect(0,0,pointerCanvas.width,pointerCanvas.height);
    pointorCtx.strokeRect(pos%numOfColumns*simulateDistX,
        Math.floor(pos/numOfColumns)*simulateDistY,simulateDistX,simulateDistY);
    pos++;
}
