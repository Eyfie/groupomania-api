const router = require('express').Router();
const validation = require('../middlewares/validation');
const reaction = require('../controllers/reaction.controller');
const { reactionSchema } = require('../validations/reaction.validation');

router.get('/', reaction.getAllReactions);
router.post('/', (...args) => validation(reactionSchema, ...args), reaction.createReaction);
router.patch('/:reactionId', (...args) => validation(reactionSchema, ...args), reaction.modifyReaction);
router.delete('/:reactionId/delete', reaction.deleteReaction);

module.exports = router;
