const eventService = require('../services/event.service');

exports.getAllEvents = async (req, res, next) => {
  const { accessToken } = req;
  try {
    const allEvents = await eventService.getAllEvents(accessToken);
    res.status(200).json({ message: 'Events found', allEvents });
  } catch (error) {
    next(error);
  }
};

exports.getEvent = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const event = await eventService.getEvent(params, accessToken);
    res.status(200).json({ message: 'Event found', event});
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const createdEvent = await eventService.createEvent(body, accessToken);
    res.status(201).json({ message: 'Event created', createdEvent });
  } catch (error) {
    next(error);
  }
};

exports.modifyEvent = async (req, res, next) => {
  const { params, body, accessToken } = req;
  try {
    const updatedEvent = await eventService.modifyEvent(params, body, accessToken);
    res.status(200).json({ message: 'Event updated', updatedEvent });
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const deletedEvent = await eventService.deleteEvent(params, accessToken);
    res.status(200).json({ message: 'Event deleted', deletedEvent });
  } catch (error) {
    next(error);
  }
};
