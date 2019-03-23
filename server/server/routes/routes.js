var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'unisearch.cw7uxohppzrc.us-east-1.rds.amazonaws.com',
  port      :  '3306',
  //this is dummy data to create a general user to read from DB
  user     : 'asdf',
  password : 'asdf',
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
    res.status(200).send("This request works! Congrats!");
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

  app.get("/personOfInterest", function (req, res) {
    //run this to get data about current user from DB
    const currentPerson = req.query.un;
    var sqlQuery = mysql.format('SELECT * FROM personOfInterest WHERE p_name=?', [currentPerson]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
  });

  //get people of interest for selected school
  app.get("/personOfInterestSelect", function (req, res) {
    const uni = decodeURIComponent(req.query.uni);
    var sqlQuery = mysql.format('SELECT * FROM personOfInterest WHERE university=?', [uni]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
  });

  app.get("/school", function (req, res) {
    //run this to get data about a university's schools
    const uni = req.query.uni;
    var sqlQuery = mysql.format('SELECT * FROM school WHERE uni_name=?', [uni]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
  });

  app.get("/uniList", function (req, res) {
    //run this to get data about current universitylist
    const currentUser = req.query.un;
    var sqlQuery = mysql.format('SELECT * FROM studentUniList WHERE username=?', [currentUser]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
  });

  app.get("/schoolInfo", function (req, res) {
    //run this to get data about current school
    const uni = req.query.uni;
    const school = req.query.sch;
    var sqlQuery = mysql.format('SELECT * FROM school WHERE uni_name=? AND school_name=?', [uni, school]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
  });

  app.post("/uniListAdd", (req, res) => {
    const currUser = req.query.un;
    const uni = req.query.uni;
    var sqlQuery = mysql.format('CALL insert_uniList(?, ?)', [currUser, uni]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.sendStatus(200);
      });
  });

  app.post("/uniListDelete", function (req, res) {
    //run this to get data about current user from DB
    const currentUser = req.query.un;
    const uni = req.query.uni;
    var sqlQuery = mysql.format('CALL delete_uniList(?, ?)', [currentUser, uni]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.sendStatus(200);
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
    var sqlQuery = mysql.format('CALL update_studentAcc(?, ?, ?, ?, ?, ?, ?)',
    [currUser, gpa, act, sat, gender, age, hometown]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.sendStatus(200);
      });
  });

  app.get("/studentDelete", (req, res) => {
    const currUser = req.query.un;
    var sqlQuery = mysql.format('CALL delete_studentAcc(?)', [currUser]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.sendStatus(200);
      });
  });

  //create account
  app.post("/createAcct", (req, res) => {
    const username = req.query.un;
    const pass = req.query.pass;
    const email = decodeURIComponent(req.query.email);
    const hometown = req.query.hometown;
    const gpa = req.query.gpa;
    const act = req.query.act;
    const sat = req.query.sat;
    const gender = req.query.gender;
    const age = req.query.age;
    var sqlQuery = mysql.format('CALL create_studentAcc(?, ?, ?, ?, ?, ?, ?, ?, ?) ',
    [username, pass, gpa, act, sat, gender, age, hometown, email]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.sendStatus(200);
      });
  });

  app.post("/studentEmailUpdate", (req, res) => {
    const currUser = req.query.un;
    const email = req.query.email;
    var sqlQuery = mysql.format('CALL update_studentEmail(?, ?)',
    [currUser, email]);
    connection.query(sqlQuery, function (err, result, fields) {
        if (err) throw err;
        res.sendStatus(200);
      });
  });

  app.get("/university", function (req, res) {
    //run this to get data about current user from DB
    let currentUni = req.query.un;
    //handle empty search query
    if (currentUni.length < 1) {
      var sqlQuery1 = mysql.format('SELECT * FROM university');
      connection.query(sqlQuery1, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    } else {
      var sqlQuery = mysql.format('SELECT * FROM university WHERE uni_name LIKE ?', [currentUni + "%"]);
      connection.query(sqlQuery, function (err, result, fields) {
          if (err) throw err;
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
    connection.query(sqlQuery, function(err, result, fields) {
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
