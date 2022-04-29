const createError = require('http-errors');

exports.verifyUserId = async (params, accessToken) => {
  const userId = parseInt(params.userId, 10);
  if (userId !== accessToken.user.id) throw new createError[401]('Not Authorized');
};

exports.checkRights = async (role) => {
  if (role) return true;
  return false;
};
