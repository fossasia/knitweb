
var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");

function init() {
    var img = document.getElementById("img_loader");
    ctx.drawImage(img, 0, 0);
    recolor();
}

function recolor() {

    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;

    for (var i = 0; i < data.length; i += 4) {
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
        if (hue > 80 && hue < 170) {

            data[i + 0] = 0;
            data[i + 1] = 255;
            data[i + 2] = 111;
            data[i + 3] = 255;
        }
        else if( hue > 180 && hue < 280 ){

            data[i + 0] = 143;
            data[i + 1] = 0;
            data[i + 2] = 255;
            data[i + 3] = 255;
        }
        else if (hue > 40 && hue < 70){

            data[i + 0] = 255;
            data[i + 1] = 239;
            data[i + 2] = 0;
            data[i + 3] = 255;

        }
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
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return ({
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    });
}
