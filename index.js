const Joi = require("joi");
//const customers = require("./routes/customers");
const express = require("express");
const app = express();
const port = process.env.port || 5005;
const product = require("./routes/products")();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/products", product);

app.listen(port, function() {
  var datetime = new Date();
  var message =
    "Server runnning on Port: - " + port + " Started at :- " + datetime;
  console.log(message);
});
