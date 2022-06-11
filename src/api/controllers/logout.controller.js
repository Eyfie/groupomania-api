const logoutService = require('../services/logout.service');

exports.getLogOut = async (req, res, next) => {
  try {
    const { cookies } = req;
    const loggedOut = await logoutService.getLogOut(cookies);

    //* Add secure: true to clearCookie - production only to pass in https
    res.status(200).clearCookie('jwt', { httpOnly: true }).json({ message: 'Successfully logged out !', loggedOut });
  } catch (error) {
    next(error);
  }
};
