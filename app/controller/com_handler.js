var knit_job_id = "";

function refreshPorts() {
    getAvailablePorts();
}

function updateMachineType(){
    getMachineType();
}

function configureKnit(){

    var canvas = document.getElementById('canvas2');
    var dataUrl = canvas.toDataURL('image/png');
    var fileUrl = 'embedded';
    configKnitJob(knit_job_id,dataUrl,2,fileUrl);
}

function createJob(){
    var list = document.getElementById('port_list');
    var current_port_id = list.options[list.selectedIndex].value;
    var plugin_id = "dummy";
    createKnitJob(plugin_id,current_port_id);
}

function init(){
    initKnitJob()
}