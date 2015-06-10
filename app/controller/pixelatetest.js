// Grab the Canvas and Drawing Context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Create an image element

var blocks = document.getElementById('blocks');

function pixelate() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

// Create an image element

    var blocks = document.getElementById('blocks');
    var img = document.getElementById("img_loader");

    //dynamically adjust canvas size to the size of the uploaded image
    canvas.height = img.height;
    canvas.width = img.width;

    /// if in play mode use that value, else use slider value
    var size = (blocks.value) * 0.01,

    /// cache scaled width and height
        w = canvas.width * size,
        h = canvas.height * size;

    console.log(size);
    /// draw original image to the scaled size
    ctx.drawImage(img, 0, 0, w, h);

    /// then draw that scaled image thumb back to fill canvas
    /// As smoothing is off the result will be pixelated
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
}

// event listeneners for slider
blocks.addEventListener('change', pixelate, false);
console.log("got heree");

/// poly-fill for requestAnmationFrame with fallback for older
/// browsers which do not support rAF.
window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();