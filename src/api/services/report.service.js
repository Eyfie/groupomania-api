/* eslint-disable max-len */
const createError = require('http-errors');
const { User, Report } = require('../models');

exports.getAllReports = async (accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const allReports = await Report.findAll();

  return allReports;
};

exports.getReport = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { reportId } = params;
  const reportFound = await Report.findOne({ where: { id: reportId } });
  if (!reportFound) throw new createError[404]('Report not found');

  return reportFound;
};

exports.createReport = async (body, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { CommentId, PostId } = body;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  if (!where) throw new createError[400]('Bad request');

  const reportFound = await Report.findOne({ where: { ...where, UserId } });
  if (reportFound) throw new createError[409]('Report already exist');

  const report = { ...body };
  const newReport = await Report.create({ ...report, UserId });
  if (!newReport) throw new createError[500]('Something went wrong, please try again');

  const allReports = await Report.findAll({ where });

  return allReports;
};

exports.modifyReport = async (params, body, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { reportId } = params;
  const reportFound = await Report.findOne({ where: { id: reportId } });
  if (!reportFound) throw new createError[404]('Report not found');
  if (reportFound.UserId !== UserId) throw new createError[401]('Not Authorized');

  const report = (reportFound.type === body.type) ? { ...reportFound, type: null } : { ...reportFound, type: body.type };

  const updatedReport = await Report.update({ ...report }, { where: { id: reportId } });
  if (!updatedReport) throw new createError[500]('Something went wrong, please try again');

  const { CommentId, PostId } = reportFound;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  const allReports = await Report.findAll({ where });

  return allReports;
};

exports.deleteReport = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { reportId } = params;
  const reportFound = await Report.findOne({ where: { id: reportId } });
  if (!reportFound) throw new createError[404]('Report not found');
  if (reportFound.UserId !== UserId) throw new createError[401]('Not Authorized');

  const deletedReport = await Report.destroy({ where: { id: reportId } });
  if (!deletedReport) throw new createError[500]('Something went wrong, please try again !');

  const { CommentId, PostId } = reportFound;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  const allReports = await Report.findAll({ where });

  return allReports;
};

exports.deleteAllReports = async (body, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { PostId, CommentId } = body;
  const where = (typeof CommentId === 'number') ? { CommentId } : { PostId };
  const allReports = await Report.destroy({ where });

  return allReports;
};
