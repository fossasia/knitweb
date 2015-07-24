
//var blocks = document.getElementById('blocks');
var img = document.getElementById("canvas2");


//image pixelating function
function pixelate() {

    //getting access to canvas
    var canvas = document.getElementById('canvas2');
    var ctx = canvas.getContext('2d');

    var img = document.getElementById("previewCanvas");

    //adjust canvas size
    canvas.height = img.height;
    canvas.width = img.width;

    w=100;
    h=100;
    ctx.drawImage(img, 0, 0, w, h);

    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();