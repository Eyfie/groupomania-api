/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const createError = require('http-errors');
const commentService = require('../services/comment.service');

exports.getAllComments = async (req, res, next) => {
  const { accessToken } = req;
  try {
    const allComments = await commentService.getAllComments(accessToken);
    res.status(200).json({ message: 'Comments found', allComments });
  } catch (error) {
    next(error);
  }
};

exports.getComment = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const comment = await commentService.getComment(params, accessToken);
    res.status(200).json({ message: 'Comment found', ...comment.dataValues });
  } catch (error) {
    next(error);
  }
};

exports.createComment = async (req, res, next) => {
  const { body, file, protocol, accessToken } = req;
  const host = req.get('host');
  try {
    const createdComment = await commentService.createComment(body, file, protocol, host, accessToken);
    if (!createdComment) throw new createError[500]('Something went wrong, please try again');
    res.status(201).json({ message: 'Comment created', ...createdComment.dataValues });
  } catch (error) {
    next(error);
  }
};

exports.modifyComment = async (req, res, next) => {
  const { params, body, file, protocol, accessToken } = req;
  const host = req.get('host');
  try {
    const updatedComment = await commentService.modifyComment(params, body, file, protocol, host, accessToken);
    res.status(200).json({ message: 'Comment updated', ...updatedComment.dataValues });
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const deletedComment = await commentService.deleteComment(params, accessToken);
    if (!deletedComment) throw new createError[500]('Somehting went wrong, please try again');
    res.status(200).json({ message: 'Comment deleted', ...deletedComment.dataValues });
  } catch (error) {
    next(error);
  }
};
