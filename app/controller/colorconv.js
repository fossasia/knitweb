function colourconv(start,end,size) {
    var sourceimage = document.querySelector('img');
    var canvas = document.querySelector('canvas');
    var colourlist = document.querySelector('ol');
    var context = canvas.getContext('2d');
    var width = sourceimage.width;
    var height = sourceimage.height;
    canvas.height = height;
    canvas.width = width;
    context.drawImage(sourceimage, 0, 0);
    var colours = {};
    var sortedcolours = [];
    console.log(width);
    console.log(height);

    var data = context.getImageData(start, end, width/size, height/size).data;
    canvas.style.display = 'none';
    var all = data.length;
    for (var i = 0; i < all; i += 4) {
        var key = data[i] + '-' + data[i + 1] + '-' +
            data[i + 2] + '-' + data[i + 3];
        if (colours[key]) {
            colours[key]++;
        } else {
            colours[key] = 1;
        }
    }

    sortedcolours = Object.keys(colours).sort(
        function (a, b) {
            return -(colours[a] - colours[b]);
        }
    );
    var out = '';
    console.log(sortedcolours.pop());

    sortedcolours.forEach(function (key) {
        var rgba = key.split('-');
        var r = rgba[1];
        var g = rgba[2];
	var b = rgba[3];
       
    });
}
