var isAuthenticated = false;
var deviceType;

function authenticate() {

    $.ajax({
        url: 'http://127.0.0.1:8000/login',
        type: 'POST',
        data: 'user_name=test_user&password=test123',
        success: function () {
            isAuthenticated = true;
            alert('authentication successful');
        },
        error: function () {
            isAuthenticated = false;
            alert('authentication failed')
        }
    });
}

function sendImageData(imgData) {

    $.ajax({
        url: 'http://127.0.0.1:8000/send',
        type: 'POST',
        data: {imgData:imgData},
        success: function (status) {
            alert(status);
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function getDeviceType(){
    $.ajax({
        url: 'http://127.0.0.1:8000/device',
        type: 'GET',
        success: function (res) {
            deviceType = res;
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function getAvailablePorts(){
    var isSet = false;
    var parsedObj;

    $.ajax({
        url: 'http://localhost:8000/api',
        type: 'GET',
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: 'callback',
        crossDomain: true,
        success: function (json) {
            isSet = true;
            var obj = JSON.stringify(json);
            parsedObj = JSON.parse(obj);
            console.log(parsedObj);
            var portList = document.getElementById("port_list");
            var option = document.createElement("option");
            option.text = parsedObj.message;
            portList.add(option);
        },
        error: function (msg) {

            console.log(msg);
        }
    });


    //window.setTimeout(function(){alertFunc(isSet)}, 30);
}

function alertFunc(bool) {
    if(bool)
    alert("port details retrieved");
}







