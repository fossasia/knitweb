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




