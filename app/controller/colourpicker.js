
window.addEventListener('load', function(ev) {
    var sourceImage = document.querySelector('img');
    var canvas = document.querySelector('canvas');
    var swab = document.querySelector('div');
    var context = canvas.getContext('2d');
    canvas.height = sourceImage.height;
    canvas.width = sourceImage.width;
    context.drawImage(sourceImage, 0, 0);
    sourceImage.style.display = 'none';

    function pixcol(ev) {
        var x = ev.layerX;
        var y = ev.layerY;
        var pixelData = context.getImageData(x, y, 1, 1);
        var col = pixelData.data;
        swab.style.background = 'rgba(' +
            col[0] + ',' + col[1] + ',' +
            col[2] + ',' + col[3] + ')';
    }
    canvas.addEventListener('mousemove', pixcol, false);
},false);