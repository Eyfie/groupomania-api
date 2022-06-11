const router = require('express').Router();
const logout = require('../controllers/logout.controller');

router.get('/', logout.getLogOut);

module.exports = router;
