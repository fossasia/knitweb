var knit_job_id = "";
var knit_status = false, isStarted = false;

function refreshPorts() {
    getAvailablePorts();
}

function updateMachineType() {
    getMachinePlugins();
}

function configureKnit() {

    var colour_count = document.getElementById("previewTable").rows.length;
    document.getElementById('configure-btn').disabled = true;
    document.getElementById('start-btn').disabled = false;
    if(knit_job_id!=="")
        initKnitJob(knit_job_id);
    var canvas = document.getElementById('canvas2');
    var dataUrl = canvas.toDataURL('image/png');
    var fileUrl = 'embedded';
    setTimeout(function(){configKnitJob(knit_job_id,dataUrl,colour_count,fileUrl);},1000);
}

function createJob() {

    var list = document.getElementById('port_list');
    var current_port_id = list.options[list.selectedIndex].value;
    var plugin_id = "dummy";
    knit_job_id = createKnitJob(plugin_id,current_port_id);
}

function startKnit() {

    isStarted = true;
    document.getElementById('pause-btn').disabled = false;
    document.getElementById('stop-btn').disabled = false;
    document.getElementById('start-btn').disabled = true;
    if(knit_job_id!=="")
        knitJob(knit_job_id);
}
