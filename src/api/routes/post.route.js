const router = require('express').Router();
const validation = require('../middlewares/validation');
const post = require('../controllers/post.controller');
const multer = require('../middlewares/multer');
const { postSchema } = require('../validations/post.validation');

router.get('/', post.getAllPosts);
router.get('/:postId', post.getPost);
router.post('/', (...args) => validation(postSchema, ...args), multer, post.createPost);
router.patch('/:postId', (...args) => validation(postSchema, ...args), multer, post.modifyPost);
router.delete('/:postId', post.deletePost);

module.exports = router;
