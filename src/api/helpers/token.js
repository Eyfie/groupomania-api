const createError = require('http-errors');
const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

exports.verifyAccessToken = (token) => jwt.verify(
  token,
  process.env.ACCESS_TOKEN_SECRET,
  (err, decoded) => {
    if (err) throw new createError[403]('Forbidden');
    return decoded;
  },
);

exports.generateRefreshToken = (user) => jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '8h' });

exports.verifyRefreshToken = (token) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
