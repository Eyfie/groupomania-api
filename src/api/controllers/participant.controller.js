/* eslint-disable max-len */
const participantService = require('../services/participant.service');

exports.getAllParticipants = async (req, res, next) => {
  const { accessToken } = req;
  try {
    const allParticipants = await participantService.getAllParticipants(accessToken);
    res.status(200).json({ message: 'Participants found', allParticipants });
  } catch (error) {
    next(error);
  }
};

exports.getParticipant = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const participant = await participantService.getParticipant(params, accessToken);
    res.status(200).json({ message: 'Participant found', participant });
  } catch (error) {
    next(error);
  }
};

exports.createParticipant = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const newParticipant = await participantService.createParticipant(body, accessToken);
    res.status(201).json({ message: 'Participant created', newParticipant });
  } catch (error) {
    next(error);
  }
};

exports.modifyParticipant = async (req, res, next) => {
  const { params, body, accessToken } = req;
  try {
    const updatedParticipant = await participantService.modifyParticipant(params, body, accessToken);
    res.status(200).json({ message: 'Participant updated', updatedParticipant });
  } catch (error) {
    next(error);
  }
};

exports.deleteParticipant = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const deletedParticipant = await participantService.deleteParticipant(params, accessToken);
    res.status({ message: 'Participant deleted', deletedParticipant });
  } catch (error) {
    next(error);
  }
};
