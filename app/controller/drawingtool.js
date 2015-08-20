var rect, startX, startY, endX, endY;
var startPixelX, startPixelY, endPixelX, endPixelY, pixelWidth, pixelHeight, prevPixelX, prevPixelY;
var temp, testX, testY;
var imgAvgData = [];
var collection = [];
var isRegionized = false,colourPickerEnabled = false;
var cellWidth,cellHeight;

var gridCanvas = document.getElementById("gridCanvas");
var gridCtx = gridCanvas.getContext("2d");
var bufferCanvas = document.getElementById("canvas2");
var bufferCtx = bufferCanvas.getContext("2d");

//getting canvas position for select tool
layoutCanvas.onmousedown = function (e) {
    if(!isRegionized)
    layoutCtx.clearRect(0, 0, layoutCanvas.width, layoutCanvas.height);

    var mousemove = false;
    var count = 0;
    list = [];
    rect = pixelCanvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    //console.log(startX+" and "+startY);
    if (!isRegionized)
        //gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    cellWidth = pixelCanvas.width/numOfColumns;
    cellHeight = pixelCanvas.height/numOfRows;
    prevPixelX = Math.floor(startX / cellWidth) * cellWidth;
    prevPixelY = Math.floor(startY / cellHeight) * cellHeight;

    //console.log(prevPixelX+" and "+prevPixelY);

//handling mouse dragging event for drawing tool
    document.onmousemove = function (e) {
        mousemove = true;
        endX = e.clientX - rect.left;
        endY = e.clientY - rect.top;
        startPixelX = Math.floor(startX / cellWidth) * cellWidth;
        startPixelY = Math.floor(startY / cellHeight) * cellHeight;
        endPixelX = Math.floor(endX / cellWidth) * cellWidth;
        endPixelY = Math.floor(endY / cellHeight) * cellHeight;
        pixelWidth = startPixelX - endPixelX;
        pixelHeight = startPixelY - endPixelY;
        if (pixelHeight < 0)pixelHeight = -pixelHeight;
        if (pixelWidth < 0)pixelWidth = -pixelWidth;

//using of free hand tool
        if (!isFreeHand) {
            if (!isRegionized)
                layoutCtx.clearRect(0, 0, layoutCanvas.width, layoutCanvas.height);

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
            imageDataArr[Math.floor(prevPixelX / cellWidth)][Math.floor(prevPixelY / cellHeight)] = true;
            if (prevPixelX != endPixelX && prevPixelY != endPixelY) {
                if (temp != (endPixelX + "," + prevPixelY)) {
                    list[count++] = temp;
                    temp = endPixelX + "," + prevPixelY;
                }
                layoutCtx.lineTo(endPixelX, prevPixelY);
                imageDataArr[Math.floor(endPixelX / cellWidth)][Math.floor(prevPixelY / cellHeight)] = true;
            }
            if (temp != (endPixelX + "," + endPixelY)) {
                list[count++] = temp;
                temp = endPixelX + "," + endPixelY;
            }
            layoutCtx.lineTo(endPixelX, endPixelY);
            imageDataArr[Math.floor(endPixelX / cellWidth)][Math.floor(endPixelY / cellHeight)] = true;
            layoutCtx.strokeStyle = "rgba(255,0,0,255)";
            layoutCtx.stroke();
            prevPixelX = endPixelX;
            prevPixelY = endPixelY;
        }
    };

    document.onmouseup = function () {
        document.onmousemove = null;
        startPixelX = Math.floor(startX / cellWidth) * cellWidth;
        startPixelY = Math.floor(startY / cellHeight) * cellWidth;
        endPixelX = Math.floor(endX / cellWidth) * cellWidth;
        endPixelY = Math.floor(endY / cellHeight) * cellHeight;
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
        console.log(startPixelX / cellWidth + " " + startPixelY / cellHeight);
        var colourVal = imgAvgData[numOfRows * Math.floor(startPixelY / cellWidth) + Math.floor(startPixelX / cellHeight)];
        console.log(100 * startPixelY / 10 + startPixelX / 10);

        for (var i = 0; i< collection.length; i++) {
            var arr = collection[i];
            //console.log(i);
            if (arr[0] === colourVal) {
                var check = $.inArray(numOfRows * Math.floor(startPixelY / cellWidth) + Math.floor(startPixelX / cellHeight), arr);
                if (check !== -1) {
                    showColourRegions(arr);
                }
            }
        }
    } else if (!isRegionized){

    }
};


