var isRect = false,isTriangle = false,isCircle = false,isContLine=false,firstTime=false,isCrop=false,
    isContinued=false,downToggle=false;
var rect, startX, startY, endX, endY;
var pixelWidth, pixelHeight;

var canvas = document.getElementById("drawing-canvas");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("layout-canvas");
var ctx2 = canvas2.getContext("2d");


$(document).ready(function(){
    $("#rect-btn").click(function(){
        isRect = !isRect;
        isTriangle = false;
        isCircle = false;
        isContLine = false;
    });

    $("#circle-btn").click(function(){
        isCircle = !isCircle;
        isRect = false;
        isTriangle = false;
        isContLine = false;
    });

    $("#triangle-btn").click(function(){
        isTriangle = !isTriangle;
        isCircle = false;
        isRect = false;
        isContLine = false;
    });

    $("#clear-btn").click(function(){
        clear();
    });

    $("#continuous-line-btn").click(function(){
        isContLine = !isContLine;
        isCircle = false;
        isRect = false;
        isTriangle = false;
    });

    $('#load-btn').click(function(){
        loadImage();
    })

    $('#crop-btn').click(function () {
        crop();
    })

});

function draw(ctx) {
    if(isRect){
        drawRect(ctx);
    }

    if(isCircle){
        drawCircle(ctx);
    }

    if(isTriangle) {
        drawTriangle(ctx);
    }

    if(isContLine){
        drawContLine(ctx);
    }

    if(isCrop){
        isCircle = false;
        isRect = false;
        isTriangle = false;
        isContLine = false;
    }

}

function drawRect(ctx) {
    ctx.strokeStyle = "rgba(0,0,0,255)";
    ctx.lineWidth = 1;
    ctx.strokeRect(startX, startY, pixelWidth, pixelHeight);
}

function drawCircle(ctx) {
    var d = Math.sqrt(pixelWidth*pixelWidth+pixelHeight*pixelHeight);
    ctx.beginPath();
    ctx.arc(startX+d/2,startY+d/2,d,0,Math.PI*2,false);
    ctx.fillStyle = '#8ED6FF';
    ctx.fill();
    ctx.stroke();
}

function drawTriangle(ctx) {
    var triangle=new Path2D();
    triangle.moveTo(startX,startY);
    triangle.lineTo(endX,endY);
    ctx.stroke(triangle);
}

function drawContLine (ctx){
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
}

function clear(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx2.clearRect(0,0,canvas.width,canvas.height);

}

function loadImage(){
    var img = new Image();
    img.src = "../view/img/pattern-library.jpg";
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    isCrop = true;
}

function crop() {

    ctx2.clearRect(0,0,canvas.width, canvas.height);
    ctx2.drawImage(canvas,startX,startY,pixelWidth,pixelHeight,0,0,pixelWidth,pixelHeight);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(canvas2,0,0,canvas.width,canvas.height);
}

canvas.onmousedown = function (e) {

    var mousemove = false;
    rect = canvas.getBoundingClientRect();


    if(isContLine){
        if(!firstTime){
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
        }

        firstTime = true;
        if(!downToggle){
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
        }
        downToggle = true;
    } else{
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
    }

    console.log(startX+" and "+startY);

//handling mouse dragging event for drawing tool
    canvas.onmousemove = function (e) {
        ctx2.clearRect(0,0,canvas.width,canvas.height);
        mousemove = true;
        endX = e.clientX - rect.left;
        endY = e.clientY - rect.top;
        pixelWidth = startX - endX;
        pixelHeight = startY - endY;

        if(pixelWidth<0)pixelWidth=-pixelWidth;
        if(pixelHeight<0)pixelHeight=-pixelHeight;
        //if(firstTime)
            draw(ctx2);
    };

    canvas.onmouseup = function () {
        if(!isContLine)
        canvas.onmousemove = null;
        draw(ctx);
        if(isContLine){
            startX = endX;
            startY = endY;
        }

    };
};

