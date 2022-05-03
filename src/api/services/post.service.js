/* eslint-disable object-curly-newline */
const fs = require('fs/promises');
const createError = require('http-errors');
const { Post, User, Comment, Reaction, Report, Tagpost } = require('../models');

//* TODO Check SQL request // Get ALL comments too
exports.getAllPosts = async (accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const allPosts = await Post.findAll({
    order: ['createAt', 'DESC'],
    // include: [{
    //   model: User,
    //   attributes: ['id', 'username', 'firtsname', 'lastname', 'avatar'],
    // }, {
    //   model: Tagpost,
    // }, {
    //   model: Comment,
    //   attributes: ['id'],
    // }, {
    //   model: Reaction,
    //   attributes: ['id', 'PostId', 'UserId'],
    // }, {
    //   model: Report,
    //   attributes: ['UserId'],
    // }],
  });

  if (!allPosts) throw new createError[404]('Posts not found');

  return allPosts;
};

exports.getPost = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { postId } = params;
  const post = await Post.findOne({
    where: { id: postId },
    include: [{
      model: User,
      attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
    }, {
      model: Tagpost,
    }, {
      model: Comment,
      order: ['createdAt', 'DESC'],
      include: [{
        model: User,
        attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
      }],
    }, {
      model: Reaction,
    }, {
      model: Report,
      attributes: ['UserId'],
    }],
  });
  if (!post) throw new createError[404]('Post not found');

  return post;
};

exports.createPost = async (body, file, protocol, accessToken, host) => {
  const UserId = accessToken.user.id;
  const user = await User.findOne({ where: { id: UserId } });
  if (!user) throw new createError[404]('User not found');

  const { title } = body;
  if (!title) throw new createError[400]('Le champs title doit être rempli');

  const post = file ? {
    ...JSON.parse(body),
    media: `${protocol}://${host}/avatar/${file.filename}`,
  } : { ...body };

  const newPost = await Post.create({ ...post, UserId });
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

  if (file) fs.unlink(`public/images/${postFound.media}`);

  return post;
};

exports.deletePost = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { postId } = params;
  const postFound = await Post.findOne({ where: { id: postId } });
  if (!postFound) throw new createError[404]('Post not found');

  if (userFound.role !== 'moderator') {
    if (postFound.UserId !== UserId) throw new createError[401]('Not authroized');
  }

  const deletedPost = await Post.destroy({ where: { id: postId } });
  if (!deletedPost) throw new createError[500]('Something went wrong, please try again !');

  if (postFound.media !== null) fs.unlink(`public/images/${postFound.media}`);

  return postFound;
};
