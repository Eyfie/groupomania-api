/* eslint-disable max-len */
const createError = require('http-errors');
const { hashString, checkString } = require('../helpers/encrypter');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../helpers/token');
const { generateString } = require('../helpers/stringGenerator');
const { User } = require('../models');
const mail = require('../helpers/mail');

exports.signup = async (body, protocol, host) => {
  const {
    username,
    firstname,
    lastname,
    email,
    password,
    theme,
  } = body;

  const usernameUsed = await User.findOne({ where: { username } });
  if (usernameUsed) throw new createError[409]('This username is already used.');

  const emailUsed = await User.findOne({ where: { email } });
  if (emailUsed) throw new createError[409]('This email is already used.');

  const hashedPassword = await hashString(password);

  const user = await User.create({
    username,
    firstname,
    lastname,
    email,
    password: hashedPassword,
    avatar: `${protocol}://${host}/avatar/default-avatar.png`,
    theme,
  });

  return {
    ...user.dataValues,
    email: undefined,
    password: undefined,
  };
};

exports.login = async (body) => {
  const { username, email, password } = body;
  const where = (typeof email === 'string') ? { email } : { username };

  const user = await User.findOne({ where });
  if (!user) throw new createError[404]('User not found.');

  const match = await checkString(password, user.password);
  if (!match) throw new createError[401]('Not Authorized');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    ...user.dataValues,
    email: undefined,
    password: undefined,
    retriever: undefined,
    retrieverDate: undefined,
    role: undefined,
    accessToken,
    refreshToken,
  };
};

exports.forgot = async (body) => {
  const { email } = body;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new createError[404]('User not found');

  const retrieverDate = Date.now();
  const retriever = generateString(21);
  const hashedRetriever = await hashString(retriever);
  const userUpdate = await User.update({ retriever: hashedRetriever, retrieverDate }, { where: { email } });
  if (!userUpdate) return false;

  mail(email, user.username, retriever);
  return true;
};

exports.modify = async (body, query) => {
  const { username, retriever } = query;
  const { newpassword } = body;

  if (!username || !retriever) throw new createError[400]('Missing parameters');

  const user = await User.findOne({ where: { username } });
  if (!user) throw new createError[404]('User not found');

  const requestDate = Date.now();
  const timelimit = 10;
  const timeout = user.retrieverDate + (timelimit * 60000);
  if (requestDate > timeout) throw new createError[400]('Bad Request');

  const matchRetriever = await checkString(retriever, user.retriever);
  if (!matchRetriever) throw new createError[401]('Not Authorized');

  const matchPassword = await checkString(newpassword, user.password);
  if (matchPassword) throw new createError[409]('Your password can not be the same as your previous one');

  const hashedPassword = await hashString(newpassword);
  const updateUser = await User.update({ password: hashedPassword }, { where: { username } });
  if (!updateUser) return false;

  return true;
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
