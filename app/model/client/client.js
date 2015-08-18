var isAuthenticated = false;
var deviceType;
var knit_job_id;

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

    var parsedResponse;

    $.ajax({
        url: 'http://localhost:8000/v1/setImageData',
        type: 'POST',
        data: {imgData: imgData},
        dataType: 'jsonp',
        jsonpCallback: 'setImageData',
        crossDomain: true,
        success: function (json) {
            isSet = true;
            var res = JSON.stringify(json);
            parsedResponse = JSON.parse(res);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function getDeviceType() {
    $.ajax({
        url: 'http://127.0.0.1:8000/device',
        type: 'GET',
        success: function (res) {
            deviceType = res;
        },
        error: function (err) {
            alert(err);
        }
    });
}


// function for getting available ports for knit job communication
function getAvailablePorts() {
    var isSet = false;
    var parsedObj;

    $.ajax({
        url: 'http://localhost:5000/v1/get_ports',
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        success: function (json) {
            isSet = true;
            var obj = JSON.stringify(json);
            parsedObj = JSON.parse(obj);
            console.log(parsedObj);
            var portList = document.getElementById("port_list");
            var option = document.createElement("option");
            option.text = parsedObj.test;
            portList.add(option);
        },
        error: function (err) {
            console.log(err);
        }
    });

    //window.setTimeout(function(){alertFunc(isSet)}, 30);
}

function createKnitJob () {
    var form = document.createElement("form");

    var i = document.createElement("input"); //input element, text
    i.setAttribute('type',"text");
    i.setAttribute('name',"plugin_id");

    var s = document.createElement("input"); //input element, Submit button
    s.setAttribute('type',"text");
    s.setAttribute('value',"port");

    form.appendChild(i);
    form.appendChild(s);

    var formData = $(form).serializeArray();
    var url = "http://localhost:5000/v1/create_job/";
    $.post(url, formData).done(function (data) {

        var obj = JSON.stringify(data);
        var parsedObj = JSON.parse(obj);
        knit_job_id = parsedObj.job_id;
    });
}



function getMachineType() {
    var parsedObj;
    $.ajax({
        url: 'http://localhost:8000/v1/get_machine_type',
        type: 'GET',
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: 'machineType',
        crossDomain: true,
        success: function (json) {
            isSet = true;
            var obj = JSON.stringify(json);
            parsedObj = JSON.parse(obj);
            var portList = document.getElementById("machine_list");
            var option = document.createElement("option");
            option.text = parsedObj.message;
            portList.add(option);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function initializeKnit() {
    var url = 'http://localhost:5000/v1/init_job'+knit_job_id;

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        success: function (json) {
            var obj = JSON.stringify(json);
            var parsedObj = JSON.parse(obj);
            console.log(parsedObj);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function alertFunc(bool) {
    if (bool)
        alert("port details retrieved");
}







