var comHandler = {
    knit_job_id: "",
    knit_status: false,
    isStarted: false,

    refreshPorts: function() {
        getAvailablePorts();
      },
    
      updateMachineType: function() {
        getMachinePlugins();
      },

      configureKnit: function() {
        var colour_count = document.getElementById("previewTable").rows.length;
        document.getElementById('configure-btn').disabled = true;
        document.getElementById('start-btn').disabled = false;
        if(this.knit_job_id!=="")
          initKnitJob(this.knit_job_id);
        var canvas = document.getElementById('canvas2');
        var dataUrl = canvas.toDataURL('image/png');
        var fileUrl = 'embedded';
        var that = this;
        setTimeout(function() {
          configKnitJob(that.knit_job_id, dataUrl, colour_count, fileUrl);
        }, 1000);
      },
    
      createJob: function() {
        var list = document.getElementById('port_list');
        var current_port_id = list.options[list.selectedIndex].value;
        var plugin_id = "dummy";
        this.knit_job_id = createKnitJob(plugin_id, current_port_id);
      },
    
      startKnit: function() {
        this.isStarted = true;
        document.getElementById('pause-btn').disabled = false;
        document.getElementById('stop-btn').disabled = false;
        document.getElementById('start-btn').disabled = true;
        if(this.knit_job_id!=="")
          knitJob(this.knit_job_id);
      }
    };
    
    module.exports = comHandler;
    
    // Keep functions available in the browser global scope for the existing HTML onclick handlers
    if (typeof window !== 'undefined') {
        window.refreshPorts = comHandler.refreshPorts;
        window.updateMachineType = comHandler.updateMachineType;
        window.configureKnit = comHandler.configureKnit.bind(comHandler);
        window.createJob = comHandler.createJob.bind(comHandler);
        window.startKnit = comHandler.startKnit.bind(comHandler);
    }
    