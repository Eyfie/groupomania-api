const router = require('express').Router();
const validation = require('../middlewares/validation');
const event = require('../controllers/event.controller');
const rights = require('../middlewares/rights');
const { eventSchema, eventEditSchema } = require('../validations/event.validation');

router.get('/', event.getAllEvents);
router.get('/:eventId', event.getEvent);
router.post('/', rights, (...args) => validation(eventSchema, ...args), event.createEvent);
router.patch('/:eventId', rights, (...args) => validation(eventEditSchema, ...args), event.modifyEvent);
router.delete('/:eventId', rights, event.deleteEvent);

module.exports = router;
