const reactionService = require('../services/reaction.service');

exports.getAllReactions = async (req, res, next) => {
  try {
    const Reactions = await reactionService.getAllReactions();
    res.status(200).json({ message: 'Reactions found', Reactions });
  } catch (error) {
    next(error);
  }
};

exports.getReaction = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const Reaction = await reactionService.getReaction(params, accessToken);
    res.status(200).json({ message: 'Reaction found', Reaction });
  } catch (error) {
    next(error);
  }
};

exports.createReaction = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const Reactions = await reactionService.createReaction(body, accessToken);
    res.status(201).json({ message: 'Reaction created', Reactions });
  } catch (error) {
    next(error);
  }
};

exports.modifyReaction = async (req, res, next) => {
  const { params, body, accessToken } = req;
  try {
    const Reactions = await reactionService.modifyReaction(params, body, accessToken);
    res.status(200).json({ message: 'Reaction updated', Reactions });
  } catch (error) {
    next(error);
  }
};

exports.deleteReaction = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const Reactions = await reactionService.deleteReaction(params, accessToken);
    res.status(200).json({ message: 'Reaction deleted', Reactions });
  } catch (error) {
    next(error);
  }
};
