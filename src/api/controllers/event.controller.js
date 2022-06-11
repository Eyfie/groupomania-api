const eventService = require('../services/event.service');

exports.getAllEvents = async (req, res, next) => {
  try {
    const Events = await eventService.getAllEvents();
    res.status(200).json({ message: 'Events found', Events });
  } catch (error) {
    next(error);
  }
};

exports.getEvent = async (req, res, next) => {
  const { params } = req;
  try {
    const Event = await eventService.getEvent(params);
    res.status(200).json({ message: 'Event found', Event });
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const Event = await eventService.createEvent(body, accessToken);
    res.status(201).json({ message: 'Event created', Event });
  } catch (error) {
    next(error);
  }
};

exports.modifyEvent = async (req, res, next) => {
  const { params, body } = req;
  try {
    const Event = await eventService.modifyEvent(params, body);
    res.status(200).json({ message: 'Event updated', Event });
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  const { params } = req;
  try {
    const Event = await eventService.deleteEvent(params);
    res.status(200).json({ message: 'Event deleted', Event });
  } catch (error) {
    next(error);
  }
};
