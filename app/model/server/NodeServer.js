
// server.js

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setting port
var port = process.env.PORT || 8080;

// get an instance of the express Router
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    var formdata = req.toString();
    res.json({ message: "data transferred successfully" });
});

app.use('/api', router);

//starting server
app.listen(port);
console.log('Api method exposed at port:' + port);