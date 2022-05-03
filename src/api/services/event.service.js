const createError = require('http-errors');
const { Participant, User, Event } = require('../models');

exports.getAllEvents = async (accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const allEvents = await Event.findAll({
    order: ['createdAt', 'DESC'],
    include: [{
      model: Participant,
    }],
  });
  if (!allEvents) throw new createError[500]('Something went wrong, please try again !');

  return allEvents;
};

exports.getEvent = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { eventId } = params;
  const event = await Event.findOne({ where: { id: eventId } });
  if (!event) throw new createError[404]('Event not found');

  return event;
};

exports.createEvent = async (body, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  //* TODO Do I need to check if location  == googlemap ?
  const event = await Event.create({ ...body, UserId });
  if (!event) throw new createError[500]('Something went wrong, please try again !');

  return event;
};

exports.modifyEvent = async (params, body, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { eventId } = params;
  const eventFound = await Event.findOne({ where: { id: eventId } });
  if (!eventFound) throw new createError[404]('Event not found');

  const updatedEvent = await Event.update({ ...body }, { where: { id: eventId } });
  if (!updatedEvent) throw new createError[500]('Something went wrong, please try again !');

  return updatedEvent;
};

exports.deleteEvent = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { eventId } = params;
  const eventFound = await Event.findOne({ where: { id: eventId } });
  if (!eventFound) throw new createError[404]('Event not found');

  const deletedEvent = await Event.destroy({ where: { id: eventId } });
  if (!deletedEvent) throw new createError[500]('Something went wrong, please try again !');

  return deletedEvent;
};
