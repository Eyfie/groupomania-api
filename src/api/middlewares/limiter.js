const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 100, // 10 minutes
  max: 100, // Max request during the windowMs time
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const hardLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message:
    'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

const softLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message:
    'Too many requests, please try again in 5 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { apiLimiter, hardLimiter, softLimiter };
