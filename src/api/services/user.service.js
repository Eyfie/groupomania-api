/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const fs = require('fs/promises');
const createError = require('http-errors');
const { hashString, checkString } = require('../helpers/encrypter');
const { User, Post, Reaction, Comment, Report, Tagpost, Tagpro } = require('../models');

exports.getMe = async (accessToken) => {
  const userId = accessToken.user.id;

  const user = await User.findOne({
    where: { id: userId },
    include: [{
      model: Tagpro,
    }],
  });
  if (!user) throw new createError[404]('User not found');

  return {
    ...user.dataValues,
    password: undefined,
    retriever: undefined,
    retrieverDate: undefined,
  };
};

exports.getUser = async (params) => {
  const userId = parseInt(params.userId, 10);

  const userFound = await User.findOne({
    where: { id: userId },
    include: [{
      model: Tagpro,
    }, {
      model: Post,
      order: ['createdAt', 'DESC'],
      include: [{
        model: Tagpost,
      }, {
        model: Comment,
        attributes: ['id'],
      }, {
        model: Reaction,
      }, {
        model: Report,
        attributes: ['UserId'],
      }],
    }],
  });
  if (!userFound) throw new createError[404]('User not found');

  return {
    ...userFound.dataValues,
    password: undefined,
    theme: undefined,
    retriever: undefined,
    retrieverDate: undefined,
  };
};

exports.modifyUser = async (params, body, file, protocol, accessToken, host) => {
  const userId = parseInt(params.userId, 10);
  if (userId !== accessToken.user.id) throw new createError[401]('Not authorized');

  const userFound = await User.findOne({ where: { id: userId } });
  if (!userFound) throw new createError[404]('User not found');

  const user = file ? {
    ...body,
    avatar: `${protocol}://${host}/avatar/${file.avatar[0].filename}`,
  } : { ...body };

  if (user === userFound) return false;

  if (user.newpassword || user.email || user.username) {
    //* Check if password is missing
    const { password, newpassword, email, username } = user;
    if (!password) throw new createError[400]('Password is missing');

    //* Check if email is taken
    if (email) {
      const emailUsed = await User.findOne({ where: { email } });
      if (emailUsed) throw new createError[409]('This email is already used');
    }

    //* Check if username is taken
    if (username) {
      const usernameUsed = await User.findOne({ where: { username } });
      if (usernameUsed) throw new createError[409]('This username is already used');
    }

    //* Check password
    const match = await checkString(password, userFound.password);
    if (!match) throw new createError[401]('Not authorized');

    if (newpassword) {
      //* Check if password is not the same as previous one
      const matchPassword = await checkString(newpassword, userFound.password);
      if (matchPassword) throw new createError[409]('Your password can not be the same as the previous one');

      const hashedPassword = await hashString(newpassword);

      const updatedUser = await User.update({ ...user, password: hashedPassword }, { where: { id: userId } });
      if (!updatedUser) throw new createError[500]('Something went wrong, please try again !');

      if (file && userFound.avatar !== `${protocol}://${host}/avatar/default-avatar.png`) {
        await fs.unlink(`public/avatar/${userFound.avatar.split('/avatar/')[1]}`);
      }

      return {
        ...user,
        password: undefined,
      };
    }

    delete user.password;

    const updatedUser = await User.update({ ...user }, { where: { id: userId } });
    if (!updatedUser) throw new createError[500]('Something went wrong, please try again !');

    if (file && userFound.avatar !== `${protocol}://${host}/avatar/default-avatar.png`) {
      await fs.unlink(`public/avatar/${userFound.avatar.split('/avatar/')[1]}`);
    }

    return user;
  }

  delete user.password;

  const updatedUser = await User.update({ ...user }, { where: { id: userId } });
  if (!updatedUser) throw new createError[500]('Something went wrong, please try again !');

  if (file && userFound.avatar !== `${protocol}://${host}/avatar/default-avatar.png`) {
    await fs.unlink(`public/avatar/${userFound.avatar.split('/avatar/')[1]}`);
  }

  return user;
};

exports.deleteUser = async (body, params, accessToken, protocol, host) => {
  const userId = parseInt(params.userId, 10);
  if (userId !== accessToken.user.id) throw new createError[401]('Not authorized');

  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new createError[404]('User not found');

  const { password } = body;
  const match = await checkString(password, user.password);
  if (!match) throw new createError[401]('Not authorized');

  const deletedUser = await User.destroy({ where: { id: userId } });
  if (!deletedUser) throw new createError[500]('Something went wrong, please try again !');

  if (user.avatar !== `${protocol}://${host}/avatar/default-avatar.png`) {
    await fs.unlink(`public/avatar/${user.avatar.split('/avatar/')[1]}`);
  }

  return deletedUser;
};
