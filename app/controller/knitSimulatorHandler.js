var pos = 0;

function loadPattern() {
    var simulatorCanvas = document.getElementById('simulatorCanvas');
    var simulatorCtx = simulatorCanvas.getContext("2d");

    simulatorCtx.drawImage(pixelCanvas, 0, 0, simulatorCanvas.width, simulatorCanvas.height)

}

function updateHead (){


    pos++;
}
