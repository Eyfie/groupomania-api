const router = require('express').Router();
const validation = require('../middlewares/validation');
const comment = require('../controllers/comment.controller');
const multer = require('../middlewares/multer');
const { commentSchema, commentEditSchema } = require('../validations/comment.validation');

router.get('/', comment.getAllComments);
router.get('/:commentId', comment.getComment);
router.post('/', (...args) => validation(commentSchema, ...args), multer, comment.createComment);
router.patch('/:commentId', (...args) => validation(commentEditSchema, ...args), multer, comment.modifyComment);
router.delete('/:commentId', comment.deleteComment);

module.exports = router;
