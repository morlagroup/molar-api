const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

function generateAuthToken({ id, isAdmin, firstName, lastName, email }) {
  const token = jwt.sign(
    {
      _id: id,
      isAdmin: isAdmin,
      firstName: firstName,
      lastName: lastName,
      email: email
    },
    config("jwtMorlaPrivateKey")
  );
  return token;
}

function validateUser(user) {
  const schema = {
    firstName: Joi.string()
      .min(5)
      .max(50)
      .required(),
    lastName: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

exports.generateAuthToken = generateAuthToken;
exports.validate = validateUser;
