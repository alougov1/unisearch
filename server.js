var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require("body-parser");
var routes = require("./src/routes.js");
var connection = mysql.createConnection({
  host     : 'unisearch.cw7uxohppzrc.us-east-1.rds.amazonaws.com',
  port      :  '3306',
  user     : 'alougov1',
  password : 'iamroot123',
  database : 'unisearch'

});

var app = express();

// accept JSON or URL-encoded values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... ");
} else {
    console.log("Error connecting to database ... ");
}
});

routes(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

//end connection
connection.end(function(err) {
  if (err) {
    return console.log('Error:' + err.message);
  }
  console.log('Closed the database connection successfully.');
});
