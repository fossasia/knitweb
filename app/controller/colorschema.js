var arr = [], sArr = [], lArr = [], rArr = [], rdArr = [], gArr = [], bArr = [], imageDataArr = [], imageArr = [];
var list,rowCount,isFreeHand = false;

window.onload = function () {

    numOfColumns = document.getElementById("widthInput").value;
    numOfRows = document.getElementById("heightInput").value;
    for (var i = 0; i <= numOfColumns; i++) {
        imageDataArr[i] = [];
        imageArr[i] = [];
        for (var j = 0; j <= numOfRows; j++) {
            imageDataArr[i][j] = false;
            imageArr[i][j] = false;
        }
    }

    layoutCanvas.style.cursor = "se-resize";
};

window.addEventListener('load', function (ev) {
    rowCount = 0;
}, false);

var canvas = document.getElementById("canvas2");
var pixelCanvas = document.getElementById("canvas");
var pixelCtx = pixelCanvas.getContext("2d");
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
    }
});

$('#picker1').colpick({
    flat: true,
    layout: 'hex',
    submit: 0
});

$('.color-box').colpick({
    colorScheme: 'dark',
    layout: 'rgbhex',
    color: 'ff8800',
    onSubmit: function (hsb, hex, rgb, el) {
        $(el).css('background', '#' + hex);
        $(el).colpickHide();
    }
});

//deleting a single pixel selected
function pixelDel() {
    pixelCtx.clearRect(startPixelX, startPixelY, startPixelX + pixelWidth, 1);
}

// method initiation for generate pattern
function init() {
    pixelate();
    getColourValues();
}

//add colour to the pattern selected from colour pallette
function addButtonClick(hex) {
    rowCount++;
    var tableRef = document.getElementById('previewTable');
    var newRow = tableRef.insertRow(tableRef.rows.length);
    var newCell = newRow.insertCell(0);
    newCell.setAttribute('class', "color-box");
    newCell.setAttribute('style', "border: solid 1px black;background-color:#" + hex);

}

function clear() {
    var canvas = document.getElementById('canvas2');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var pixelDistX, pixelDistY;

//pixelating algo function
function getColourValues() {

    var canvas = document.getElementById('canvas2');
    var ctx = canvas.getContext("2d");
    var pixelWidth = canvas.width / numOfColumns;
    var pixelHeight = canvas.height / numOfRows;
    var height = canvas.height;
    var width = canvas.width;
    var count = 0;

    console.log(height+" :: "+width);

//colour mapping logic for roundup the image colour values with available yarn colours.
    for (var i = pixelHeight / 2; i < height; i += pixelHeight) {
        for (var j = pixelWidth / 2; j < width; j += pixelWidth) {
            var imgData = ctx.getImageData(i, j, 1, 1);
            var data = imgData.data;
            var minRGB = 10000000;
            for (var k = 0; k < rowCount; k++) {
                var rDist = rArr[k] * rArr[k] - data[0] * data[0];
                var gDist = sArr[k] * sArr[k] - data[1] * data[1];
                var bDist = lArr[k] * lArr[k] - data[2] * data[2];
                if (rDist < 0)rDist = -rDist;
                if (gDist < 0)gDist = -gDist;
                if (bDist < 0)bDist = -bDist;
                if ((rDist + gDist + bDist) < minRGB) {
                    minRGB = rDist + gDist + bDist;
                    rdArr[count] = rArr[k];
                    gArr[count] = sArr[k];
                    bArr[count] = lArr[k];
                }
            }
            count++;
        }
    }

    var container = document.getElementById('container');
    pixelDistX = Math.floor(container.offsetWidth)/ numOfColumns;
    pixelDistY = Math.floor(container.offsetHeight)/ numOfRows;
    var containerWidth = Math.floor(container.offsetWidth);
    var containerHeight = Math.floor(container.offsetWidth);
    pixelCanvas.width = containerWidth;
    pixelCanvas.height = containerHeight;
    layoutCanvas.width = containerWidth;
    layoutCanvas.height = containerHeight;
    gridCanvas.width = containerWidth;
    gridCanvas.height = containerHeight;

    console.log(pixelDistX+" ::: "+pixelDistY);

//clearing the canvas before draw
    pixelCtx.clearRect(0, 0, containerWidth, containerHeight);
    preLoadPattern();

//redrawing the image data in the canvas to get pixelated pattern
    for (var i = 0; i < containerWidth; i+=pixelDistX) {
        for (var j = 0; j < containerHeight; j+=pixelDistY) {
            //pixelCtx.fillStyle = 'rgba(' +
            //    rdArr[pixelCount] + ',' + gArr[pixelCount] + ',' +
            //    bArr[pixelCount] + ',255' +
            //    ')';
            gridCtx.lineWidth = 0.2;
            gridCtx.strokeRect(i, j, pixelDistX, pixelDistY);
            //pixelCtx.fillRect(i, j, pixelDistX, pixelDistY);
            //console.log(i+" and "+j);
            //pixelCount++;
        }
    }
}

function preLoadPattern() {
    var canvas = document.getElementById('canvas2');
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0,0,canvas.width,canvas.height);

    var count = 0;
    var pixelDistX = canvas.width / numOfColumns;
    var pixelDistY = canvas.height / numOfRows;

//redrawing the image data in the canvas to get pixelated pattern
    for (var i = 0; i < canvas.width; i += pixelDistX) {
        for (var j = 0; j < canvas.height; j += pixelDistY) {
            ctx.fillStyle = 'rgba(' +
                rdArr[count] + ',' + gArr[count] + ',' +
                bArr[count] + ',255' +
                ')';
            //        pixelCtx.strokeRect(i, j, pixelDistX, pixelDistY);
            ctx.fillRect(i, j, pixelDistX, pixelDistY);
            count++;
        }
    }
    pixelCtx.drawImage(canvas,0,0,pixelCanvas.width,pixelCanvas.height);
}

function selectTool(s) {
    if (s) {
        isFreeHand = true;
        layoutCanvas.style.cursor = "pointer";
    } else {
        isFreeHand = false;
        layoutCanvas.style.cursor = "se-resize";
    }
}