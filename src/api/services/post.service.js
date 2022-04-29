/* eslint-disable object-curly-newline */
const fs = require('fs/promises');
const createError = require('http-errors');
const { Post, User, Comment, Reaction, Report, Tagpost } = require('../models');

//* TODO Check SQL request
exports.getAllPosts = async (accessToken) => {
  const userId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: userId } });
  if (!userFound) throw new createError[404]('User not found');

  const allPosts = await Post.findAll({
    order: ['createAt', 'DESC'],
    include: [{
      model: Comment,
      attributes: ['id'],
    }, {
      model: Reaction,
    }, {
      model: Report,
    }],
  });
  if (!allPosts) throw new createError[404]('Posts not found');

  return allPosts;
};

//* TODO check SQL request
exports.getPost = async (params, accessToken) => {
  const userId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: userId } });
  if (!userFound) throw new createError[404]('User not found');

  const { postId } = params;
  const post = await Post.findOne({
    where: { id: postId },
    include: [{
      model: User,
    }, {
      model: Tagpost,
    }, {
      model: Comment,
      include: [{
        model: User,
        attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
      }],
    }, {
      model: Reaction,
    }, {
      model: Report,
      where: { userId },
    }],
  });
  if (!post) throw new createError[404]('Post not found');

  return post;
};

exports.createPost = async (body, file, protocol, accessToken, host) => {
  const UserId = accessToken.user.id;
  const user = await User.findOne({ where: { id: UserId } });
  if (!user) throw new createError[404]('User not found');

  const post = file ? {
    ...JSON.parse(body),
    media: `${protocol}://${host}/avatar/${file.filename}`,
    UserId,
  } : { ...body, UserId };

  const newPost = await Post.create({ post });
  if (!newPost) throw new createError[500]('Something went wrong, please try again');

  return newPost;
};

exports.modifyPost = async (params, body, file, protocol, host, accessToken) => {
  const { postId } = params;
  const postFound = await Post.findOne({ where: { id: postId } });
  if (!postFound) throw new createError[404]('Post not found');

  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  if (userFound.role !== 'moderator') {
    if (postFound.UserId !== UserId) throw new createError[401]('Not authroized');
  }

  const post = file ? {
    ...JSON.parse(body),
    media: `${protocol}://${host}/avatar/${file.filename}`,
  } : { ...body };

  const updatedPost = await Post.update({ ...post }, { where: { id: postId } });
  if (!updatedPost) throw new createError[500]('Something went wrong, please try again');
  //* TODO check fs link
  if (file) fs.unlink(`public/images/${body.media}`);

  return updatedPost;
};

exports.deletePost = async (params, accessToken) => {
  const { postId } = params;
  const postFound = await Post.findOne({ where: { id: postId } });
  if (!postFound) throw new createError[404]('Post not found');

  const userId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: userId } });
  if (!userFound) throw new createError[404]('User not found');

  if (userFound.role !== 'moderator') {
    if (postFound.UserId !== userId) throw new createError[401]('Not authroized');
  }

  const deletedPost = await Post.delete({ where: { id: postId } });
  if (!deletedPost) throw new createError[500]('Something went wrong, please try again !');

  fs.unlink(`public/images/${postFound.media}`);

  return deletedPost;
};