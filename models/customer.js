const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    phone: {
      type: String,
      required: true
    }
  })
);

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean().required(),
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.Validator = validateCustomer;
