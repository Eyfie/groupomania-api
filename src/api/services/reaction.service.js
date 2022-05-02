/* eslint-disable max-len */
const createError = require('http-errors');
const { User, Reaction } = require('../models');

exports.getAllReactions = async (accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const allReactions = await Reaction.findAll();

  return allReactions;
};

exports.getReaction = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { reactionId } = params;
  const reactionFound = await Reaction.findOne({ where: { id: reactionId } });
  if (!reactionFound) throw new createError[404]('Reaction not found');

  return reactionFound;
};

exports.createReaction = async (body, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { CommentId, PostId } = body;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  if (!where) throw new createError[400]('Bad request');

  const reactionFound = await Reaction.findOne({ where: { ...where, UserId } });
  if (reactionFound) throw new createError[409]('Reaction already exist');

  const reaction = { ...body };
  const newReaction = await Reaction.create({ ...reaction, UserId });
  if (!newReaction) throw new createError[500]('Something went wrong, please try again');

  const allReactions = await Reaction.findAll({ where });

  return allReactions;
};

exports.modifyReaction = async (params, body, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { reactionId } = params;
  const reactionFound = await Reaction.findOne({ where: { id: reactionId } });
  if (!reactionFound) throw new createError[404]('Reaction not found');
  if (reactionFound.UserId !== UserId) throw new createError[401]('Not Authorized');

  const reaction = (reactionFound.type === body.type) ? { ...reactionFound, type: null } : { ...reactionFound, type: body.type };

  const updatedReaction = await Reaction.update({ ...reaction }, { where: { id: reactionId } });
  if (!updatedReaction) throw new createError[500]('Something went wrong, please try again');

  const { CommentId, PostId } = reactionFound;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  const allReactions = await Reaction.findAll({ where });

  return allReactions;
};

exports.deleteReaction = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { reactionId } = params;
  const reactionFound = await Reaction.findOne({ where: { id: reactionId } });
  if (!reactionFound) throw new createError[404]('Reaction not found');
  if (reactionFound.UserId !== UserId) throw new createError[401]('Not Authorized');

  const deletedReaction = await Reaction.destroy({ where: { id: reactionId } });
  if (!deletedReaction) throw new createError[500]('Something went wrong, please try again !');

  const { CommentId, PostId } = reactionFound;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  const allReactions = await Reaction.findAll({ where });

  return allReactions;
};
