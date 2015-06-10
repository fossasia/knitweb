
var arr = [];
var sArr = [];
var lArr = [];
var rArr = [];

var rowCount;

window.addEventListener('load', function(ev) {
    rowCount = 0;
},false);

var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");

$('#picker').colpick();

$('#addBtn').colpick({
    colorScheme:'dark',
    layout:'rgbhex',
    color:'ff8800',
    onSubmit:function(hsb,hex,rgb,el) {
        $(el).colpickHide();
        arr[rowCount] = hsb.h;
        rArr[rowCount] = rgb.r;
        sArr[rowCount] = rgb.g;
        lArr[rowCount] = rgb.b;
        addButtonClick(hex);
        var hsl =rgbToHsl(rgb.r,rgb.g,rgb.b);

    }
})

$('.color-box').colpick({
    colorScheme:'dark',
    layout:'rgbhex',
    color:'ff8800',
    onSubmit:function(hsb,hex,rgb,el) {
        $(el).css('background', '#'+hex);
        $(el).colpickHide();
    }
})

function changeContent(el){
    el.innerHTML="";
}

function init() {
    var img = document.getElementById("img_loader");
    ctx.drawImage(img, 0, 0);
    recolor();
}

function recolor() {

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;

    for (var i = 0; i < data.length; i += 8) {
        red = data[i + 0];
        green = data[i + 1];
        blue = data[i + 2];
        alpha = data[i + 3];

        // skip transparent/semiTransparent pixels
        if (alpha < 200) {
            continue;
        }

        var hsl = rgbToHsl(red, green, blue);
        var hue = hsl.h * 360;

        // tests for changing colours to available yarn colours
        var huePos = binarySearch(hue,arr);

        data[i + 0] = rArr[huePos];
        data[i + 1] = sArr[huePos];
        data[i + 2] = lArr[huePos];
        data[i + 3] = 255;

    }
    ctx.putImageData(imgData, 0, 0);
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

function sort(values){

    var length = values.length - 1;
    do {
        var swapped = false;
        for(var i = 0; i < length; ++i) {
            if (values[i] > values[i+1]) {

                var temp = values[i];
                var temp1 = rArr[i];
                var temp2 = sArr[i];
                var temp3 = lArr[i];

                values[i] = values[i+1];
                rArr[i] = rArr[i+1];
                sArr[i] = sArr[i+1];
                lArr[i] = lArr[i+1];

                values[i+1] = temp;
                rArr[i+1] = temp1;
                sArr[i+1] = temp2;
                lArr[i+1] = temp3;

                swapped = true;
            }
        }
    }
    while(swapped == true)
}

function binarySearch(key, inputArray) {
    var low  = 0,
        high = inputArray.length - 1,
        mid;

    while (low <= high) {
        mid = low + (high - low) / 2;
        if ((mid % 1) > 0) { mid = Math.ceil(mid); }

        if (key < inputArray[mid]) { high = mid - 1; }
        else if (key > inputArray[mid]) { low = mid + 1; }
        else { return mid; }
    }
    return mid;
}

function addButtonClick(hex){

    rowCount++;
    var tableRef = document.getElementById('previewTable');
    var newRow   = tableRef.insertRow(tableRef.rows.length);
    var newCell  = newRow.insertCell(0);

    newCell.setAttribute('class',"color-box");
    newCell.setAttribute('style',"border: solid 1px black;background-color:#"+hex);
    newCell.appendChild(newCell);

}

function clear(){
    var canvas =document.getElementById('canvas2');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
