function WebSocketTest()
{
    if ("WebSocket" in window)
    {
        alert("WebSocket is supported by your Browser!");

        var ws = new WebSocket("ws://localhost:8888/getProgess",['json']);

        ws.onopen = function()
        {
            // Web Socket is connected, send data using send()
            ws.send("Message to send");
            console.log("Message sent");
        };

        ws.onmessage = function (evt)
        {
            var received_msg = evt.data;
            console.log(received_msg);
        };

        ws.onerror = function(err){
            console.log(err);
        }

        ws.onclose = function()
        {
            // websocket is closed.
            console.log("connection closed")
        };
    }

    else
    {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }
}
