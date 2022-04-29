const createError = require('http-errors');
const authService = require('../services/auth.service');

//* TODO Verify params / query is good
exports.signup = async (req, res, next) => {
  const { body, protocol } = req;
  const host = req.get('host');
  try {
    const user = await authService.signup(body, protocol, host);
    res.status(201).json({ message: 'User successfully created !', ...user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await authService.login(body);
    res.status(200).json({ message: 'Successfully logged in !', ...user });
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
  //* TODO Check for params or req.query
  const { body, query } = req;
  try {
    const passwordChanged = await authService.modify(body, query);
    if (!passwordChanged) throw new createError[500]('Something went wrong, please try again !');

    res.status(200).json({ message: 'Password changed !' });
  } catch (error) {
    next(error);
  }
};
