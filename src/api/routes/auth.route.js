/* eslint-disable object-curly-newline */
const router = require('express').Router();
const validation = require('../middlewares/validation');
const auth = require('../controllers/auth.controller');
const { loginSchema, signupSchema, forgotSchema, modifySchema } = require('../validations/auth.validation');

router.post('/login', (...args) => validation(loginSchema, ...args), auth.login);
router.post('/signup', (...args) => validation(signupSchema, ...args), auth.signup);
router.post('/forgot', (...args) => validation(forgotSchema, ...args), auth.forgot);
router.post('/forgot/modify', (...args) => validation(modifySchema, ...args), auth.modify);
router.post('/refreshToken', auth.refreshToken);

module.exports = router;
