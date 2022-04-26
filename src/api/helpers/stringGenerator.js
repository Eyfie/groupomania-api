const crypto = require('crypto');
//* TODO Check regex if it works or if split/join method would work
//* (particular case with special character at the end)
exports.generateString = (stringSize) => {
  const rawString = crypto.randomBytes(stringSize).toString('hex').slice(0, stringSize);
  //* const regex = /[^.,%*$#@?^<!&>'|/\\~[\]{}+="-]*/;
  return rawString;
};
