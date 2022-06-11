const createError = require('http-errors');

const rights = async (req, res, next) => {
  const { accessToken } = req;
  try {
    if (accessToken.user.role !== 'moderator') throw new createError[401]('Not Authorized');
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = rights;