function colourChange() {
    colourPickerEnabled=!colourPickerEnabled;
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
        for (var i = 0; i < pixelCanvas.width; i += cellWidth) {
            for (var j = 0; j < pixelCanvas.height; j += cellHeight) {
                pixelCtx.strokeStyle = "0,0,0,255";
                //pixelCtx.lineWidth = 0.01;
                //pixelCtx.strokeRect(i, j, cellWidth, cellHeight);
            }
        }
    }
    else if (!isFreeHand) {

        pixelCtx.fillStyle = style;
        pixelCtx.clearRect(startPixelX, startPixelY,pixelWidth, pixelHeight);
        pixelCtx.fillRect(startPixelX, startPixelY, pixelWidth, pixelHeight);

    }
    for (var i = 0; i < numOfRows; i++) {
        for (var j = 0; j < numOfColumns; j++) {
            if (imageArr[i][j]) {
                pixelCtx.clearRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
                pixelCtx.fillStyle = style;
                //pixelCtx.lineWidth = 0.2;
                //pixelCtx.strokeRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
                pixelCtx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
        }
    }
}


var data;
function getColorBounds() {
    var imgData = pixelCtx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);
    data = imgData.data;

    for (var i = 0; i < numOfRows; i++) {
        //var result ="";
        for (var j = 0; j < numOfColumns; j++) {
            var pos = (Math.floor(cellHeight)*pixelCanvas.width * 4)* i + (Math.floor(cellHeight/2)*pixelCanvas.width * 4) + Math.floor(cellWidth/2) * 4 + Math.floor(cellWidth) * j * 4;
            //console.log("position:"+pos);
            imgAvgData[numOfRows * i + j] = (rdArr[numOfColumns * j + i] + "," + gArr[numOfColumns * j + i] + "," + bArr[numOfColumns * j + i]);
            //result+=imgAvgData[numOfRows * i + j]+" ";
        }
        //console.log(result);
    }
}

