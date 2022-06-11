const router = require('express').Router();
const validation = require('../middlewares/validation');
const user = require('../controllers/user.controller');
const multer = require('../middlewares/multer');
const { accountSchema, accountDeleteSchema } = require('../validations/user.validation');

router.get('/me', user.getMe);
router.get('/:userId', user.getUser);
router.patch('/:userId', multer, (...args) => validation(accountSchema, ...args), user.modifyUser);
router.delete('/:userId', (...args) => validation(accountDeleteSchema, ...args), user.deleteUser);

module.exports = router;
