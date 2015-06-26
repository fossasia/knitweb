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

var cropRef;
var checkBox;
//function for cropping
function crop() {
    checkBox = document.getElementById('cropCheck');

    if(checkBox.checked){
    cropRef = $.Jcrop('#img_loader', {
        aspectRatio: 0,
        onChange: updateCoords,
        onSelect: updateCoords
    });
    }
    else if(!checkBox.checked && cropRef!=null){
        imageObj = document.getElementById('img_loader');
        canvas = document.getElementById('previewCanvas');
        context = canvas.getContext('2d');
        cropRef.destroy();
        context.drawImage(imageObj, 0, 0,canvas.width, canvas.height);
    }
}

var image;

function draw() {
    context.drawImage(imageObj, x, y, widthX, heightY, 0, 0, canvas.width, canvas.height);
    var dataUrl = canvas.toDataURL();
    image = document.getElementById('test');
    image.src = dataUrl;
    image.style.display = 'none';
}

function rotate(degrees) {
    canvas = document.getElementById('previewCanvas');
    context = canvas.getContext('2d');
    checkBox = document.getElementById('cropCheck');

    if(!checkBox.checked){
        var dataUrl = canvas.toDataURL();
        image = document.getElementById('test');
        image.src = dataUrl;
        image.style.display = 'none';
    }

    angleInDegrees += degrees;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(angleInDegrees * Math.PI / 180);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    context.restore();
}