// function for checking for colour boundaries
function checkBounds(check) {
    if (check.checked) {
        layoutCanvas.style.cursor = "crosshair";
        isRegionized = true;
        getColorBounds();
        var colourList = [];
        collection = [];
        var startGridPosX = startPixelX / cellWidth;
        var startGridPosY = startPixelY / cellHeight;
        var endGridPosX = (startPixelX + pixelWidth) / cellWidth;
        var endGridPosY = (startPixelY + pixelHeight) / cellHeight;

//traverse grid through selected region
        for (var i = startGridPosY; i < endGridPosY; i++) {
            for (var j = startGridPosX; j < endGridPosX; j++) {

                var tempVal = imgAvgData[numOfRows * i + j];
                var check = $.inArray(tempVal, colourList);
                if (check !== -1) {
                    colourList.push(tempVal);
                }
                var innerCheck = -1;
                var kVal = -1, pos = -1;
                for (var k = 0; k < collection.length; k++) {
                    var tempArray = collection[k];
                    innerCheck = $.inArray(numOfRows * i + j, tempArray);
                    if (innerCheck > -1) {
                        kVal = k;
                        pos = innerCheck;
                        break;
                    }
                }
                if (innerCheck == -1) {
                    var newArr = [];
                    newArr[0] = tempVal;
                    newArr.push(numOfRows * i + j);
                    collection.push(newArr);
                    kVal = collection.length - 1;
                    pos = 0;
                }
//setting homogeneous neighbouring colour grid positions
                var arr = collection[kVal];
                if ((j - 1) >= startGridPosX && imgAvgData[numOfRows * i + j - 1] === tempVal) {
                    arr.push(numOfRows * i + j - 1);
                }
                if ((j + 1) < endGridPosX && imgAvgData[numOfRows * i + j + 1] === tempVal) {
                    arr.push(numOfRows * i + j + 1);
                }
                if ((j - 1) >= startGridPosX && (i - 1) >= startGridPosY && imgAvgData[numOfRows * (i - 1) + j - 1] === tempVal) {
                    arr.push(numOfRows * (i - 1) + j - 1);
                }
                if ((i - 1) >= startGridPosY && imgAvgData[numOfRows * (i - 1) + j] === tempVal) {
                    arr.push(numOfRows * (i - 1) + j);
                }
                if ((i - 1) >= startGridPosY && (j + 1) < endGridPosX && imgAvgData[numOfRows * (i - 1) + j + 1] === tempVal) {
                    arr.push(numOfRows * (i - 1) + j + 1);
                }
                if ((j - 1) >= startGridPosX && (i + 1) < endGridPosY && imgAvgData[numOfRows * (i + 1) + j - 1] === tempVal) {
                    arr.push(numOfRows * (i + 1) + j - 1);
                }
                if ((i + 1) < endGridPosY && imgAvgData[numOfRows * (i + 1) + j] === tempVal) {
                    arr.push(numOfRows * (i + 1) + j);
                }
                if ((i + 1) < endGridPosY && (j + 1) < endGridPosX && imgAvgData[numOfRows * (i + 1) + j + 1] === tempVal) {
                    arr.push(numOfRows * (i + 1) + j + 1);
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
    } else if (!check.checked) {
        isRegionized = false;
        //gridCtx.clearRect(0,0,gridCanvas.width,gridCanvas.height);
        layoutCtx.clearRect(0, 0, layoutCanvas.width, layoutCanvas.height);
    }
}

//function for removing overlapping regions returned by the process
function removeDupColours() {

    // console.log(collection.length);
    var colourArr = [];

    for (var i = 0; i < numOfColumns*numOfRows; i++) {
        colourArr[i] = "";
    }

    for (var i = 0; i < collection.length; i++) {
        var tempArray = collection[i];
        var dupArr = tempArray.slice(1, tempArray.length - 1);
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

            if (resultStr.indexOf(result) == -1) {
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

    }

    var instanceArr = [];
    for (var i = 0; i < collection.length; i++) {

        var tempArray = collection[i];
        if (tempArray[tempArray.length - 1] !== -1) {
            instanceArr.push(tempArray);
        }
    }
    //  collection = [];
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

        //console.log(Math.floor((tempArr[1] % numOfColumns) * cellWidth)+" and "+Math.floor(tempArr[1] / numOfRows * cellHeight));
        layoutCtx.beginPath();
        layoutCtx.moveTo(Math.floor((tempArr[1] % numOfColumns) * pixelDistX),Math.floor(tempArr[1] / numOfRows * pixelDistY));

        var result = tempArr[0]+": ";
        for (var j = 1; j < tempArr.length; j++) {

            result+=tempArr[j]+",";

            check = $.inArray(tempArr[j] - numOfColumns, tempArr);
            console.log("i th pos: "+(tempArr[j] % numOfColumns)+ "j th pos: "+parseInt(tempArr[j] / numOfRows));
            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % numOfColumns) * pixelDistX,
                    Math.floor(tempArr[j] / numOfRows * pixelDistY));
                layoutCtx.lineTo((tempArr[j] % numOfColumns) * pixelDistX+ pixelDistY ,
                    Math.floor(tempArr[j] / numOfRows * pixelDistY));
                //console.log((tempArr[j] % numOfColumns) * cellWidth+","+Math.floor(tempArr[j] / numOfRows * cellHeight)+" to "+Math.floor((tempArr[j] % numOfColumns) * cellWidth) + cellWidth+","+Math.floor(tempArr[j] / numOfRows * cellHeight));
            }

            check = $.inArray(tempArr[j] + 1, tempArr);
            //console.log("i th pos: "+(tempArr[j] % numOfColumns)+ "j th pos: "+tempArr[j] / numOfRows * cellHeight);
            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % numOfColumns) * pixelDistX+ pixelDistX ,
                    Math.floor(tempArr[j] / numOfRows * pixelDistY));
                layoutCtx.lineTo((tempArr[j] % numOfColumns) * pixelDistX+ pixelDistX ,
                    Math.floor(tempArr[j] / numOfRows * pixelDistY+ pixelDistY));
                //console.log(Math.floor((tempArr[j] % numOfColumns) * cellWidth) + cellWidth+","+ Math.floor(tempArr[j] / numOfRows * cellHeight)+" to "+Math.floor((tempArr[j] % numOfColumns) * cellWidth) + cellWidth+","+ Math.floor(tempArr[j] / numOfRows * cellHeight) + cellHeight);
            }

            check = $.inArray(tempArr[j] + parseInt(numOfColumns), tempArr);
            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % numOfColumns) * pixelDistX+pixelDistX,
                    Math.floor(tempArr[j] / numOfRows * pixelDistY + pixelDistY));
                layoutCtx.lineTo((tempArr[j] % numOfColumns) * pixelDistX,
                    Math.floor(tempArr[j] / numOfRows * pixelDistY + pixelDistY));
                //console.log(Math.floor((tempArr[j] % numOfColumns) * cellWidth) + cellWidth+","+Math.floor(tempArr[j] / numOfRows * cellHeight) + cellHeight+" to "+Math.floor((tempArr[j] % numOfColumns) * cellWidth)+","+ Math.floor(tempArr[j] / numOfRows * cellHeight) + cellHeight);
            }

            check = $.inArray(tempArr[j] - 1, tempArr);
            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % numOfColumns) * pixelDistX,
                    Math.floor(tempArr[j] / numOfRows * pixelDistY));
                layoutCtx.lineTo((tempArr[j] % numOfColumns) * pixelDistX,
                    Math.floor(tempArr[j] / numOfRows * pixelDistY + pixelDistY));
                //console.log(Math.floor((tempArr[j] % numOfColumns) * cellWidth)+","+Math.floor(tempArr[j] / numOfRows * cellHeight)+" to "+Math.floor((tempArr[j] % numOfColumns) * cellWidth)+","+Math.floor(tempArr[j] / numOfRows * cellHeight) + cellHeight);
            }
            layoutCtx.strokeStyle = "rgba(0,0,0,255)";
            layoutCtx.stroke();

            isRegionized = true;
        }
        //console.log(result);
    }
}

