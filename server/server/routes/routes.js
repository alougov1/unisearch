var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'unisearch.cw7uxohppzrc.us-east-1.rds.amazonaws.com',
  port      :  '3306',
  user     : 'alougov1',
  password : 'iamroot123',
  database : 'unisearch'

});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... ");
} else {
    console.log("Error connecting to database ... ");
}
});

var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });

  app.get("/student", function (req, res) {

    //run this to
    connection.query("SELECT * FROM studentAccount WHERE username='eanmcd'", function (err, result, fields) {
        if (err) throw err;
        console.log('asdfasdfasdfasdf');
        console.log(result);
        res.send(result);
      });
  });
}

module.exports = appRouter;
