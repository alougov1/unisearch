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
    //run this to get data about current user from DB
    connection.query("SELECT * FROM studentAccount WHERE username='" + localStorage.getItem('currUser') + "'",
    function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
  });

//validates login information
  app.get("/validateUserLogin", function(req, res) {
    //get params from local storage passed in as URL
    const currentUser = req.query.un;
    const currPass = req.query.pass;

    var sqlQuery = mysql.format('SELECT * FROM studentAccount WHERE username=?', [currentUser]);
    //ADD SOMETHING TO MAKE SURE THIS DOESN"T BREAK IF UNDEFINED PARAMS
    connection.query(sqlQuery, function(err, result, fields) {
      //MODIFY THIS TO BE MORE SOPHISTICATED ERROR HANDLING LATER
      if (err) throw err;
      if (!result.length) {
        res.send("undefined");
      }
      else {
        if (result[0].username === currentUser && result[0].student_pass === currPass) {
          res.send(true);
        } else {
          res.send(false);
        }
      }
    });
  });
}

module.exports = appRouter;
