const createError = require('http-errors');
//* TODO check for params (username/retriever when forgot/modify is sent);
//* const validation = (schema) = async(req, res, next) => {...}
const validation = async (schema, req, res, next) => {
  const { body } = req;
  try {
    await schema.validate(body);
    next();
  } catch (error) {
    if (error) {
      next(new createError[400](error.message));
    }
  }
};

module.exports = validation;
