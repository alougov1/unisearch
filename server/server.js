var express    = require("express");
var bodyParser = require("body-parser");
var routes = require("./server/routes/routes.js");

var app = express();

// accept JSON or URL-encoded values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


routes(app);

var server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
});
