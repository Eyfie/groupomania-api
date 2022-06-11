const createError = require('http-errors');
const { Participant, Event } = require('../models');

exports.getAllEvents = async () => {
  const allEvents = await Event.findAll({
    order: [['createdAt', 'DESC']],
    include: [{
      model: Participant,
    }],
  });
  if (!allEvents) throw new createError[500]('Something went wrong, please try again !');

  return allEvents;
};

exports.getEvent = async (params) => {
  const { eventId } = params;
  const event = await Event.findOne({
    where: { id: eventId },
    include: [{
      model: Participant,
    }],
  });
  if (!event) throw new createError[404]('Event not found');

  return event;
};

exports.createEvent = async (body, accessToken) => {
  const event = await Event.create({ ...body, UserId: accessToken.user.id });
  if (!event) throw new createError[500]('Something went wrong, please try again !');

  return event;
};

exports.modifyEvent = async (params, body) => {
  const { eventId } = params;
  const eventFound = await Event.findOne({ where: { id: eventId } });
  if (!eventFound) throw new createError[404]('Event not found');

  const updatedEvent = await Event.update({ ...body }, { where: { id: eventId } });
  if (!updatedEvent) throw new createError[500]('Something went wrong, please try again !');

  return { ...body };
};

exports.deleteEvent = async (params) => {
  const { eventId } = params;
  const eventFound = await Event.findOne({ where: { id: eventId } });
  if (!eventFound) throw new createError[404]('Event not found');

  const deletedEvent = await Event.destroy({ where: { id: eventId } });
  if (!deletedEvent) throw new createError[500]('Something went wrong, please try again !');

  return eventFound;
};
