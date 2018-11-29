var mysql = require('mysql');

var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });

  app.get("/student", function (req, res) {
    var firstName = "";
    var lastName = "";
    //continue this stuff

    //run this to
    connection.query("SELECT * FROM studentAccount", function (err, result, fields) {
        if (err) throw err;
        firstName = result;
      });
    var data = ({
      firstName: firstName
    });
    res.status(200).send(data);
  });
}

module.exports = appRouter;
