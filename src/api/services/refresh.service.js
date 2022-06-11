const createError = require('http-errors');
const { verifyRefreshToken, generateAccessToken } = require('../helpers/token');
const { User } = require('../models');

exports.getRefreshToken = async (cookies) => {
  if (!cookies?.jwt) throw new createError[401]('Not authorized');
  const refreshToken = cookies.jwt;

  const decodedToken = verifyRefreshToken(refreshToken);

  const UserId = decodedToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[403]('Forbidden');

  const accessToken = generateAccessToken(userFound);

  return { role: userFound.role, accessToken };
};
