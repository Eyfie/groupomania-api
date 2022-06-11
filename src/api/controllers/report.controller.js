const reportService = require('../services/report.service');

exports.getAllReports = async (req, res, next) => {
  try {
    const Reports = await reportService.getAllReports();
    res.status(200).json({ message: 'Reports found', Reports });
  } catch (error) {
    next(error);
  }
};

exports.getReport = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const Report = await reportService.getReport(params, accessToken);
    res.status(200).json({ message: 'Report found', Report });
  } catch (error) {
    next(error);
  }
};

exports.createReport = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const Reports = await reportService.createReport(body, accessToken);
    res.status(201).json({ message: 'Report created', Reports });
  } catch (error) {
    next(error);
  }
};

exports.modifyReport = async (req, res, next) => {
  const { params, body, accessToken } = req;
  try {
    const Reports = await reportService.modifyReport(params, body, accessToken);
    res.status(200).json({ message: 'Report updated', Reports });
  } catch (error) {
    next(error);
  }
};

exports.deleteReport = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const Reports = await reportService.deleteReport(params, accessToken);
    res.status(200).json({ message: 'Report deleted', Reports });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllReports = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const Reports = await reportService.deleteAllReports(body, accessToken);
    res.status(200).json({ message: 'Report deleted', Reports });
  } catch (error) {
    next(error);
  }
};
