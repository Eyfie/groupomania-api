const router = require('express').Router();
const validation = require('../middlewares/validation');
const rights = require('../middlewares/rights');
const report = require('../controllers/report.controller');
const { reportSchema } = require('../validations/report.validation');

router.get('/', report.getAllReports);
router.get('/:reportId', report.getReport);
router.post('/', (...args) => validation(reportSchema, ...args), report.createReport);
router.patch('/:reportId', (...args) => validation(reportSchema, ...args), report.modifyReport);
router.delete('/:reportId', report.deleteReport);
router.delete('/', rights, report.deleteAllReports);

module.exports = router;
