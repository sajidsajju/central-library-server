const Joi = require("@hapi/joi");

const AdminValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(10).required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const LoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(10).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const BooksValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).required(),
    author: Joi.string().min(6).required(),
    status: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.AdminValidation = AdminValidation;
module.exports.BooksValidation = BooksValidation;
module.exports.LoginValidation = LoginValidation;
