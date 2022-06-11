const crypto = require('crypto');

exports.generateString = (stringSize) => {
  const rawString = crypto.randomBytes(stringSize).toString('hex').slice(0, stringSize);
  return rawString;
};
