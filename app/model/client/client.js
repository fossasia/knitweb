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







