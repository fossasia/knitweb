var arr = [];
var sArr = [];
var lArr = [];
var rArr = [];
var rdArr = [];
var gArr = [];
var bArr = [];
var imageDataArr =[];
var imageArr = [];

var rowCount;
var mouseX;
var mouseY;

window.onload = function(){
    console.log("loaded");
    for(var i=0;i<=100;i++){
        imageDataArr[i]=[];
        imageArr[i] = []
        for(var j=0;j<=100;j++){
            imageDataArr[i][j]=false;
            imageArr[i][j] =false;
        }
    }
}

window.addEventListener('load', function (ev) {
    rowCount = 0;
}, false);

var canvas = document.getElementById("canvas2");
var pixelCanvas = document.getElementById("canvas");
var pixelCtx = pixelCanvas.getContext("2d");
var ctx = canvas.getContext("2d");

var layoutCanvas = document.getElementById("layoutCanvas");
var layoutCtx = layoutCanvas.getContext("2d");


$('#addBtn').colpick({
    colorScheme: 'dark',
    layout: 'rgbhex',
    color: 'ff8800',
    onSubmit: function (hsb, hex, rgb, el) {
        $(el).colpickHide();
        arr[rowCount] = hsb.h;
        rArr[rowCount] = rgb.r;
        sArr[rowCount] = rgb.g;
        lArr[rowCount] = rgb.b;
        addButtonClick(hex);
        var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    }
})

$('#picker1').colpick({
    flat:true,
    layout:'hex',
    submit:0
});


$('.color-box').colpick({
    colorScheme: 'dark',
    layout: 'rgbhex',
    color: 'ff8800',
    onSubmit: function (hsb, hex, rgb, el) {
        $(el).css('background', '#' + hex);
        $(el).colpickHide();
    }
})

var rect,startX,startY,endX,endY;
var startPixelX,startPixelY,endPixelX,endPixelY,pixelWidth,pixelHeight,prevPixelX,prevPixelY;

var pixelCountX = 0;
var pixelCountY = 0;
//getting canvas position for select tool
layoutCanvas.onmousedown = function(e){
    var mousemove = false;
    var count = 0;

     rect = pixelCanvas.getBoundingClientRect();
     startX = e.clientX - rect.left;
     startY = e.clientY - rect.top;
     layoutCtx.clearRect(0,0,1000,1000);

    prevPixelX = Math.floor(startX/10)*10;
    prevPixelY = Math.floor(startY/10)*10;

    document.onmousemove = function(e){
        mousemove = true;

        endX = e.clientX - rect.left;
        endY = e.clientY - rect.top;
        startPixelX = Math.floor(startX/10)*10;
        startPixelY = Math.floor(startY/10)*10;
        endPixelX = Math.floor(endX/10)*10;
        endPixelY = Math.floor(endY/10)*10;

        pixelWidth = startPixelX - endPixelX;
        pixelHeight = startPixelY - endPixelY;

        if(pixelHeight<0)pixelHeight= -pixelHeight;
        if(pixelWidth<0)pixelWidth = -pixelWidth;

//        layoutCtx.clearRect(0,0,1000,1000);
//        layoutCtx.strokeStyle = "rgba(255,0,0,255)";
//        layoutCtx.lineWidth = 1;
//        layoutCtx.strokeRect(startPixelX,startPixelY,pixelWidth,pixelHeight);

        layoutCtx.beginPath();
        layoutCtx.moveTo(prevPixelX,prevPixelY);
        layoutCtx.lineTo(prevPixelX,prevPixelY);
        imageDataArr[prevPixelX/10][prevPixelY/10] = true;

        if(prevPixelX == endPixelX){
           pixelCountX++;
        }
        if(prevPixelY == endPixelY){
            pixelCountY++;
        }

        if(prevPixelX!=endPixelX && prevPixelY!=endPixelY){
            layoutCtx.lineTo(endPixelX,prevPixelY);
            imageDataArr[endPixelX/10][prevPixelY/10]=true;
            if(prevPixelX!=endPixelX){
                pixelCountY = 0;
            }
            if(prevPixelY!=endPixelY){
                pixelCountX = 0;
            }
        }
        layoutCtx.lineTo(endPixelX,endPixelY);
        imageDataArr[endPixelX/10][endPixelY/10]=true;

        layoutCtx.strokeStyle = "rgba(255,0,0,255)";
        layoutCtx.stroke();
        prevPixelX = endPixelX;
        prevPixelY = endPixelY;

    }

    document.onmouseup = function() {
        	    document.onmousemove = null
        startPixelX = Math.floor(startX/10)*10;
        startPixelY = Math.floor(startY/10)*10;
        endPixelX = Math.floor(endX/10)*10;
        endPixelY = Math.floor(endY/10)*10;

        pixelWidth = startPixelX - endPixelX;
        pixelHeight = startPixelY - endPixelY;

        if(pixelHeight<0)pixelHeight= -pixelHeight;
        if(pixelWidth<0)pixelWidth = -pixelWidth;

        if(mousemove){
            layoutCtx.strokeStyle = "rgba(255,0,0,255)";
            layoutCtx.lineWidth = 1;
            layoutCtx.strokeRect(startPixelX,startPixelY,pixelWidth,pixelHeight);
        }
   //     pixelCtx.clearRect(startPixelX,startPixelY,pixelWidth,pixelHeight);

        	  }
}

