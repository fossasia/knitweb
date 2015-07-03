var rect, startX, startY, endX, endY;
var startPixelX, startPixelY, endPixelX, endPixelY, pixelWidth, pixelHeight, prevPixelX, prevPixelY;
var temp, testX, testY;

//getting canvas position for select tool
layoutCanvas.onmousedown = function (e) {
    var mousemove = false;
    var count = 0;
    list = [];
    rect = pixelCanvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    layoutCtx.clearRect(0, 0, 1000, 1000);

    prevPixelX = Math.floor(startX / 10) * 10;
    prevPixelY = Math.floor(startY / 10) * 10;

    //handling mouse dragging event for drawing tool
    document.onmousemove = function (e) {
        mousemove = true;
        endX = e.clientX - rect.left;
        endY = e.clientY - rect.top;
        startPixelX = Math.floor(startX / 10) * 10;
        startPixelY = Math.floor(startY / 10) * 10;
        endPixelX = Math.floor(endX / 10) * 10;
        endPixelY = Math.floor(endY / 10) * 10;

        pixelWidth = startPixelX - endPixelX;
        pixelHeight = startPixelY - endPixelY;

        if (pixelHeight < 0)pixelHeight = -pixelHeight;
        if (pixelWidth < 0)pixelWidth = -pixelWidth;

        //using of free hand tool
        if (!isFreeHand) {
            layoutCtx.clearRect(0, 0, 1000, 1000);
            layoutCtx.strokeStyle = "rgba(255,0,0,255)";
            layoutCtx.lineWidth = 1;
            layoutCtx.strokeRect(startPixelX, startPixelY, pixelWidth, pixelHeight);
        }

        //start from here

        if (isFreeHand) {
            layoutCtx.beginPath();

            if (temp != (prevPixelX + "," + prevPixelY)) {
                temp = prevPixelX + "," + prevPixelY;
            }
            layoutCtx.moveTo(prevPixelX, prevPixelY);
            layoutCtx.lineTo(prevPixelX, prevPixelY);

            imageDataArr[prevPixelX / 10][prevPixelY / 10] = true;

            if (prevPixelX != endPixelX && prevPixelY != endPixelY) {

                if (temp != (endPixelX + "," + prevPixelY)) {
                    list[count++] = temp;
                    temp = endPixelX + "," + prevPixelY;

                }
                layoutCtx.lineTo(endPixelX, prevPixelY);
                imageDataArr[endPixelX / 10][prevPixelY / 10] = true;
            }
            ;

            if (temp != (endPixelX + "," + endPixelY)) {
                list[count++] = temp;
                temp = endPixelX + "," + endPixelY;
            }
            layoutCtx.lineTo(endPixelX, endPixelY);
            imageDataArr[endPixelX / 10][endPixelY / 10] = true;

            layoutCtx.strokeStyle = "rgba(255,0,0,255)";
            layoutCtx.stroke();

            prevPixelX = endPixelX;
            prevPixelY = endPixelY;
        }

    }

    document.onmouseup = function () {
        document.onmousemove = null
        startPixelX = Math.floor(startX / 10) * 10;
        startPixelY = Math.floor(startY / 10) * 10;
        endPixelX = Math.floor(endX / 10) * 10;
        endPixelY = Math.floor(endY / 10) * 10;

        pixelWidth = startPixelX - endPixelX;
        pixelHeight = startPixelY - endPixelY;

        if (pixelHeight < 0)pixelHeight = -pixelHeight;
        if (pixelWidth < 0)pixelWidth = -pixelWidth;

        if (mousemove && !isFreeHand) {
            layoutCtx.strokeStyle = "rgba(255,0,0,255)";
            layoutCtx.lineWidth = 1;
            testX = startPixelX;
            testY = startPixelY;
            layoutCtx.strokeRect(startPixelX, startPixelY, pixelWidth, pixelHeight);
        }
        //     pixelCtx.clearRect(startPixelX,startPixelY,pixelWidth,pixelHeight);
    }
}

function colourChange() {
    var style = document.getElementsByClassName('colpick_new_color')[0].style.backgroundColor;

    getColorBounds();

    if (isFreeHand) {
        pixelCtx.beginPath();
        for (var i = 0; i < list.length; i++) {
            var tempArr = [];
            tempArr = list[i].split(",");
            if (i == 0) {
                pixelCtx.moveTo(tempArr[0], tempArr[1]);
            }
            pixelCtx.lineTo(tempArr[0], tempArr[1]);
        }
        pixelCtx.closePath();
        pixelCtx.fillStyle = style;
        pixelCtx.fill();

        for (var i = 0; i < 1000; i += 10) {
            for (var j = 0; j < 1000; j += 10) {
                pixelCtx.strokeStyle = "0,0,0,255";
                pixelCtx.lineWidth = 0.01;
                pixelCtx.strokeRect(i, j, 10, 10);
            }
        }

    }

    else if (!isFreeHand) {
        for (var i = startPixelX; i < startPixelX + pixelWidth; i += 10) {
            for (var j = startPixelY; j < startPixelY + pixelHeight; j += 10) {
                pixelCtx.clearRect(i, j, 10, 10);
                pixelCtx.fillStyle = style;
                pixelCtx.lineWidth = 0.2;
                pixelCtx.strokeRect(i, j, 10, 10);
                pixelCtx.fillRect(i, j, 10, 10);
            }
        }
    }

    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
            if (imageArr[i][j]) {
                pixelCtx.clearRect(i * 10, j * 10, 10, 10);
                pixelCtx.fillStyle = style;
                pixelCtx.lineWidth = 0.2;
                pixelCtx.strokeRect(i * 10, j * 10, 10, 10);
                pixelCtx.fillRect(i * 10, j * 10, 10, 10);
            }
        }
    }


}

function getColorBounds(){

    var pixelWidth = pixelCanvas.width / 100;
    var pixelHeight = pixelCanvas.height / 100;

    var height = pixelCanvas.height;
    var width = pixelCanvas.width;

    var count = 0;
    var imgData = ctx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);
    var data = imgData.data;
    console.log("height: "+height+" width: "+width+" "+data.length/4);
    var check =0;

    //for (var i = 0; i < 100; i++) {
    //    for (var j = 0; j < 100; j++) {
    //        //console.log((i*100+j)*40);
    //        //        data[(i*100+j)*40];
    //        var pos = (i*100+j)*40;
    //        if(pos%4==0)check++;
    //        rdArr[count] = data[pos];
    //        gArr[count] = data[pos+1];
    //        bArr[count] = data[pos+2];
    //        count++;
    //    }
    //}
    //console.log("count:"+count+" check:"+check);
    //console.log(" red:"+rdArr[9999]+" green:"+gArr[9999]+" blue:"+bArr[9999]);
}

function undo() {
    var pixelCount = 0;
    var pixelDistX = 10;
    var pixelDistY = 10;

    //clearing the canvas before draw
    pixelCtx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
    console.log(rdArr.length+" "+pixelCanvas.width);

    //redrawing the image data in the canvas to get pixelated pattern
    for (var i = 0; i < pixelCanvas.width; i += pixelDistX) {
        for (var j = 0; j < pixelCanvas.height; j += pixelDistY) {
            pixelCtx.fillStyle = 'rgba(' +
                rdArr[pixelCount] + ',' + gArr[pixelCount] + ',' +
                bArr[pixelCount] + ',255' +
                ')';

            pixelCtx.lineWidth = 0.01;
            pixelCtx.strokeRect(i, j, pixelDistX, pixelDistY);
            pixelCtx.fillRect(i, j, pixelDistX, pixelDistY);
            pixelCount++;
        }
    }
}