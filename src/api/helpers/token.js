const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1200s' });

exports.verifyAccessToken = (token) => jwt.verify({ token }, process.env.ACCESS_TOKEN_SECRET);

exports.generateRefreshToken = (user) => jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

exports.verifyRefreshToken = (token) => jwt.verify({ token }, process.env.REFRESH_TOKEN_SECRET);
