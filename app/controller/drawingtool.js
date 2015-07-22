var rect, startX, startY, endX, endY;
var startPixelX, startPixelY, endPixelX, endPixelY, pixelWidth, pixelHeight, prevPixelX, prevPixelY;
var temp, testX, testY;
var imgAvgData = [];
var collection = [];
var isRegionized = false;

//getting canvas position for select tool
layoutCanvas.onmousedown = function (e) {
    var mousemove = false;
    var count = 0;
    list = [];
    rect = pixelCanvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    if (!isRegionized)
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
            if (!isRegionized)
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
    };

    document.onmouseup = function () {
        document.onmousemove = null;
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
// pixelCtx.clearRect(startPixelX,startPixelY,pixelWidth,pixelHeight);
    }
};

layoutCanvas.onclick = function () {
    if (isRegionized) {
        console.log(startPixelX / 10 + " " + startPixelY / 10);
        var colourVal = imgAvgData[100 * startPixelY / 10 + startPixelX / 10];
        console.log(100 * startPixelY / 10 + startPixelX / 10);

        for (var i = 0; collection.length; i++) {
            var arr = collection[i];
            if (arr[0] === colourVal) {
                var check = $.inArray(100 * startPixelY / 10 + startPixelX / 10, arr);
                if (check !== -1) {
                    showColourRegions(arr);
                }
            }
        }
    }
};


function colourChange() {
    var style = document.getElementsByClassName('colpick_new_color')[0].style.backgroundColor;
// getColorBounds();
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


var data;
function getColorBounds() {
    var height = pixelCanvas.height;
    var width = pixelCanvas.width;
    var count = 0;
    var imgData = pixelCtx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);
    data = imgData.data;
    //console.log("height: " + height + " width: " + width + " " + data.length);
    var check = 0;
    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
            var pos = 4000 * 10 * i + (4000 * 4) + 4 * 4 + 10 * j * 4;

            imgAvgData[100 * i + j] = (data[pos] + "," + data[pos + 1] + "," + data[pos + 2]);
        }
    }
}

// function for checking for colour boundaries
function checkBounds(check) {
    if (check.checked) {
    isRegionized = true;
    getColorBounds()
    var colourList = [];
    collection = [];
    var startGridPosX = startPixelX / 10;
    var startGridPosY = startPixelY / 10;
    var endGridPosX = (startPixelX + pixelWidth) / 10;
    var endGridPosY = (startPixelY + pixelHeight) / 10;
//traverse grid through selected region
    for (var i = startGridPosY; i < endGridPosY; i++) {
        for (var j = startGridPosX; j < endGridPosX; j++) {

            var tempVal = imgAvgData[100 * i + j];
            var check = $.inArray(tempVal, colourList);
            if (check !== -1) {
                colourList.push(tempVal);
            }
            var innerCheck = -1;
            var kVal = -1, pos = -1;
            for (var k = 0; k < collection.length; k++) {
                var tempArray = collection[k];
                innerCheck = $.inArray(100 * i + j, tempArray);
                if (innerCheck > -1) {
                    kVal = k;
                    pos = innerCheck;
                    break;
                }
            }
            if (innerCheck == -1) {
                var newArr = [];
                newArr[0] = tempVal;
                newArr.push(100 * i + j);
                collection.push(newArr);
                kVal = collection.length - 1;
                pos = 0;
            }
//setting homogeneous neighbouring colour grid positions
            var arr = collection[kVal];
            if ((j - 1) >= startGridPosX && imgAvgData[100 * i + j - 1] === tempVal) {
                arr.push(100 * i + j - 1);
            }
            if ((j + 1) < endGridPosX && imgAvgData[100 * i + j + 1] === tempVal) {
                arr.push(100 * i + j + 1);
            }
            if ((j - 1) >= startGridPosX && (i - 1) >= startGridPosY && imgAvgData[100 * (i - 1) + j - 1] === tempVal) {
                arr.push(100 * (i - 1) + j - 1);
            }
            if ((i - 1) >= startGridPosY && imgAvgData[100 * (i - 1) + j] === tempVal) {
                arr.push(100 * (i - 1) + j);
            }
            if ((i - 1) >= startGridPosY && (j + 1) < endGridPosX && imgAvgData[100 * (i - 1) + j + 1] === tempVal) {
                arr.push(100 * (i - 1) + j + 1);
            }
            if ((j - 1) >= startGridPosX && (i + 1) < endGridPosY && imgAvgData[100 * (i + 1) + j - 1] === tempVal) {
                arr.push(100 * (i + 1) + j - 1);
            }
            if ((i + 1) < endGridPosY && imgAvgData[100 * (i + 1) + j] === tempVal) {
                arr.push(100 * (i + 1) + j);
            }
            if ((i + 1) < endGridPosY && (j + 1) < endGridPosX && imgAvgData[100 * (i + 1) + j + 1] === tempVal) {
                arr.push(100 * (i + 1) + j + 1);
            }
        }
    }
    //sorting colour list values according to their respective positions
    for (var i = 0; i < collection.length; i++) {

        var tempArray = collection[i];
        var dupArr = tempArray.slice(1, tempArray.length);
        dupArr = dupArr.sort(function (a, b) {
            return a - b
        });

        var max = -1;
        var cpyArr = [];
        cpyArr[0] = tempArray[0];
        for (var j = 0; j < dupArr.length; j++) {
            if (max < dupArr[j]) {
                max = dupArr[j];
                cpyArr.push(max);
            }
        }
        //var resultString = "colour value1#:" + cpyArr[0] + " :";
        //for (var j = 1; j < cpyArr.length; j++) {
        //    resultString += "," + cpyArr[j];
        //}
        //console.log(resultString);

        collection[i] = [];
        collection[i] = cpyArr;

    }
    removeDupColours();
    showColourBounds();
} else if(!check.checked) {
        isRegionized = false;
    }


}

