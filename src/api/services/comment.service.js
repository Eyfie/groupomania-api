/* eslint-disable object-curly-newline */
const fs = require('fs/promises');
const createError = require('http-errors');
const { Post, User, Comment, Reaction, Report } = require('../models');

exports.getAllComments = async () => {
  const allComments = await Comment.findAll({
    order: [['createdAt', 'DESC']],
    include: [{
      model: User,
      attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
    }, {
      model: Reaction,
    }, {
      model: Report,
    }],
  });
  if (!allComments) throw new createError[404]('Comments not found');

  return allComments;
};

exports.getComment = async (params) => {
  const { commentId } = params;
  const commentFound = await Comment.findOne({
    where: { id: commentId },
    include: [{
      model: Reaction,
    }, {
      model: Report,
    }],
  });
  if (!commentFound) throw new createError[404]('Comment not found');

  return commentFound;
};

exports.createComment = async (body, file, protocol, host, accessToken) => {
  const { PostId } = body;
  const postFound = await Post.findOne({ where: { id: PostId } });
  if (!postFound) throw new createError[404]('Post not found');

  const comment = file ? {
    ...body,
    media: `${protocol}://${host}/images/${file.media[0].filename}`,
  } : { ...body };

  const newComment = await Comment.create({ ...comment, UserId: accessToken.user.id, PostId });
  if (!newComment) throw new createError[500]('Something went wrong, please try again ! ICI');

  return newComment;
};

exports.modifyComment = async (params, body, file, protocol, host, accessToken) => {
  const { commentId } = params;
  const commentFound = await Comment.findOne({ where: { id: commentId } });
  if (!commentFound) throw new createError[404]('Comment not found');

  if (accessToken.user.role !== 'moderator') {
    if (commentFound.UserId !== accessToken.user.id) throw new createError[401]('Not authorized');
  }

  const comment = file ? {
    ...body,
    media: `${protocol}://${host}/images/${file.media[0].filename}`,
  } : { ...body };

  const updatedComment = await Comment.update({ ...comment }, { where: { id: commentId } });
  if (!updatedComment) throw new createError[500]('Something went wrong, please try again !');

  if (commentFound.media && (file || body.media === null)) await fs.unlink(`public/images/${commentFound.media.split('/images/')[1]}`);

  return comment;
};

exports.deleteComment = async (params, accessToken) => {
  const { commentId } = params;
  const commentFound = await Comment.findOne({ where: { id: commentId } });
  if (!commentFound) throw new createError[404]('Comment not found');

  if (accessToken.user.role !== 'moderator') {
    if (commentFound.UserId !== accessToken.user.id) throw new createError[401]('Not authorized');
  }

  const deletedComment = await Comment.destroy({ where: { id: commentId } });
  if (!deletedComment) throw new createError[500]('Something went wrong, please try again !');

  if (commentFound.media !== null) await fs.unlink(`public/images/${commentFound.media.split('/images/')[1]}`);

  return deletedComment;
};
