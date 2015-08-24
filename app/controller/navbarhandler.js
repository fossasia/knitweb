var dwnload_pattern_link = document.getElementById('dwnload_pattern_link');

function download() {
    var dt = pixelCanvas.toDataURL('image/jpeg');
    this.href = dt;
};
dwnload_pattern_link.addEventListener('click', download, false);
