const createError = require('http-errors');
const authService = require('../services/auth.service');

exports.signup = async (req, res, next) => {
  const { body, protocol } = req;
  const host = req.get('host');
  try {
    const User = await authService.signup(body, protocol, host);
    res.status(201).json({ message: 'User successfully created !', User });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { body } = req;
  try {
    const User = await authService.login(body);
    res.cookie('jwt', User.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    User.refreshToken = undefined;
    res.status(200).json({ message: 'Successfully logged in !', User });
  } catch (error) {
    next(error);
  }
};

exports.forgot = async (req, res, next) => {
  const { body } = req;
  try {
    const mailed = await authService.forgot(body);
    if (!mailed) throw new createError[500]('Something wen wrong, please try again');
    res.status(200).json({ message: 'Email sent to user' });
  } catch (error) {
    next(error);
  }
};

exports.modify = async (req, res, next) => {
  const { body, query } = req;
  try {
    const passwordChanged = await authService.modify(body, query);
    if (!passwordChanged) throw new createError[500]('Something went wrong, please try again !');
    res.status(200).json({ message: 'Password changed !' });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  const { headers } = req;
  try {
    const tokenRefreshed = await authService.refreshToken(headers);
    res.status(200).json({ message: 'Token refreshed', accessToken: tokenRefreshed.accessToken });
  } catch (error) {
    next(error);
  }
};
