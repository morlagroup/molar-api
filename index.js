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
    user: "molarApp",
    password: "molar",
    server: "TEMMIX",
    database: "AdventureWorks2014" 
  };

  // connect to your database
  sql.close();
  sql.connect(config, function(err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("Select top 100 * FROM [AdventureWorks2014].[Person].[Person]", function(err, recordset) {
      if (err) console.log("Not able to connect to the local database");
      res.send(recordset);
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
