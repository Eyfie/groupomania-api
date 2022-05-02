const reactionService = require('../services/reaction.service');

exports.getAllReactions = async (req, res, next) => {
  const { accessToken } = req;
  try {
    const allReactions = await reactionService.getAllReactions(accessToken);
    res.status(200).json({ message: 'Reactions found', allReactions });
  } catch (error) {
    next(error);
  }
};

exports.getReaction = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const reaction = await reactionService.getReaction(params, accessToken);
    res.status(200).json({ message: 'Reaction found', reaction });
  } catch (error) {
    next(error);
  }
};

exports.createReaction = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const newReaction = await reactionService.createReaction(body, accessToken);
    res.status(201).json({ message: 'Reaction created', newReaction });
  } catch (error) {
    next(error);
  }
};

exports.modifyReaction = async (req, res, next) => {
  const { params, body, accessToken } = req;
  try {
    const updatedReaction = await reactionService.modifyReaction(params, body, accessToken);
    res.status(200).json({ message: 'Reaction updated', updatedReaction });
  } catch (error) {
    next(error);
  }
};

exports.deleteReaction = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const deletedReaction = await reactionService.deleteReaction(params, accessToken);
    res.status({ message: 'Reaction deleted', deletedReaction });
  } catch (error) {
    next(error);
  }
};
