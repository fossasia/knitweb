function WebSocketTest()
{
    if ("WebSocket" in window) {
        alert("WebSocket is supported by your Browser!");

        var connection = new WebSocket("ws://localhost:8888/getProgess",['json']);

        connection.onopen = function() {
            // Web Socket is connected, send data using send()
            ws.send("Message to send");
            console.log("Message sent");
        };

        connection.onmessage = function (evt) {
            var received_msg = evt.data;
            console.log(received_msg);
        };

        connection.onerror = function(err){
            console.log(err);
        }

        connection.onclose = function() {
            // websocket is closed.
            console.log("connection closed")
        };
    }

    else {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }

    // Sending String
    connection.send('your message');

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
