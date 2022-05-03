const router = require('express').Router();
const validation = require('../middlewares/validation');
const participant = require('../controllers/participant.controller');
const { participantSchema } = require('../validations/participant.validation');

router.get('/', participant.getAllParticipants);
router.get('/:participantId', participant.getParticipant);
router.post('/', (...args) => validation(participantSchema, ...args), participant.createParticipant);
router.patch('/:participantId', (...args) => validation(participantSchema, ...args), participant.modifyParticipant);
router.delete('/:participantId', participant.deleteParticipant);

module.exports = router;
