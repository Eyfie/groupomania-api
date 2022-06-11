const tagproService = require('../services/tagpro.service');

exports.getAllTagpros = async (req, res, next) => {
  try {
    const Tagpros = await tagproService.getAllTagpros();
    res.status(200).json({ message: 'Tagpros found', Tagpros });
  } catch (error) {
    next(error);
  }
};

exports.getTagpro = async (req, res, next) => {
  const { params } = req;
  try {
    const Tagpro = await tagproService.getTagpro(params);
    res.status(200).json({ message: 'Tagpro found', Tagpro });
  } catch (error) {
    next(error);
  }
};

exports.createTagpro = async (req, res, next) => {
  const { body } = req;
  try {
    const newTagpro = await tagproService.createTagpro(body);
    res.status(201).json({ message: 'Tagpro created', newTagpro });
  } catch (error) {
    next(error);
  }
};

exports.modifyTagpro = async (req, res, next) => {
  const { params, body } = req;
  try {
    const Tagpro = await tagproService.modifyTagpro(params, body);
    res.status(200).json({ message: 'Tagpro updated', Tagpro });
  } catch (error) {
    next(error);
  }
};

exports.deleteTagpro = async (req, res, next) => {
  const { params } = req;
  try {
    const deletedTagpro = await tagproService.deleteTagpro(params);
    res.status(200).json({ message: 'Tagpro deleted', deletedTagpro });
  } catch (error) {
    next(error);
  }
};
