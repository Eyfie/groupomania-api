const res = require('express/lib/response');
const createError = require('http-errors');
const { verifyRefreshToken } = require('../helpers/token');
const { User } = require('../models');

exports.getLogOut = async (cookies) => {
  if (!cookies?.jwt) throw new createError[401]('Not authorized');

  const refreshToken = cookies.jwt;

  const decodedToken = verifyRefreshToken(refreshToken);

  const UserId = decodedToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) res.clearCookie('jwt', { httpOnly: true });

  return true;
};
