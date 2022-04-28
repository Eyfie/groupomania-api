const createError = require('http-errors');
const postService = require('../services/post.service');

exports.getAllPosts = async (req, res, next) => {
  const { accessToken } = req;
  try {
    const allPosts = await postService.getAllPosts(accessToken);
    if (!allPosts) throw new createError[500]('Something went wrong, please try again (controller)');
  } catch (error) {
    next(error);
  }
};
