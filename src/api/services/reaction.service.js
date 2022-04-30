const createError = require('http-errors');
const { Post, User, Comment, Reaction, Report, Tagpost } = require('../models');

exports.getAllReactions = async (accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const allReactions = await Reaction.findAll();

  return [allReactions];
};

exports.getReaction = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { reactionId } = params;
  const reactionFound = await Reaction.findOne({ where: { id: reactionId } });
  if (!reactionFound) throw new createError[404]('Reaction not found');
};

exports.createReaction = async (body, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { CommentId, PostId } = body;
  if (!CommentId || !PostId) throw new createError[400]('Bad request');

  const reaction = { ...body, UserId };

  const newReaction = await Reaction.create({ reaction });
  if (!newReaction) throw new createError[500]('Something went wrong, please try again');

  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId }
  const allReactions = await Reaction.FindAll({ where });

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

  const reaction = { ...reactionFound, type: body.type };

  const updatedReaction = await Reaction.update({...reaction }, { where: { id: reactionId } });
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

  



  

};
