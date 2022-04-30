/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
const postService = require('../services/post.service');

exports.getAllPosts = async (req, res, next) => {
  const { accessToken } = req;
  try {
    const allPosts = await postService.getAllPosts(accessToken);
    res.status(200).json({ message: 'Posts found' }, ...allPosts);
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const post = await postService.getPost(params, accessToken);
    res.status(200).json({ message: 'Post found' }, ...post);
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  const { body, file, protocol, accessToken } = req;
  const host = req.get('host');
  try {
    const createdPost = await postService.createPost(body, file, protocol, accessToken, host);
    res.status(201).json({ message: 'Post created' }, ...createdPost);
  } catch (error) {
    next(error);
  }
};

exports.modifyPost = async (req, res, next) => {
  const { params, body, file, protocol, accessToken } = req;
  const host = req.get('host');
  try {
    const updatedPost = await postService.modifyPost(params, body, file, protocol, host, accessToken);
    res.status(200).json({ message: 'Post updated' }, ...updatedPost);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const deletedPost = await postService.deletePost(params, accessToken);
    res.status(200).json({ message: 'Post deleted' }, ...deletedPost);
  } catch (error) {
    next(error);
  }
};
