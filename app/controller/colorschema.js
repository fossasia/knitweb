var arr = [];
var sArr = [];
var lArr = [];
var rArr = [];
var rdArr = [];
var gArr = [];
var bArr = [];

var rowCount;

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

function changeContent(el) {
    el.innerHTML = "";
}

function init() {
    var img = document.getElementById("img_loader");
    ctx.drawImage(img, 0, 0);
    getColourValues();

}


function getrgb(colour) {
    var rgba = colour.split('-');
    var r = rgba[1];
    var g = rgba[2];
    var b = rgba[3]

    return { r: r, g: g, b: b }
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

function hslToRgb(h, s, l) {
    var r, g, b, m, c, x

    if (!isFinite(h)) h = 0
    if (!isFinite(s)) s = 0
    if (!isFinite(l)) l = 0

    h /= 60
    if (h < 0) h = 6 - (-h % 6)
    h %= 6

    s = Math.max(0, Math.min(1, s / 100))
    l = Math.max(0, Math.min(1, l / 100))

    c = (1 - Math.abs((2 * l) - 1)) * s
    x = c * (1 - Math.abs((h % 2) - 1))

    if (h < 1) {
        r = c
        g = x
        b = 0
    } else if (h < 2) {
        r = x
        g = c
        b = 0
    } else if (h < 3) {
        r = 0
        g = c
        b = x
    } else if (h < 4) {
        r = 0
        g = x
        b = c
    } else if (h < 5) {
        r = x
        g = 0
        b = c
    } else {
        r = c
        g = 0
        b = x
    }

    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return { r: r, g: g, b: b }
}

function sort(values) {

    var length = values.length - 1;
    do {
        var swapped = false;
        for (var i = 0; i < length; ++i) {
            if (values[i] > values[i + 1]) {

                var temp = values[i];
                var temp1 = rArr[i];
                var temp2 = sArr[i];
                var temp3 = lArr[i];

                values[i] = values[i + 1];
                rArr[i] = rArr[i + 1];
                sArr[i] = sArr[i + 1];
                lArr[i] = lArr[i + 1];

                values[i + 1] = temp;
                rArr[i + 1] = temp1;
                sArr[i + 1] = temp2;
                lArr[i + 1] = temp3;

                swapped = true;
            }
        }
    }
    while (swapped == true)
}

function binarySearch(key, inputArray) {
    var low = 0,
        high = inputArray.length - 1,
        mid;

    while (low <= high) {
        mid = low + (high - low) / 2;
        if ((mid % 1) > 0) {
            mid = Math.ceil(mid);
        }

        if (key < inputArray[mid]) {
            high = mid - 1;
        }
        else if (key > inputArray[mid]) {
            low = mid + 1;
        }
        else {
            return mid;
        }
    }
    return mid;
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

    var pixelWidth  = canvas.width / 40;
    var pixelHeight = canvas.height / 40;

    console.log(canvas.height+" "+canvas.width);

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