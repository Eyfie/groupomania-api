const router = require('express').Router();
const refresh = require('../controllers/refresh.controller');

router.get('/', refresh.getRefreshToken);

module.exports = router;
