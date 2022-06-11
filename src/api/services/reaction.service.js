/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const createError = require('http-errors');
const { Reaction, Post, Comment } = require('../models');

exports.getAllReactions = async () => {
  const allReactions = await Reaction.findAll();

  return allReactions;
};

exports.getReaction = async (params) => {
  const { reactionId } = params;
  const reactionFound = await Reaction.findOne({ where: { id: reactionId } });
  if (!reactionFound) throw new createError[404]('Reaction not found');

  return reactionFound;
};

exports.createReaction = async (body, accessToken) => {
  const { CommentId, PostId } = body;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  if (!where) throw new createError[400]('Bad request');

  if (CommentId) {
    const entityFound = await Comment.findOne({ where: { id: CommentId } });
    if (!entityFound) throw new createError[404]('Comment not found');
  }
  if (PostId) {
    const entityFound = await Post.findOne({ where: { id: PostId } });
    if (!entityFound) throw new createError[404]('Post not found');
  }

  const reactionFound = await Reaction.findOne({ where: { ...where, UserId: accessToken.user.id } });
  if (reactionFound) throw new createError[409]('Reaction already exist');

  const newReaction = await Reaction.create({ ...body, UserId: accessToken.user.id });
  if (!newReaction) throw new createError[500]('Something went wrong, please try again');

  const allReactions = await Reaction.findAll({ where });

  return allReactions;
};

exports.modifyReaction = async (params, body, accessToken) => {
  const { reactionId } = params;
  const reactionFound = await Reaction.findOne({ where: { id: reactionId } });
  if (!reactionFound) throw new createError[404]('Reaction not found');
  if (reactionFound.UserId !== accessToken.user.id) throw new createError[401]('Not Authorized');

  const updatedReaction = await Reaction.update({ ...body }, { where: { id: reactionId } });
  if (!updatedReaction) throw new createError[500]('Something went wrong, please try again');

  const { CommentId, PostId } = reactionFound;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };

  const allReactions = await Reaction.findAll({ where });

  return allReactions;
};

exports.deleteReaction = async (params, accessToken) => {
  const { reactionId } = params;
  const reactionFound = await Reaction.findOne({ where: { id: reactionId } });
  if (!reactionFound) throw new createError[404]('Reaction not found');
  if (reactionFound.UserId !== accessToken.user.id) throw new createError[401]('Not Authorized');

  const { CommentId, PostId } = reactionFound;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };

  const deletedReaction = await Reaction.destroy({ where: { id: reactionId } });
  if (!deletedReaction) throw new createError[500]('Something went wrong, please try again !');

  const allReactions = await Reaction.findAll({ where });

  return allReactions;
};
