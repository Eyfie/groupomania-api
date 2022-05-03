const createError = require('http-errors');
const { User } = require('../models');

const rights = async (req, res, next) => {
  const { accessToken } = req;
  try {
    const UserId = accessToken.user.id;
    const userFound = await User.findOne({ where: { id: UserId } });
    if (!userFound) throw new createError[404]('User not found');

    if (userFound.role !== 'moderator') throw new createError[401]('Not Authorized');

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = rights;
