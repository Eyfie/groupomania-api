/* eslint-disable max-len */
const createError = require('http-errors');
const { Tagpost } = require('../models');

exports.getAllTagposts = async () => {
  const allTagposts = await Tagpost.findAll();

  return allTagposts;
};

exports.getTagpost = async (params) => {
  const { tagpostId } = params;
  const tagpostFound = await Tagpost.findOne({ where: { id: tagpostId } });
  if (!tagpostFound) throw new createError[404]('Tagpost not found');

  return tagpostFound;
};

exports.createTagpost = async (body) => {
  const { name } = body;
  const tagpostFound = await Tagpost.findOne({ where: { name } });
  if (tagpostFound) throw new createError[409]('Tagpost already exist');

  const newTagpost = await Tagpost.create({ ...body });
  if (!newTagpost) throw new createError[500]('Something went wrong, please try again');

  return newTagpost;
};

exports.modifyTagpost = async (params, body) => {
  const { tagpostId } = params;
  const tagpostFound = await Tagpost.findOne({ where: { id: tagpostId } });
  if (!tagpostFound) throw new createError[404]('Tagpost not found');

  const updatedTagpost = await Tagpost.update({ ...body }, { where: { id: tagpostId } });
  if (!updatedTagpost) throw new createError[500]('Something went wrong, please try again');

  const allTagpost = await Tagpost.findAll();

  return allTagpost;
};

exports.deleteTagpost = async (params) => {
  const { tagpostId } = params;
  const tagpostFound = await Tagpost.findOne({ where: { id: tagpostId } });
  if (!tagpostFound) throw new createError[404]('Tagpost not found');

  const deletedTagpost = await Tagpost.destroy({ where: { id: tagpostId } });
  if (!deletedTagpost) throw new createError[500]('Something went wrong, please try again !');

  const allTagpost = await Tagpost.findAll();

  return allTagpost;
};
