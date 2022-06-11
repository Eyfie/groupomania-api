/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
const postService = require('../services/post.service');

exports.getAllPosts = async (req, res, next) => {
  try {
    const Posts = await postService.getAllPosts();
    res.status(200).json({ message: 'Posts Found', Posts });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  const { params } = req;
  try {
    const Post = await postService.getPost(params);
    res.status(200).json({ message: 'Post found', Post });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  const { body, files, protocol, accessToken } = req;

  const host = req.get('host');
  try {
    const Post = await postService.createPost(body, files, protocol, accessToken, host);
    res.status(201).json({ message: 'Post created', Post });
  } catch (error) {
    next(error);
  }
};

exports.modifyPost = async (req, res, next) => {
  const { params, body, files, protocol, accessToken } = req;
  const host = req.get('host');

  if (files) delete body.media;

  try {
    const Post = await postService.modifyPost(params, body, files, protocol, host, accessToken);
    res.status(200).json({ message: 'Post updated', Post });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const Post = await postService.deletePost(params, accessToken);
    res.status(200).json({ message: 'Post deleted', Post });
  } catch (error) {
    next(error);
  }
};
