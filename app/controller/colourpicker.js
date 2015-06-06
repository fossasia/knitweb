var canvas = document.getElementById('canvas');

var x='', y='';

// preview function mousemove
img.addEventListener('mousemove', function(e){

    if(e.offsetX) {
        x = e.offsetX;
        y = e.offsetY;
    }
    else if(e.layerX) {
        x = e.layerX;
        y = e.layerY;
    }

    useCanvas(canvas,img,function(){

        // get image data
        var p = canvas.getContext('2d')
            .getImageData(x, y, 1, 1).data;

        // show preview color
        console.log(p[0]+", "+p[1]);
    });
},false);


// canvas function
function useCanvas(el,image,callback){
    el.width = image.width;
    el.height = image.height;

    // draw image in canvas tag
    el.getContext('2d')
        .drawImage(image, 0, 0, image.width, image.height);
    return callback();
}
