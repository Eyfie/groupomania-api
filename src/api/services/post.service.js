/* eslint-disable object-curly-newline */
const fs = require('fs/promises');
const createError = require('http-errors');
const { Post, User, Comment, Reaction, Report, Tagpost } = require('../models');

//* TODO Check SQL request // Get ALL comments too
exports.getAllPosts = async () => {
  const allPosts = await Post.findAll({
    order: [['createdAt', 'DESC']],
    include: [{
      model: User,
      attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
    }, {
      model: Tagpost,
    }, {
      model: Comment,
      attributes: ['id'],
    }, {
      model: Reaction,
      attributes: ['id', 'PostId', 'UserId', 'type'],
    }, {
      model: Report,
      attributes: ['id', 'UserId', 'PostId'],
    }],
  });

  if (!allPosts) throw new createError[404]('Posts not found');

  return allPosts;
};

exports.getPost = async (params) => {
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
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstname', 'lastname', 'avatar'],
        },
        {
          model: Reaction,
        },
        {
          model: Report,
        },
      ],
    }, {
      model: Reaction,
    }, {
      model: Report,
      attributes: ['id', 'UserId', 'PostId', 'UserId'],
    }],
  });
  if (!post) throw new createError[404]('Post not found');

  return post;
};

exports.createPost = async (body, file, protocol, accessToken, host) => {
  const post = file ? {
    ...body, media: `${protocol}://${host}/images/${file.media[0].filename}`,
  } : { ...body };

  const newPost = await Post.create({ ...post, UserId: accessToken.user.id });
  if (!newPost) throw new createError[500]('Something went wrong, please try again');

  return newPost;
};

exports.modifyPost = async (params, body, file, protocol, host, accessToken) => {
  const { postId } = params;
  const postFound = await Post.findOne({ where: { id: postId } });
  if (!postFound) throw new createError[404]('Post not found');

  if (accessToken.user.role !== 'moderator') {
    if (postFound.UserId !== accessToken.user.id) throw new createError[401]('Not authorized');
  }

  const post = file ? {
    ...body,
    media: `${protocol}://${host}/images/${file.media[0].filename}`,
  } : { ...body };

  const updatedPost = await Post.update({ ...post }, { where: { id: postId } });
  if (!updatedPost) throw new createError[500]('Something went wrong, please try again');

  if (postFound.media && (file || body.media === null)) await fs.unlink(`public/images/${postFound.media.split('/images/')[1]}`);

  return post;
};

exports.deletePost = async (params, accessToken) => {
  const { postId } = params;
  const postFound = await Post.findOne({ where: { id: postId } });
  if (!postFound) throw new createError[404]('Post not found');

  if (accessToken.user.role !== 'moderator') {
    if (postFound.UserId === accessToken.user.id) {
      const deletedPost = await Post.destroy({ where: { id: postId } });

      if (!deletedPost) throw new createError[500]('Something went wrong, please try again !');

      if (postFound.media !== null) await fs.unlink(`public/images/${postFound.media.split('/images/')[1]}`);

      return postFound;
    }

    throw new createError[401]('Not authorized');
  }

  const deletedPost = await Post.destroy({ where: { id: postId } });
  if (!deletedPost) throw new createError[500]('Something went wrong, please try again !');

  if (postFound.media !== null) await fs.unlink(`public/images/${postFound.media.split('/images/')[1]}`);

  return postFound;
};
