var arr = [];
var sArr = [];
var lArr = [];
var rArr = [];
var rdArr = [];
var gArr = [];
var bArr = [];
var imageDataArr = [];
var imageArr = [];
var list;
var rowCount;
var isFreeHand = false;

window.onload = function () {
    //console.log("executed"+numOfColumns);
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
    newCell.appendChild(newCell);
}

function clear() {
    var canvas = document.getElementById('canvas2');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

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
    var pixelCount = 0;
    var pixelDistX = Math.floor(container.offsetWidth)/ numOfColumns;
    var pixelDistY = Math.floor(container.offsetHeight)/ numOfRows;
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

//redrawing the image data in the canvas to get pixelated pattern
    for (var i = 0; i < numOfColumns; i++) {
        for (var j = 0; j < numOfRows; j++) {
            pixelCtx.fillStyle = 'rgba(' +
                rdArr[pixelCount] + ',' + gArr[pixelCount] + ',' +
                bArr[pixelCount] + ',255' +
                ')';
            pixelCtx.lineWidth = 0.1;
            pixelCtx.strokeRect(i*pixelDistX, j*pixelDistY, pixelDistX, pixelDistY);
            pixelCtx.fillRect(i*pixelDistX, j*pixelDistY, pixelDistX, pixelDistY);
            pixelCount++;
        }
    }
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