/* eslint-disable max-len */
const participantService = require('../services/participant.service');

exports.getAllParticipants = async (req, res, next) => {
  try {
    const Participants = await participantService.getAllParticipants();
    res.status(200).json({ message: 'Participants found', Participants });
  } catch (error) {
    next(error);
  }
};

exports.getParticipant = async (req, res, next) => {
  const { params } = req;
  try {
    const Participant = await participantService.getParticipant(params);
    res.status(200).json({ message: 'Participant found', Participant });
  } catch (error) {
    next(error);
  }
};

exports.createParticipant = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const Participants = await participantService.createParticipant(body, accessToken);
    res.status(201).json({ message: 'Participant created', Participants });
  } catch (error) {
    next(error);
  }
};

exports.modifyParticipant = async (req, res, next) => {
  const { params, body, accessToken } = req;
  try {
    const Participants = await participantService.modifyParticipant(params, body, accessToken);
    res.status(200).json({ message: 'Participant updated', Participants });
  } catch (error) {
    next(error);
  }
};

exports.deleteParticipant = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const deletedParticipant = await participantService.deleteParticipant(params, accessToken);
    res.status(200).json({ message: 'Participant deleted', deletedParticipant });
  } catch (error) {
    next(error);
  }
};
