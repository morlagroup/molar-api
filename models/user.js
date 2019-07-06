const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

function generateAuthToken({ id, isAdmin, username, email }) {
  const token = jwt.sign(
    {
      _id: id,
      isAdmin: isAdmin,
      username: username,
      email: email
    },
    config("jwtMorlaPrivateKey")
  );
  return token;
}

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    isAdmin: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

exports.generateAuthToken = generateAuthToken;
exports.validate = validateUser;
