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
    for (var i = 0; i <= numOfColumns; i++) {
        imageDataArr[i] = [];
        imageArr[i] = [];
        for (var j = 0; j <= numOfRows; j++) {
            imageDataArr[i][j] = false;
            imageArr[i][j] = false;
        }
    }
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
        var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
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

// converting rgb values to hsl values
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

    var pixelWidth = canvas.width / numOfColumns;
    var pixelHeight = canvas.height / numOfRows;
    var height = canvas.height;
    var width = canvas.width;
    var count = 0;
    console.log(pixelWidth+" "+pixelHeight);

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
    var pixelCount = 0;
    var pixelDistX = pixelCanvas.width / numOfColumns;
    var pixelDistY = pixelCanvas.height / numOfRows;

//clearing the canvas before draw
    pixelCtx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
//redrawing the image data in the canvas to get pixelated pattern
    for (var i = 0; i < pixelCanvas.width; i += pixelDistX) {
        for (var j = 0; j < pixelCanvas.height; j += pixelDistY) {
            pixelCtx.fillStyle = 'rgba(' +
                rdArr[pixelCount] + ',' + gArr[pixelCount] + ',' +
                bArr[pixelCount] + ',255' +
                ')';
            pixelCtx.lineWidth = 0.1;
            pixelCtx.strokeRect(i, j, pixelDistX, pixelDistY);
            pixelCtx.fillRect(i, j, pixelDistX, pixelDistY);
            pixelCount++;
        }
    }
}

function selectTool(s) {
    if (s) {
        isFreeHand = true;
    } else {
        isFreeHand = false;
    }
}