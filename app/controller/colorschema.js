var arr = [];
var sArr = [];
var lArr = [];
var rArr = [];
var rdArr = [];
var gArr = [];
var bArr = [];

var rowCount;
var mouseX;
var mouseY;

window.addEventListener('load', function (ev) {
    rowCount = 0;
}, false);

var canvas = document.getElementById("canvas2");
var pixelCanvas = document.getElementById("canvas");
var pixelCtx = pixelCanvas.getContext("2d");
var ctx = canvas.getContext("2d");

pixelCanvas.height = canvas.height;
pixelCanvas.width = canvas.width;

$('#picker').colpick();

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

$('.color-box').colpick({
    colorScheme: 'dark',
    layout: 'rgbhex',
    color: 'ff8800',
    onSubmit: function (hsb, hex, rgb, el) {
        $(el).css('background', '#' + hex);
        $(el).colpickHide();
    }
})

//getting canvas position for select tool
canvas.onmousedown = function(e){
    var startX = e.layerX;
    var startY = e.layerY;
    var endX,endY;

    document.onmousemove = function(e){

        endX = e.layerX;
        endY = e.layerY;
    }

    document.onmouseup = function() {
        	    document.onmousemove = null
        console.log("end: "+endX/4+" "+endY/4);
        	  }

    console.log("start: "+startX/4+" "+startY/4);
}

function changeContent(el) {
    el.innerHTML = "";
}

function init() {
    var img = document.getElementById("img_loader");
    pixelate();

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
    for (var i = 0; i < height; i += pixelHeight) {
        for (var j = 0; j < width; j += pixelWidth) {
            pixelCtx.fillStyle ='rgba(' +
                rdArr[pixelCount] + ',' + gArr[pixelCount] + ',' +
                bArr[pixelCount]+',255' +
                ')';
            pixelCtx.fillRect(i,j,pixelHeight,pixelWidth);
            pixelCount++;
        }
    }


}