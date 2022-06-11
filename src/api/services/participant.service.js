/* eslint-disable max-len */
const createError = require('http-errors');
const { User, Participant, Event } = require('../models');

exports.getAllParticipants = async () => {
  const allParticipants = await Participant.findAll();

  return allParticipants;
};

exports.getParticipant = async (params) => {
  const { participantId } = params;
  const participantFound = await Participant.findOne({ where: { id: participantId } });
  if (!participantFound) throw new createError[404]('Participant not found');

  return participantFound;
};

exports.createParticipant = async (body, accessToken) => {
  const { EventId } = body;
  const eventFound = await Event.findOne({ where: { id: EventId } });
  if (!eventFound) throw new createError[404]('Event not found');

  const participantFound = await Participant.findOne({ where: { EventId, UserId: accessToken.user.id } });
  if (participantFound) throw new createError[409]('Participant already exist');

  const newParticipant = await Participant.create({ ...body, UserId: accessToken.user.id });
  if (!newParticipant) throw new createError[500]('Something went wrong, please try again');

  const allParticipants = await Participant.findAll({ where: { EventId } });

  return allParticipants;
};

exports.modifyParticipant = async (params, body, accessToken) => {
  const { participantId } = params;
  const participantFound = await Participant.findOne({ where: { id: participantId } });
  if (!participantFound) throw new createError[404]('Participant not found');
  if (participantFound.UserId !== accessToken.user.id) throw new createError[401]('Not Authorized');

  const updatedParticipant = await Participant.update({ ...body }, { where: { id: participantId } });
  if (!updatedParticipant) throw new createError[500]('Something went wrong, please try again');

  const { EventId } = participantFound;
  const allParticipants = await Participant.findAll({ where: { EventId } });

  return allParticipants;
};

exports.deleteParticipant = async (params, accessToken) => {
  const UserId = accessToken.user.id;
  const userFound = await User.findOne({ where: { id: UserId } });
  if (!userFound) throw new createError[404]('User not found');

  const { participantId } = params;
  const participantFound = await Participant.findOne({ where: { id: participantId } });
  if (!participantFound) throw new createError[404]('Participant not found');
  if (participantFound.UserId !== UserId) throw new createError[401]('Not Authorized');

  const deletedParticipant = await Participant.destroy({ where: { id: participantId } });
  if (!deletedParticipant) throw new createError[500]('Something went wrong, please try again !');

  const { EventId } = participantFound;
  const allParticipants = await Participant.findAll({ where: { EventId } });

  return allParticipants;
};