function colourChange(){
    for(var i=0; i<100;i++){
        for(var j=0; j<100;j++){
            console.log(imageDataArr[i][j]+" and "+imageDataArr[i+1][j+1]);
            if(imageDataArr[i][j]&&imageDataArr[i+1][j+1]){
                imageArr[i][j] = true;
            }
        }
    }
var style = document.getElementsByClassName('colpick_new_color')[0].style.backgroundColor;
   // pixelCtx.fillRect(startPixelX,startPixelY,pixelWidth,pixelHeight);

  //*************************************************************************
//    for (var i = startPixelX; i < startPixelX+pixelWidth; i += 10) {
//        for (var j = startPixelY; j < startPixelY+pixelHeight; j += 10) {
//            pixelCtx.clearRect(i,j,10,10);
//            pixelCtx.fillStyle = style;
//            pixelCtx.lineWidth = 0.2;
//            pixelCtx.strokeRect(i,j,10,10);
//            pixelCtx.fillRect(i,j,10,10);
//        }
//    }
    //**********************************************************************


    for(var i=0; i<100;i++){
        for(var j=0;j<100;j++){
         //   console.log(imageArr[i][j]);
            if(imageArr[i][j]){
         //       console.log('got here');
                pixelCtx.clearRect(i*10,j*10,10,10);
                pixelCtx.fillStyle = style;
                pixelCtx.lineWidth = 0.2;
                pixelCtx.strokeRect(i*10,j*10,10,10);
                pixelCtx.fillRect(i*10,j*10,10,10);
            }
        }
    }
}

function pixelDel(){
    pixelCtx.clearRect(startPixelX, startPixelY, startPixelX+pixelWidth,1);
}

function changeContent(el) {
    el.innerHTML = "";
}

function init() {
    var img = document.getElementById("img_loader");
    pixelate();
    getColourValues();
}


function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return ({
        h: h,
        s: s,
        l: l
    });
}


function addButtonClick(hex) {

    rowCount++;
    var tableRef = document.getElementById('previewTable');
    var newRow = tableRef.insertRow(tableRef.rows.length);
    var newCell = newRow.insertCell(0);

    newCell.setAttribute('class', "color-box");
    newCell.setAttribute('style', "border: solid 1px black;background-color:#" + hex);
    newCell.appendChild(newCell);

}

function clear() {
    var canvas = document.getElementById('canvas2');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


//pixelating algo function
function getColourValues(){

    var pixelWidth  = canvas.width / 100;
    var pixelHeight = canvas.height / 100;

    var height = canvas.height;
    var width = canvas.width;

    var count = 0;
    for (var i = pixelHeight/2; i < height; i += pixelHeight) {
        for (var j = pixelWidth/2; j < width; j += pixelWidth) {

            var imgData = ctx.getImageData(i, j, 1, 1);
            var data = imgData.data;
            var minRGB=10000000;

            for (var k=0;k<rowCount;k++){
                var rDist = rArr[k]*rArr[k]-data[0]*data[0];
                var gDist = sArr[k]*sArr[k]-data[1]*data[1];
                var bDist = lArr[k]*lArr[k]-data[2]*data[2];
                if(rDist<0)rDist = -rDist;
                if(gDist<0)gDist = -gDist;
                if(bDist<0)bDist = -bDist;

                if((rDist+gDist+bDist)<minRGB){
                    minRGB = rDist+gDist+bDist;
                    rdArr[count] = rArr[k];
                    gArr[count] = sArr[k];
                    bArr[count] = lArr[k];
                }
            }
            count++;
        }
    }

    var pixelCount = 0;
    var pixelDistX = 10;
    var pixelDistY = 10;

    pixelCtx.clearRect(0,0,pixelCanvas.width,pixelCanvas.height);

    for (var i = 0; i < pixelCanvas.width; i += pixelDistX) {
        for (var j = 0; j < pixelCanvas.height; j += pixelDistY) {
            pixelCtx.fillStyle ='rgba(' +
                rdArr[pixelCount] + ',' + gArr[pixelCount] + ',' +
                bArr[pixelCount]+',255' +
                ')';
            pixelCtx.lineWidth = 0.2;
            pixelCtx.strokeRect(i,j,pixelDistX,pixelDistY);
            pixelCtx.fillRect(i,j,pixelDistX,pixelDistY);
            pixelCount++;
        }
    }
}