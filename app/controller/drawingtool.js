var rect, startX, startY, endX, endY;
var startPixelX, startPixelY, endPixelX, endPixelY, pixelWidth, pixelHeight, prevPixelX, prevPixelY;
var temp, testX, testY;
var imgAvgData = [];
var collection = [];
var isRegionized = false,colourPickerEnabled = false,isAllArea=false;
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

        if(isAllArea) {
            console.log(startPixelX+" and "+startPixelY);
        }
        console.log(numOfRows *Math.floor(startPixelY / cellWidth)+" "+Math.floor(startPixelX / cellHeight)+" "+(startPixelX / cellHeight));
        console.log(numOfRows *Math.floor(startPixelY / cellWidth) + Math.floor(startPixelX / cellHeight));
        var colourVal = imgAvgData[numOfRows * Math.floor(startPixelY / cellWidth) + Math.floor(startPixelX / cellHeight)];
        //console.log(100 * startPixelY / 10 + startPixelX / 10);

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
        for (var j = 0; j < numOfColumns; j++) {
            imgAvgData[numOfRows * i + j] = (rdArr[numOfColumns * j + i] + "," + gArr[numOfColumns * j + i] + "," + bArr[numOfColumns * j + i]);
        }
    }
}

var flag = false;
var tempColourArr = [];

function callFlood(check){

    //getColorBounds();
    var colourList = [];
    collection = [];
    var startGridPosX, startGridPosY, endGridPosX, endGridPosY;

    if(check){
        startGridPosX = Math.round(startPixelX / cellWidth);
        startGridPosY = Math.round(startPixelY / cellHeight);
        endGridPosX = Math.round((startPixelX + pixelWidth) / cellWidth);
        endGridPosY = Math.round((startPixelY + pixelHeight) / cellHeight);
    }else {
        startGridPosX = 0;
        startGridPosY = 0;
        endGridPosX = numOfColumns;
        endGridPosY = numOfRows;
    }
    var mark=[],dupImgDataArr;

    for (var i = 0; i < numOfRows; i++) {

        var elements = [];
        for (var j = 0; j < numOfColumns; j++) {
            elements[j]=false;
        }
        mark.push(elements);
    }

    dupImgDataArr = imgAvgData.slice();

    console.log(startGridPosY+" and "+endGridPosY+" and "+startGridPosX+" and "+endGridPosX);

    for (var i = startGridPosY; i < endGridPosY; i++) {
        for (var j = startGridPosX; j < endGridPosX; j++) {
            var tempVal = dupImgDataArr[numOfRows * i + j];
            tempColourArr = [];
            //tempColourArr.push(tempVal);
            flood(dupImgDataArr, mark, i, j,tempVal, -1,tempColourArr);
            if(flag) {
                //collection.push(tempArr);
                var result = tempVal+": ";
                var copyArr = [];
                copyArr[0] = tempVal;
                tempColourArr = tempColourArr.sort(function(a, b){return a-b});
                for (var k = 0; k < tempColourArr.length; k++) {
                    result+= tempColourArr[k]+" ";
                    copyArr[k+1] = tempColourArr[k];
                }
                console.log(result);
                console.log("*******");
                collection.push(copyArr);
            }
            flag = false;
        }
    }


    function flood(img, mark,row,col,src,tgt,tempArr){
        if (row < 0) return;
        if (col < 0) return;
        if (row >= numOfRows) return;
        if (col >= numOfColumns) return;

        // make sure this pixel hasn't been visited yet
        if (mark[row][col])return;

        // make sure this pixel is the right color to fill
        if (img[col+row*numOfRows]!==src){return};

        // fill pixel with target  and mark it as visited
        img[col+row*numOfRows]=tgt;

        if(row>=startGridPosY && row<endGridPosY && col>=startGridPosX && col<endGridPosX)
            tempColourArr.push(col+row*numOfRows);
        //console.log("row:"+row+" col:"+col);
        flag=true;
        mark[row][col] = true;

        flood(img, mark, row - 1, col, src, tgt);
        flood(img, mark, row + 1, col, src, tgt);
        flood(img, mark, row, col - 1, src, tgt);
        flood(img, mark, row, col + 1, src, tgt);

    }

}

// function for checking for colour boundaries
function checkBounds(check,region) {
    console.log("got here");
    if (check.checked) {

        layoutCanvas.style.cursor = "crosshair";
        isRegionized = true;
        isAllArea = !region;
        collection = [];

        getColorBounds();
        callFlood(region);
        showColourBounds();

    } else if (!check.checked) {
        isRegionized = false;
        layoutCtx.clearRect(0, 0, layoutCanvas.width, layoutCanvas.height);
    }
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

            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % numOfColumns) * pixelDistX,
                    Math.floor(parseInt(tempArr[j] / numOfRows) * pixelDistY));
                layoutCtx.lineTo((tempArr[j] % numOfColumns) * pixelDistX+ pixelDistY ,
                    Math.floor(parseInt(tempArr[j] / numOfRows) * pixelDistY));
                //console.log((tempArr[j] % numOfColumns) * cellWidth+","+Math.floor(tempArr[j] / numOfRows * cellHeight)+" to "+Math.floor((tempArr[j] % numOfColumns) * cellWidth) + cellWidth+","+Math.floor(tempArr[j] / numOfRows * cellHeight));
            }

            check = $.inArray(tempArr[j] + 1, tempArr);
            //console.log("i th pos: "+(tempArr[j] % numOfColumns)+ "j th pos: "+tempArr[j] / numOfRows * cellHeight);
            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % numOfColumns) * pixelDistX+ pixelDistX ,
                    Math.floor(parseInt(tempArr[j] / numOfRows) * pixelDistY));
                layoutCtx.lineTo((tempArr[j] % numOfColumns) * pixelDistX+ pixelDistX ,
                    Math.floor(parseInt(tempArr[j] / numOfRows) * pixelDistY+ pixelDistY));
                //console.log(Math.floor((tempArr[j] % numOfColumns) * cellWidth) + cellWidth+","+ Math.floor(tempArr[j] / numOfRows * cellHeight)+" to "+Math.floor((tempArr[j] % numOfColumns) * cellWidth) + cellWidth+","+ Math.floor(tempArr[j] / numOfRows * cellHeight) + cellHeight);
            }

            check = $.inArray(tempArr[j] + parseInt(numOfColumns), tempArr);
            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % numOfColumns) * pixelDistX+pixelDistX,
                    Math.floor(parseInt(tempArr[j] / numOfRows) * pixelDistY + pixelDistY));
                layoutCtx.lineTo((tempArr[j] % numOfColumns) * pixelDistX,
                    Math.floor(parseInt(tempArr[j] / numOfRows) * pixelDistY + pixelDistY));
                //console.log(Math.floor((tempArr[j] % numOfColumns) * cellWidth) + cellWidth+","+Math.floor(tempArr[j] / numOfRows * cellHeight) + cellHeight+" to "+Math.floor((tempArr[j] % numOfColumns) * cellWidth)+","+ Math.floor(tempArr[j] / numOfRows * cellHeight) + cellHeight);
            }

            check = $.inArray(tempArr[j] - 1, tempArr);
            if (check == -1) {
                layoutCtx.moveTo((tempArr[j] % numOfColumns) * pixelDistX,
                    Math.floor(parseInt(tempArr[j] / numOfRows) * pixelDistY));
                layoutCtx.lineTo((tempArr[j] % numOfColumns) * pixelDistX,
                    Math.floor(parseInt(tempArr[j] / numOfRows) * pixelDistY + pixelDistY));
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