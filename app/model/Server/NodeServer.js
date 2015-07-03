
// Load the http module to create an http server.
var http = require('http');

// Create a function to handle every HTTP request
function handler(req, res){

    var content = '';

    if(req.method == "GET"){
        content = '<html><body><h1>Server Component</h1></body></html>';

        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(form);
    } else if(req.method == 'POST'){
        req.on('data', function(chunk) {
            var formdata = chunk.toString();

            var a = eval(formdata.split("&")[0]);
            var b = eval(formdata.split("&")[1]);

            var result = calc(a,b);

            content = "<html><body><h1>Node Server</h1></body></html>";

            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(content);
        });

    } else {
        res.writeHead(200);
        res.end();
    };

};

function calc(a,b){
    return Number(a)+Number(b);;
}

http.createServer(handler).listen(8000, function(err){
    if(err){
        console.log('Error starting http server');
    } else {
        console.log("Server running at http://127.0.0.1:8000/ ");
    };
});