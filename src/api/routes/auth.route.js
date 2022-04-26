const router = require('express').Router();
const validation = require('../middlewares/validation');
const auth = require('../controllers/auth.controller');
const loginSchema = require('../validations/loginAuthValidation');
const signupSchema = require('../validations/signupAuthValidation');
const forgotSchema = require('../validations/forgotAuthValidation');
const modifySchema = require('../validations/modifyAuthValidation');

router.post('/login', (...args) => validation(loginSchema, ...args), auth.login);
router.post('/signup', (...args) => validation(signupSchema, ...args), auth.signup);
router.post('/forgot', (...args) => validation(forgotSchema, ...args), auth.forgot);
router.post('/forgot/modify', (...args) => validation(modifySchema, ...args), auth.modify);

module.exports = router;
