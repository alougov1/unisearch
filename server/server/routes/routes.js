var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'unisearch.cw7uxohppzrc.us-east-1.rds.amazonaws.com',
  port      :  '3306',
  user     : 'alougov1',
  password : 'iamroot123',
  database : 'unisearch'

});

//var bodyParser = require('body-parser');

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
    const currentUser = req.query.un;
    var sqlQuery = mysql.format('SELECT * FROM studentAccount WHERE username=?', [currentUser]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
  });

  app.post("/studentUpdate", (req, res) => {
    const currUser = req.query.un;
    const act = req.query.act;
    const sat = req.query.sat;
    const gpa = req.query.gpa;
    const gender = req.query.gender;
    const age = req.query.age;
    const hometown = req.query.hometown;
    var sqlQuery = mysql.format('UPDATE studentAccount SET username=?, act=?, sat=?, gpa=?, gender=?, age=?, hometown=? WHERE username=?',
    [currUser, act, sat, gpa, gender, age, hometown, currUser]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.sendStatus(200);
      });
  });

  //create account
  app.post("/createAcct", (req, res) => {
    const username = req.query.un;
    const pass = req.query.pass;
    const email = req.query.email;
    const hometown = null;
    const gpa = null;
    const act = null;
    const sat = null;
    const gender = null;
    const age = null;

    var sqlQuery = mysql.format('INSERT INTO studentAccount (username, student_pass, gpa, act, sat, gender, age, hometown, email)' +
    'VALUES ?, ?, ?, ?, ?, ?, ?, ?, ?',
    [username, pass, gpa, act, sat, gender, age, hometown, email]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.sendStatus(200);
      });
  });

  app.post("/studentEmailUpdate", (req, res) => {
    const currUser = req.query.un;
    const email = req.query.email;
    var sqlQuery = mysql.format('UPDATE studentAccount SET username=?, email=? WHERE username=?',
    [currUser, email, currUser]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.sendStatus(200);
      });
  });

  app.get("/university", function (req, res) {
    //run this to get data about current user from DB
    let currentUni = req.query.un;
    if (currentUni.length < 1) {
      var sqlQuery1 = mysql.format('SELECT * FROM university');
      connection.query(sqlQuery1, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } else {
      var sqlQuery = mysql.format('SELECT * FROM university WHERE uni_name=?', [currentUni]);
      connection.query(sqlQuery, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.send(result);
        });
      }
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