//function for removing overlapping regions returned by the process
function removeDupColours() {

    // console.log(collection.length);
    var colourArr = [];

    for (var i = 0; i < 10000; i++) {
        colourArr[i] = "";
    }

    for (var i = 0; i < collection.length; i++) {
        var tempArray = collection[i];
        var dupArr = tempArray.slice(1, tempArray.length-1);
        dupArr = dupArr.sort(function (a, b) {
            return a - b
        });
        //var result = "";
        for (var j = 0; j < dupArr.length; j++) {
            //result+=dupArr[j]+",";
            colourArr[dupArr[j]] += i + ",";
        }
        //console.log(result);
    }

    var pairs = [];
    var resultStr = "";
    for (var i = 0; i < colourArr.length; i++) {
        var tempArr = colourArr[i].split(',');
        var result = "";
        if (tempArr.length > 2) {
            for (var j = 0; j < tempArr.length - 1; j++) {
                result += tempArr[j] + ",";
            }
            //       console.log(result);

            if (!resultStr.contains(result)) {
                pairs.push(result);
            }
            resultStr += result;
        }
    }


    for (var i = 0; i < pairs.length; i++) {

        var pos = pairs[i].split(',');
        var parm1 = collection[pos[0]].slice(1, collection[pos[0]].length);
        var parm2 = collection[pos[1]].slice(1, collection[pos[1]].length);
        var mergedArr = merge(parm1, parm2);
        mergedArr[0] = collection[pos[0]][0];
        collection[pos[1]].push(-1);
        collection[pos[0]] = [];
        collection[pos[0]] = mergedArr;
        //console.log(mergedArr);

    }

    var instanceArr = [];
    for (var i = 0; i < collection.length; i++) {

        var tempArray = collection[i];
        if (tempArray[tempArray.length - 1] !== -1) {
            instanceArr.push(tempArray);
        }
    }
    collection = [];
    collection = instanceArr;
}

//merging of two overlapping regions(same coloured)
function merge(a, b) {
    var answer = [];
    var i = 0, j = 0, k = 1;

    while (i < a.length && j < b.length) {
        if (a[i] < b[j])
            answer[k++] = a[i++];

        else
            answer[k++] = b[j++];
    }
    while (i < a.length)
        answer[k++] = a[i++];

    while (j < b.length)
        answer[k++] = b[j++];

    return answer;
}

//function for visualizing of colour boundaries
function showColourBounds() {
    for (var i = 0; i < collection.length; i++) {

        var tempArr = collection[i];
        var check;

        layoutCtx.beginPath();
        layoutCtx.moveTo((tempArr[1] % 100) * 10, Math.floor(tempArr[1] / 100) * 10);
        for (var j = 1; j < tempArr.length; j++) {

            check = $.inArray(tempArr[j] - 100, tempArr);
            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % 100) * 10, Math.floor(tempArr[j] / 100) * 10);
                layoutCtx.lineTo((tempArr[j] % 100) * 10 + 10, Math.floor(tempArr[j] / 100) * 10);
            }

            check = $.inArray(tempArr[j] + 1, tempArr);
            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % 100) * 10 + 10, Math.floor(tempArr[j] / 100) * 10);
                layoutCtx.lineTo((tempArr[j] % 100) * 10 + 10, Math.floor(tempArr[j] / 100) * 10 + 10);
            }

            check = $.inArray(tempArr[j] + 100, tempArr);
            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % 100) * 10 + 10, Math.floor(tempArr[j] / 100) * 10 + 10);
                layoutCtx.lineTo((tempArr[j] % 100) * 10, Math.floor(tempArr[j] / 100) * 10 + 10);
            }

            check = $.inArray(tempArr[j] - 1, tempArr);
            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % 100) * 10, Math.floor(tempArr[j] / 100) * 10);
                layoutCtx.lineTo((tempArr[j] % 100) * 10, Math.floor(tempArr[j] / 100) * 10 + 10);

            }
            layoutCtx.strokeStyle = "black";
            layoutCtx.stroke();

            isRegionized = true;
        }
    }
}

//function for visualizing of different colour regions
function showColourRegions(tempArr) {

    var count = 255;
    for (var i = 0; i < collection.length; i++) {

        //var tempArr = collection[i];

        for (var j = 1; j < tempArr.length; j++) {
            var posX = Math.floor(tempArr[j] / 100) * 10;
            var posY = (tempArr[j] % 100) * 10;
            //console.log(tempArr[j]+" : "+posX+" and "+ posY);
            pixelCtx.clearRect(posY, posX, 10, 10);
            pixelCtx.fillStyle = 'rgba(' +
                count + ',0,0,255' +
                ')';
            pixelCtx.lineWidth = 0.1;
            pixelCtx.strokeRect(posY, posX, 10, 10);
            pixelCtx.fillRect(posY, posX, 10, 10);
        }
    }
}

function undo() {
    var pixelCount = 0;
    var pixelDistX = 10;
    var pixelDistY = 10;
//clearing the canvas before draw
    pixelCtx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
    //console.log(rdArr.length + " " + pixelCanvas.width);
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