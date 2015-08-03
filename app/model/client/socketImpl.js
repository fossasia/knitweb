function WebSocketTest() {
    if ("WebSocket" in window) {
        alert("WebSocket is supported by your Browser!");

        //create a connection for web socket
        var connection = new WebSocket("ws://localhost:8888/getProgess", ['json']);

        //event for opening connection with the web socket
        connection.onopen = function () {
            // Web Socket is connected, send data using send()
            connection.send("Message to send");
            console.log("Message sent");
        };

        //event for getting json response from the web socket
        connection.onmessage = function (evt) {
            var received_msg = evt.data;
            decode(received_msg);
            console.log(received_msg);
        };

        //event for getting error messages from web socket
        connection.onerror = function (err) {
            console.log(err);
        }

        connection.onclose = function () {
            // websocket is closed.
            console.log("connection closed")
        };
    }

    else {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }
}


function sendImageData() {
    var connection = new WebSocket("ws://localhost:8888/sendImgData", ['json']);

    // Sending canvas ImageData as ArrayBuffer
    var img = pixelCtx.getImageData(0, 0, 1000, 1000);
    var binary = new Uint8Array(img.data.length);
    for (var i = 0; i < img.data.length; i++) {
        binary[i] = img.data[i];
    }
    connection.send(binary.buffer);

    // Sending file as Blob
    var file = document.querySelector('input[type="file"]').files[0];
    connection.send(file);
}

function decode(msg) {
    var parsedObj = JSON.parse(msg);

    if (parsedObj.message[0].messageType == "progress") {
        var value = parsedObj.message[0].value;
        console.log("progress value: " + value);
    }

}