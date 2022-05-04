/* eslint-disable max-len */
const createError = require('http-errors');
const { User, Tagpost } = require('../models');

exports.getAllTagposts = async (accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const allTagposts = await Tagpost.findAll();

  return allTagposts;
};

exports.getTagpost = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { tagpostId } = params;
  const tagpostFound = await Tagpost.findOne({ where: { id: tagpostId } });
  if (!tagpostFound) throw new createError[404]('Tagpost not found');

  return tagpostFound;
};

exports.createTagpost = async (body, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { name } = body;
  const tagpostFound = await Tagpost.findOne({ where: { name } });
  if (tagpostFound) throw new createError[409]('Tagpost already exist');

  const newTagpost = await Tagpost.create({ ...body });
  if (!newTagpost) throw new createError[500]('Something went wrong, please try again');

  return newTagpost;
};

exports.modifyTagpost = async (params, body, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { tagpostId } = params;
  const tagpostFound = await Tagpost.findOne({ where: { id: tagpostId } });
  if (!tagpostFound) throw new createError[404]('Tagpost not found');

  const updatedTagpost = await Tagpost.update({ ...body }, { where: { id: tagpostId } });
  if (!updatedTagpost) throw new createError[500]('Something went wrong, please try again');

  return updatedTagpost;
};

exports.deleteTagpost = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { tagpostId } = params;
  const tagpostFound = await Tagpost.findOne({ where: { id: tagpostId } });
  if (!tagpostFound) throw new createError[404]('Tagpost not found');

  const deletedTagpost = await Tagpost.destroy({ where: { id: tagpostId } });
  if (!deletedTagpost) throw new createError[500]('Something went wrong, please try again !');

  return deletedTagpost;
};
