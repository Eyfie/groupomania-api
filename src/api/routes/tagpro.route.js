const router = require('express').Router();
const validation = require('../middlewares/validation');
const rights = require('../middlewares/rights');
const tagpro = require('../controllers/tagpro.controller');
const { tagproSchema, tagproEditSchema } = require('../validations/tagpro.validation');

router.get('/', tagpro.getAllTagpros);
router.get('/:tagproId', tagpro.getTagpro);
router.post('/', rights, (...args) => validation(tagproSchema, ...args), tagpro.createTagpro);
router.patch('/:tagproId', rights, (...args) => validation(tagproEditSchema, ...args), tagpro.modifyTagpro);
router.delete('/:tagproId', rights, tagpro.deleteTagpro);

module.exports = router;
