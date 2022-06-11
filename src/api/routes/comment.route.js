const router = require('express').Router();
const validation = require('../middlewares/validation');
const comment = require('../controllers/comment.controller');
const multer = require('../middlewares/multer');
const { commentSchema } = require('../validations/comment.validation');

router.get('/', comment.getAllComments);
router.get('/:commentId', comment.getComment);
router.post('/', multer, (...args) => validation(commentSchema, ...args), comment.createComment);
router.patch('/:commentId', multer, (...args) => validation(commentSchema, ...args), comment.modifyComment);
router.delete('/:commentId', comment.deleteComment);

module.exports = router;
