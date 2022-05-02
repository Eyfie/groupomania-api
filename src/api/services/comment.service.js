/* eslint-disable object-curly-newline */
const fs = require('fs/promises');
const createError = require('http-errors');
const { Post, User, Comment, Reaction, Report } = require('../models');

exports.getAllComments = async (accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[401]('Not Authorized');

  const allComments = await Comment.findAll({
    order: [['createdAt', 'DESC']],
    // include: [{
    //   model: User,
    //   attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
    // }, {
    //   model: Post,
    //   attributes: ['id'],
    // }, {
    //   model: Reaction,
    // }, {
    //   model: Report,
    //   attributes: ['UserId'],
    // }],
  });
  if (!allComments) throw new createError[404]('Comments not found');

  return allComments;
};

exports.getComment = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[401]('Not Authorized');

  const { commentId } = params;
  const commentFound = await Comment.findOne({ where: { id: commentId } });
  if (!commentFound) throw new createError[404]('Comment not found');

  return commentFound;
};

//* TODO add in DB and doc PostId needed.
exports.createComment = async (body, file, protocol, host, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[401]('Not Authorized');

  const { PostId } = body;
  const postFound = await Post.findOne({ where: { id: PostId } });
  if (!postFound) throw new createError[404]('Post not found');

  const comment = file ? {
    ...JSON.parse(body),
    media: `${protocol}://${host}/avatar/${file.filename}`,
  } : { ...body };

  const newComment = await Comment.create({ ...comment, UserId });
  if (!newComment) throw new createError[500]('Something went wrong, please try again !');

  return newComment;
};

exports.modifyComment = async (params, body, file, protocol, host, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[401]('Not Authorized');

  const { commentId } = params;
  const commentFound = await Comment.findOne({ where: { id: commentId } });
  if (!commentFound) throw new createError[404]('Comment not found');

  if (userFound.role !== 'moderator') {
    if (commentFound.UserId !== UserId) throw new createError[401]('Not authorized');
  }

  const comment = file ? {
    ...JSON.parse(body),
    media: `${protocol}://${host}/avatar/${file.filename}`,
  } : { ...body };

  //* TODO Check security if UserId is passed in body
  delete comment.UserId;

  const updatedComment = await Comment.update({ comment }, { where: { id: commentId } });
  if (!updatedComment) throw new createError[500]('Something went wrong, please try again !');

  return comment;
};

exports.deleteComment = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[401]('Not Authorized');

  const { commentId } = params;
  const commentFound = await Comment.findOne({ where: { id: commentId } });
  if (!commentFound) throw new createError[404]('Comment not found');

  if (userFound.role !== 'moderator') {
    if (commentFound.UserId !== UserId) throw new createError[401]('Not authorized');
  }

  const deletedComment = await Comment.delete({ where: { id: commentId } });
  if (!deletedComment) throw new createError[500]('Something went wrong, please try again !');

  fs.unlink(`public/images/${commentFound.media}`);

  return deletedComment;
};
