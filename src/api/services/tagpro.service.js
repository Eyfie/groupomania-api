/* eslint-disable max-len */
const createError = require('http-errors');
const { Tagpro } = require('../models');

exports.getAllTagpros = async () => {
  const allTagpros = await Tagpro.findAll();

  return allTagpros;
};

exports.getTagpro = async (params) => {
  const { tagproId } = params;
  const tagproFound = await Tagpro.findOne({ where: { id: tagproId } });
  if (!tagproFound) throw new createError[404]('Tagpro not found');

  return tagproFound;
};

exports.createTagpro = async (body) => {
  const { name, type } = body;
  const tagproFound = await Tagpro.findOne({ where: { name, type } });
  if (tagproFound) throw new createError[409]('Tagpro already exist');

  const newTagpro = await Tagpro.create({ ...body });
  if (!newTagpro) throw new createError[500]('Something went wrong, please try again');

  return newTagpro;
};

exports.modifyTagpro = async (params, body) => {
  const { tagproId } = params;
  const tagproFound = await Tagpro.findOne({ where: { id: tagproId } });
  if (!tagproFound) throw new createError[404]('Tagpro not found');

  const updatedTagpro = await Tagpro.update({ ...body }, { where: { id: tagproId } });
  if (!updatedTagpro) throw new createError[500]('Something went wrong, please try again');

  return updatedTagpro;
};

exports.deleteTagpro = async (params) => {
  const { tagproId } = params;
  const tagproFound = await Tagpro.findOne({ where: { id: tagproId } });
  if (!tagproFound) throw new createError[404]('Tagpro not found');

  const deletedTagpro = await Tagpro.destroy({ where: { id: tagproId } });
  if (!deletedTagpro) throw new createError[500]('Something went wrong, please try again !');

  return deletedTagpro;
};
