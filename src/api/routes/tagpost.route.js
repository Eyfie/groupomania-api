const router = require('express').Router();
const validation = require('../middlewares/validation');
const rights = require('../middlewares/rights');
const tagpost = require('../controllers/tagpost.controller');
const { tagpostSchema } = require('../validations/tagpost.validation');

router.get('/', tagpost.getAllTagposts);
router.get('/:tagpostId', tagpost.getTagpost);
router.post('/', (...args) => validation(tagpostSchema, ...args), tagpost.createTagpost);
router.patch('/:tagpostId', rights, (...args) => validation(tagpostSchema, ...args), tagpost.modifyTagpost);
router.delete('/:tagpostId', rights, tagpost.deleteTagpost);

module.exports = router;
