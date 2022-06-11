/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const commentService = require('../services/comment.service');

exports.getAllComments = async (req, res, next) => {
  try {
    const Comments = await commentService.getAllComments();
    res.status(200).json({ message: 'Comments found', Comments });
  } catch (error) {
    next(error);
  }
};

exports.getComment = async (req, res, next) => {
  const { params } = req;
  try {
    const Comment = await commentService.getComment(params);
    res.status(200).json({ message: 'Comment found', Comment });
  } catch (error) {
    next(error);
  }
};

exports.createComment = async (req, res, next) => {
  const { body, files, protocol, accessToken } = req;
  const host = req.get('host');

  try {
    const Comment = await commentService.createComment(body, files, protocol, host, accessToken);
    res.status(201).json({ message: 'Comment created', Comment });
  } catch (error) {
    next(error);
  }
};

exports.modifyComment = async (req, res, next) => {
  const { params, body, files, protocol, accessToken } = req;
  const host = req.get('host');

  if (files) delete body.media;
  try {
    const Comment = await commentService.modifyComment(params, body, files, protocol, host, accessToken);
    res.status(200).json({ message: 'Comment updated', Comment });
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const Comment = await commentService.deleteComment(params, accessToken);
    res.status(200).json({ message: 'Comment deleted', Comment });
  } catch (error) {
    next(error);
  }
};
