const router = require('express').Router();
const validation = require('../middlewares/validation');
const post = require('../controllers/post.controller');
const multer = require('../middlewares/multer');
const { postSchema } = require('../validations/post.validation');

router.get('/', post.getAllPosts);
router.get('/:postId', post.getPost);
router.post('/', multer, (...args) => validation(postSchema, ...args), post.createPost);
router.patch('/:postId', multer, (...args) => validation(postSchema, ...args), post.modifyPost);
router.delete('/:postId', post.deletePost);

module.exports = router;