//function for visualizing of different colour regions
function showColourRegions(tempArr) {

    var count = 255;
    for (var i = 0; i < collection.length; i++) {

        for (var j = 1; j < tempArr.length; j++) {
            var posX = Math.floor(tempArr[j] / numOfColumns) * cellWidth;
            var posY = (tempArr[j] % numOfRows) * cellHeight;
            //console.log(tempArr[j]+" : "+posX+" and "+ posY);
            pixelCtx.clearRect(posY, posX, cellWidth, cellHeight);
            pixelCtx.fillStyle = document.getElementsByClassName('colpick_new_color')[0].style.backgroundColor;
            pixelCtx.lineWidth = 0.1;
            pixelCtx.fillRect(posY, posX, cellWidth, cellHeight);
        }
    }
}

function undo() {
    var pixelCount = 0;

//clearing the canvas before draw
    pixelCtx.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);

//redrawing the image data in the canvas to get pixelated pattern
    for (var i = 0; i < pixelCanvas.width; i += cellWidth) {
        for (var j = 0; j < pixelCanvas.height; j += cellHeight) {
            pixelCtx.fillStyle = 'rgba(' +
                rdArr[pixelCount] + ',' + gArr[pixelCount] + ',' +
                bArr[pixelCount] + ',255' +
                ')';
            pixelCtx.lineWidth = 0.01;
            pixelCtx.fillRect(i, j, cellWidth, cellHeight);
            pixelCount++;
        }
    }
}