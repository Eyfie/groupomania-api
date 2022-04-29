const createError = require('http-errors');

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
