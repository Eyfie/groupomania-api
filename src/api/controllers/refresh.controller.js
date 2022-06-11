const refreshService = require('../services/refresh.service');

exports.getRefreshToken = async (req, res, next) => {
  try {
    const { cookies } = req;
    const accessToken = await refreshService.getRefreshToken(cookies);
    res.status(201).json({ ...accessToken });
  } catch (error) {
    next(error);
  }
};
