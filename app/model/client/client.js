var deviceType;
var knit_job_id;


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


//method for creating knitting job at the backend
 function createKnitJob(plugin_id,port) {

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "//"+location.host + "/v1/create_job/",
        data: {
            "plugin_id": plugin_id,
            "port": port
        },
        success: function(data){
            console.log("Created knitting job:");
            console.log(data);
            knit_job_id = data["job_id"];
        }
    });
    return knit_job_id;
};


//function for initializing knitting job
function initKnitJob(job_id) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "//"+location.host + "/v1/init_job/" + job_id,
        data: {
            /* No data should be needed for job init. */
        },
        success: function(data){
            console.log("Inited knitting job:")
            console.log(data);
        }
    });
};


//function for configuring knitting by sending image data
function configKnitJob(job_id, image_data, colors, file_url){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "//"+location.host + "/v1/configure_job/" + job_id,
        data: { "knitpat_dict":
            JSON.stringify({
                "colors": colors,
                "file_url":file_url,
                "image_data": image_data
            })},
        success: function(data){
            console.log("Configured knitting job:")
            console.log(data);
        }
    });
}

function knitJob(job_id){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "//"+location.host + "/v1/knit_job/" + job_id,
        data: {
            /* No data should be needed */
        },
        success: function(data){
            console.log("Knitting knitting job:")
            console.log(data);
        }
    });
}

function alertFunc(bool) {
    if (bool)
        alert("port details retrieved");
}

function getMachineType() {
    var parsedObj;
    $.ajax({
        url: 'http://localhost:8000/v1/get_machine_type',
        type: 'GET',
        dataType: 'json',
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