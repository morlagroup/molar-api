const Joi = require("joi");
const customers = require("./routes/customers");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/customers", customers);
app.get("/", function(req, res) {
  var sql = require("mssql");

  // config for your database
  var config = {
    user: "sa",
    password: "mypassword",
    server: "localhost",
    database: "SchoolDB"
  };

  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select * from Student", function(err, recordset) {
      if (err) console.log(err);
      res.send(recordset);
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
