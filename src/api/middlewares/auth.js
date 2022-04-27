const createError = require('http-errors');
const { verifyAccessToken } = require('../helpers/token');

const auth = (req, res, next) => {
  try {
    console.log(req);
    const accessToken = req.headers.authorization.split(' ')[1];
    if (!accessToken) throw new createError[401]('You need to be logged in');

    req.accessToken = verifyAccessToken(accessToken);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
