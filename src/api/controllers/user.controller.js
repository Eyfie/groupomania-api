/* eslint-disable max-len */
//* TODO Remove logout from doc
const userService = require('../services/user.service');

//* TODO Verify params / query is good
exports.getUser = async (req, res, next) => {
  const { params } = req;
  try {
    const userData = await userService.getAccount(params);
    res.status(201).json({ message: 'User found', ...userData });
  } catch (error) {
    next(error);
  }
};

exports.getMyAccount = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const myData = await userService.getMyAccount(params, accessToken);
    res.status(201).json({ message: 'User found', ...myData });
  } catch (error) {
    next(error);
  }
};

exports.modifyMyAccount = async (req, res, next) => {
  const {
    params,
    body,
    file,
    protocol,
    accessToken,
  } = req;
  const host = req.get('host');
  try {
    const userModified = await userService.modifyMyAccount(params, body, file, protocol, accessToken, host);
    res.status(201).json({ message: 'User updated successfully' }, ...userModified);
  } catch (error) {
    next(error);
  }
};

//* TODO add to doc password necessity
exports.deleteMyAccount = async (req, res, next) => {
  const { body, params, accessToken } = req;
  try {
    const userDeleted = await userService.deleteMyAccount(body, params, accessToken);
    res.status(201).json({ message: 'User deleted' }, ...userDeleted);
  } catch (error) {
    next(error);
  }
};

//* TODO Add refreshToken route to doc
exports.refreshToken = async (req, res, next) => {
  const { headers } = req;
  try {
    const tokenRefreshed = await userService.refreshToken(headers);
    res.status(201).json({ message: 'Token refreshed' }, tokenRefreshed);
  } catch (error) {
    next(error);
  }
};
