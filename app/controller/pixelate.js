
var blocks = document.getElementById('blocks');
var img = document.getElementById("canvas2");


//image pixelating function
function pixelate() {

    //getting access to canvas
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var blocks = document.getElementById('blocks');
    var img = document.getElementById("canvas2");

    //adjust canvas size
    canvas.height = img.height;
    canvas.width = img.width;

    var size = (blocks.value) * 0.01,

        w = canvas.width * size,
        h = canvas.height * size;

    console.log(size);
    ctx.drawImage(img, 0, 0, w, h);

    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

}

blocks.addEventListener('change', pixelate, false);

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();