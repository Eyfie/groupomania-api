const createError = require('http-errors');
const { verifyAccessToken } = require('../helpers/token');
const { User } = require('../models');

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new createError[401]('No authorizations');

    const accessToken = req.headers.authorization.split(' ')[1];
    if (!accessToken) throw new createError[401]('You need to be logged in');

    req.accessToken = verifyAccessToken(accessToken);

    const UserId = req.accessToken.user.id;
    const userFound = await User.findOne({ where: { id: UserId } });
    if (!userFound) throw new createError[404]('User not found');

    req.accessToken.user = userFound;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
