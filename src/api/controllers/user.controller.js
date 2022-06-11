/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
//* TODO Remove logout from doc
const userService = require('../services/user.service');

exports.getMe = async (req, res, next) => {
  const { accessToken } = req;
  try {
    const User = await userService.getMe(accessToken);
    res.status(201).json({ message: 'User found', User });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  const { params } = req;
  try {
    const User = await userService.getUser(params);
    res.status(200).json({ message: 'User found', User });
  } catch (error) {
    next(error);
  }
};

exports.modifyUser = async (req, res, next) => {
  const { params, body, files, protocol, accessToken } = req;
  const host = req.get('host');

  delete body.avatar;
  try {
    const User = await userService.modifyUser(params, body, files, protocol, accessToken, host);
    res.status(200).json({ message: 'User updated successfully', User });
  } catch (error) {
    next(error);
  }
};

//* TODO add to doc password necessity
exports.deleteUser = async (req, res, next) => {
  const { body, params, accessToken, protocol } = req;
  const host = req.get('host');
  try {
    const User = await userService.deleteUser(body, params, accessToken, protocol, host);
    res.status(200).json({ message: 'User deleted', User });
  } catch (error) {
    next(error);
  }
};
