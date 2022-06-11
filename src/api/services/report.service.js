/* eslint-disable max-len */
const createError = require('http-errors');
const { Report, Post, Comment } = require('../models');

exports.getAllReports = async () => {
  const allReports = await Report.findAll();

  return allReports;
};

exports.getReport = async (params) => {
  const { reportId } = params;
  const reportFound = await Report.findOne({ where: { id: reportId } });
  if (!reportFound) throw new createError[404]('Report not found');

  return reportFound;
};

exports.createReport = async (body, accessToken) => {
  const { CommentId, PostId } = body;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  if (!where) throw new createError[400]('Bad request');

  if (CommentId) {
    const entityFound = await Comment.findOne({ where: { id: CommentId } });
    if (!entityFound) throw new createError[404]('Comment not found');
  }
  if (PostId) {
    const entityFound = await Post.findOne({ where: { id: PostId } });
    if (!entityFound) throw new createError[404]('Post not found');
  }

  const reportFound = await Report.findOne({ where: { ...where, UserId: accessToken.user.id } });
  if (reportFound) throw new createError[409]('Report already exist');

  const newReport = await Report.create({ ...body, UserId: accessToken.user.id });
  if (!newReport) throw new createError[500]('Something went wrong, please try again');

  const allReports = await Report.findAll({ where });

  return allReports;
};

exports.modifyReport = async (params, body, accessToken) => {
  const { reportId } = params;
  const reportFound = await Report.findOne({ where: { id: reportId } });
  if (!reportFound) throw new createError[404]('Report not found');
  if (reportFound.UserId !== accessToken.user.id) throw new createError[401]('Not Authorized');

  const updatedReport = await Report.update({ ...body }, { where: { id: reportId } });
  if (!updatedReport) throw new createError[500]('Something went wrong, please try again');

  const { CommentId, PostId } = reportFound;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  const allReports = await Report.findAll({ where });

  return allReports;
};

exports.deleteReport = async (params, accessToken) => {
  const { reportId } = params;
  const reportFound = await Report.findOne({ where: { id: reportId } });
  if (!reportFound) throw new createError[404]('Report not found');
  if (reportFound.UserId !== accessToken.user.id) throw new createError[401]('Not Authorized');

  const deletedReport = await Report.destroy({ where: { id: reportId } });
  if (!deletedReport) throw new createError[500]('Something went wrong, please try again !');

  const { CommentId, PostId } = reportFound;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  const allReports = await Report.findAll({ where });

  return allReports;
};

exports.deleteAllReports = async (body) => {
  const { PostId, CommentId } = body;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  const allReports = await Report.destroy({ where });

  return allReports;
};
