const router = require('express').Router();
const validation = require('../middlewares/validation');
const event = require('../controllers/event.controller');
const { eventSchema, eventEditSchema } = require('../validations/event.validation');

router.get('/', event.getAllEvents);
router.get('/:eventId', event.getEvent);
router.post('/', (...args) => validation(eventSchema, ...args), event.createEvent);
router.patch('/:eventId', (...args) => validation(eventEditSchema, ...args), event.modifyEvent);
router.delete('/:eventId', event.deleteEvent);

module.exports = router;
