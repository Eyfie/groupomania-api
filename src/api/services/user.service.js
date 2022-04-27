/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const fs = require('fs/promises');
const createError = require('http-errors');
const { hashString, checkString } = require('../helpers/encrypter');
const { verifyRefreshToken, generateAccessToken } = require('../helpers/token');

const { User, Post, Comment, Reaction, Report, Event, Participant } = require('../models');

exports.getAccount = async (body) => {
  const { userId } = body;

  const userFound = await User.findOne({
    where: { id: userId },
    include: [{
      model: Post,
      include: [Comment, Reaction, Report],
    }, {
      model: Event,
      include: [Participant],
    }],
  });
  if (!userFound) throw new createError[404]('User not found');

  return userFound;
};

exports.getMyAccount = async (body, accessToken) => {
  const { userId } = body;
  if (userId !== accessToken.userId) throw new createError[401]('Not authorized');

  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new createError[404]('User not found');

  return user;
};

exports.modifyMyAccount = async (params, body, file, protocol, accessToken, host) => {
  const { userId } = params;
  if (userId !== accessToken.userId) throw new createError[401]('Not authorized');

  //* Check if user exist
  const userFound = await User.findOne({ where: { id: userId } });
  if (!userFound) throw new createError[404]('User not found');

  const { email, username } = body;

  //* Check if email/username are not taken
  const emailUsed = await User.findOne({ where: { email } });
  if (emailUsed) throw new createError[409]('This email is already used');

  const userUsed = await User.findOne({ where: { userName: username } });
  if (userUsed) throw new createError[409]('This username is already used');

  //* Add avatar if it exist in request body
  const user = file ? {
    ...JSON.parse(body),
    avatar: `${protocol}://${host}/avatar/${file.filename}`,
  } : { ...body };

  //* Check user password if changes are made on critical informations
  const { password, newpassword } = user;
  if (newpassword || email || username) {
    //* Check password
    const match = await checkString(password, userFound.password);
    if (!match) throw new createError[401]('Not authorized');

    //* Check if password is not the same as previous one
    const matchPassword = await checkString(newpassword, userFound.password);
    if (matchPassword) throw new createError[409]('Your password can not be the same as the previous one');

    const hashedPassword = await hashString(newpassword);

    const updatedUser = await User.update({ password: hashedPassword, ...user }, { where: { id: userId } });
    if (!updatedUser) throw new createError[500]('Something went wrong, please try again !');

    return updatedUser;
  }

  const updatedUser = await User.update({ ...user }, { where: { id: userId } });
  if (!updatedUser) throw new createError[500]('Something went wrong, please try again !');

  if (file) await fs.unlink(`public/avatar/${body.avatar}`);

  return updatedUser;
};

exports.deleteMyAccount = async (body, params, accessToken) => {
  const { userId } = params;
  const { password } = body;
  if (userId !== accessToken.userId) throw new createError[401]('Not authorized');

  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new createError[404]('User not found');

  const match = await checkString(password, user.password);
  if (!match) throw new createError[401]('Not authorized');

  const deletedUser = await User.destroy({ where: { id: userId } });
  if (!deletedUser) throw new createError[500]('Something went wrong, please try again !');

  if (user.avatar) await fs.unlink(`public/avatar/${user.avatar}`);

  return deletedUser;
};

exports.refreshToken = async (headers) => {
  const token = headers.authorization.split(' ')[1];
  if (!token) throw new createError[401]('You need to be logged in');

  const refreshToken = verifyRefreshToken(token);

  const userFound = await User.findOne({ where: { id: refreshToken.userId } });
  if (!userFound) throw new createError[404]('User not found');

  delete refreshToken.iat;
  delete refreshToken.exp;

  const refreshedToken = generateAccessToken(refreshToken);

  return { userFound, accessToken: refreshedToken };
};
