var url;

function readURL(input) {

    console.log("got here");

    var img_loader = document.getElementById('img_loader');
    img_loader.style.display = "block";
    var imgDiv = document.getElementById('img_inner');

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        url = input.files[0];

        reader.onload = function (e) {

            var w = $('#img_inner').width();
            var h = $('#img_inner').height()-$('#loader-controller-group').height();
            console.log("height:"+ h);
            $('#img_loader').attr('src', e.target.result)
                .width(w)
                .height(h);
            var canvas = document.getElementById('previewCanvas');
            var context = canvas.getContext('2d');
            canvas.width = $('#preview').width();
            canvas.height = $('#preview').height();
            setTimeout(function(){context.drawImage(img_loader, 0, 0, canvas.width, canvas.height);crop();},100);
        };
        reader.readAsDataURL(input.files[0]);
    }

}

$("#file").change(function () {
    readURL(this);
});

function file_select_handler(to_upload) {
    var progressbar = $('#progressbar');
    var status = $('#status');
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('loadstart', function (e1) {
        status.text('uploading image');
        progressbar.progressbar({max: e1.total});
    });
    xhr.upload.addEventListener('progress', function (e1) {
        if (progressbar.progressbar('option', 'max') == 0)
            progressbar.progressbar('option', 'max', e1.total);
        progressbar.progressbar('value', e1.loaded);
    });
    xhr.onreadystatechange = function (e1) {
        if (this.readyState == 4) {
            if (this.status == 200)
                var text = 'upload complete: ' + this.responseText;
            else
                var text = 'upload failed: code ' + this.status;
            status.html(text + '<br/>Select an image');
            progressbar.progressbar('destroy');
        }
    };
    xhr.open('POST', '/post', true);
    xhr.send(to_upload);
};

$('#file').change(function (e) {
    file_select_handler(e.target.files[0]);
    e.target.value = '';
});


