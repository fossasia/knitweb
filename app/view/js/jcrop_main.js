var canvas;
var context;
var imageObj;
var x, y, widthX, heightY;
var angleInDegrees = 0;

function updateCoords(c) {
    imageObj = document.getElementById('img_loader');

    x = c.x / 350 * imageObj.width;
    y = c.y / 350 * imageObj.height;
    widthX = c.w / 350 * imageObj.width;
    heightY = c.h / 350 * imageObj.height;

    canvas = document.getElementById('previewCanvas');
    context = canvas.getContext('2d');
};

//function for cropping
function crop() {
    var crop = $.Jcrop('#img_loader', {
        aspectRatio: 0,
        onChange: updateCoords,
        onSelect: updateCoords
    });
//    crop.destroy();
}


function draw() {
    context.drawImage(imageObj, x, y, widthX, heightY, 0, 0, canvas.width, canvas.height);
}

function rotate(degrees) {
    angleInDegrees += degrees;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(angleInDegrees * Math.PI / 180);
    context.drawImage(imageObj, -imageObj.width / 2, -imageObj.height / 2);
    context.restore();
}