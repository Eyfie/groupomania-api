/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const fs = require('fs/promises');
const createError = require('http-errors');
const { hashString, checkString } = require('../helpers/encrypter');
const { verifyRefreshToken, generateAccessToken } = require('../helpers/token');
const { User } = require('../models');
//* Post, Comment, Reaction, Report, Event, Participant

exports.getAccount = async (params) => {
  const { userId } = params;

  //* TODO Sequelize query for all post/comment ['id']/reaction/report where:{report: userId(token)}
  const userFound = await User.findOne({ where: { id: userId } });
  if (!userFound) throw new createError[404]('User not found');

  return userFound;
};

exports.getMyAccount = async (params, accessToken) => {
  const userId = parseInt(params.userId, 10);
  if (userId !== accessToken.user.id) throw new createError[401]('Not authorized');

  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new createError[404]('User not found');

  return user;
};

exports.modifyAccount = async (params, body, file, protocol, accessToken, host) => {
  const userId = parseInt(params.userId, 10);
  if (userId !== accessToken.user.id) throw new createError[401]('Not authorized');

  //* Check if user exist
  const userFound = await User.findOne({ where: { id: userId } });
  if (!userFound) throw new createError[404]('User not found');

  //* Add avatar if it exist in request body
  const user = file ? {
    ...JSON.parse(body),
    avatar: `${protocol}://${host}/avatar/${file.filename}`,
  } : { ...body };

  if (user === userFound) return false;

  //* Check user password if changes are made on critical informations
  if (user.newpassword || user.email || user.username) {
    //* Check if password is missing
    const { password, newpassword, email, username } = user;
    if (!password) throw new createError[400]('Password is missing');

    //* Check if email is taken
    if (email) {
      const emailUsed = await User.findOne({ where: { email } });
      if (emailUsed) throw new createError[409]('This email is already used');
    }

    //* Check if username is taken
    if (username) {
      const userUsed = await User.findOne({ where: { username } });
      if (userUsed) throw new createError[409]('This username is already used');
    }

    //* Check password
    const match = await checkString(password, userFound.password);
    if (!match) throw new createError[401]('Not authorized');

    if (newpassword) {
      //* Check if password is not the same as previous one
      const matchPassword = await checkString(newpassword, userFound.password);
      if (matchPassword) throw new createError[409]('Your password can not be the same as the previous one');

      const hashedPassword = await hashString(newpassword);

      const updatedUser = await User.update({ ...user, password: hashedPassword }, { where: { id: userId } });
      if (!updatedUser) throw new createError[500]('Something went wrong, please try again !');

      if (file) await fs.unlink(`public/avatar/${body.avatar}`);

      return updatedUser;
    }

    if (user.password) delete user.password;

    const updatedUser = await User.update({ ...user }, { where: { id: userId } });
    if (!updatedUser) throw new createError[500]('Something went wrong, please try again !');

    if (file) await fs.unlink(`public/avatar/${body.avatar}`);

    return updatedUser;
  }

  if (user.password) delete user.password;

  const updatedUser = await User.update({ ...user }, { where: { id: userId } });
  if (!updatedUser) throw new createError[500]('Something went wrong, please try again !');

  if (file) await fs.unlink(`public/avatar/${body.avatar}`);

  return updatedUser;
};

exports.deleteAccount = async (body, params, accessToken, protocol, host) => {
  const userId = parseInt(params.userId, 10);
  if (userId !== accessToken.user.id) throw new createError[401]('Not authorized ici ? ');

  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new createError[404]('User not found la');

  const { password } = body;
  const match = await checkString(password, user.password);
  if (!match) throw new createError[401]('Not authorized');

  const deletedUser = await User.destroy({ where: { id: userId } });
  if (!deletedUser) throw new createError[500]('Something went wrong, please try again !');

  //* TODO Check path to suppress files
  const defaultAvatar = `${protocol}://${host}/avatar/default-avatar.png`;
  if (user.avatar !== defaultAvatar) await fs.unlink(`/public/avatar/${user.avatar}`.split('/avatar/')[1]);

  return deletedUser;
};

exports.refreshToken = async (headers) => {
  const token = headers.authorization.split(' ')[1];
  if (!token) throw new createError[401]('You need to be logged in');

  const refreshToken = verifyRefreshToken(token);

  const userFound = await User.findOne({ where: { id: refreshToken.user.id } });
  if (!userFound) throw new createError[404]('User not found');

  delete refreshToken.iat;
  delete refreshToken.exp;

  const refreshedToken = generateAccessToken(refreshToken);

  return { userFound, accessToken: refreshedToken };
};
