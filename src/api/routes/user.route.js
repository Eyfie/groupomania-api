const router = require('express').Router();
const validation = require('../middlewares/validation');
const user = require('../controllers/user.controller');
const multer = require('../middlewares/multer');
const { accountSchema, accountDeleteSchema } = require('../validations/user.validation');

router.get('/:userId', user.getUser);
router.get('/:userId/account', user.getMyAccount);
router.patch('/:userId/account', (...args) => validation(accountSchema, ...args), multer, user.modifyMyAccount);
router.delete('/:userId/account', (...args) => validation(accountDeleteSchema, ...args), user.deleteMyAccount);
router.post('/user/refreshToken', user.refreshToken);

module.exports = router;
