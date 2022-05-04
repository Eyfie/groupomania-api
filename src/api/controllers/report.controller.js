const reportService = require('../services/report.service');

exports.getAllReports = async (req, res, next) => {
  const { accessToken } = req;
  try {
    const allReports = await reportService.getAllReports(accessToken);
    res.status(200).json({ message: 'Reports found', allReports });
  } catch (error) {
    next(error);
  }
};

exports.getReport = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const report = await reportService.getReport(params, accessToken);
    res.status(200).json({ message: 'Report found', report });
  } catch (error) {
    next(error);
  }
};

exports.createReport = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const newReport = await reportService.createReport(body, accessToken);
    res.status(201).json({ message: 'Report created', newReport });
  } catch (error) {
    next(error);
  }
};

exports.modifyReport = async (req, res, next) => {
  const { params, body, accessToken } = req;
  try {
    const updatedReport = await reportService.modifyReport(params, body, accessToken);
    res.status(200).json({ message: 'Report updated', updatedReport });
  } catch (error) {
    next(error);
  }
};

exports.deleteReport = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const deletedReport = await reportService.deleteReport(params, accessToken);
    res.status({ message: 'Report deleted', deletedReport });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllReports = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const deletedReports = await reportService.deleteAllReports(body, accessToken);
    res.status({ message: 'Report deleted', deletedReports });
  } catch (error) {
    next(error);
  }
};
