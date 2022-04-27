const router = require('express').Router();
const validation = require('../middlewares/validation');
const user = require('../controllers/user.controller');
const multer = require('../middlewares/multer');
const { accountSchema, accountDeleteSchema } = require('../validations/user.validation');

router.get('/:userId', (...args) => validation(accountSchema, ...args), user.getUser);
router.get('/:userId/account', (...args) => validation(accountSchema, ...args), user.getAccount);
router.patch('/:userId/account', (...args) => validation(accountSchema, ...args), multer, user.modifyAccount);
router.delete('/:userId/account', (...args) => validation(accountDeleteSchema, ...args), user.deleteAccount);
router.post('/user/refreshToken', user.refreshToken);

module.exports = router;
