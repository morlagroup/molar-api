var express = require("express");
var router = express.Router();
var sql = require("mssql");
var conn = require("../connection/connect")();

const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { generateAuthToken, validate } = require("../models/user");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email }); // get by email
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["firstNae", "lastName", "email", "password"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save(); // save to the database

  const token = generateAuthToken(user);
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
