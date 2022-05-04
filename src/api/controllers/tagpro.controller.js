const tagproService = require('../services/tagpro.service');

exports.getAllTagpros = async (req, res, next) => {
  const { accessToken } = req;
  try {
    const allTagpros = await tagproService.getAllTagpros(accessToken);
    res.status(200).json({ message: 'Tagpros found', allTagpros });
  } catch (error) {
    next(error);
  }
};

exports.getTagpro = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const tagpro = await tagproService.getTagpro(params, accessToken);
    res.status(200).json({ message: 'Tagpro found', tagpro });
  } catch (error) {
    next(error);
  }
};

exports.createTagpro = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const newTagpro = await tagproService.createTagpro(body, accessToken);
    res.status(201).json({ message: 'Tagpro created', newTagpro });
  } catch (error) {
    next(error);
  }
};

exports.modifyTagpro = async (req, res, next) => {
  const { params, body, accessToken } = req;
  try {
    const updatedTagpro = await tagproService.modifyTagpro(params, body, accessToken);
    res.status(200).json({ message: 'Tagpro updated', updatedTagpro });
  } catch (error) {
    next(error);
  }
};

exports.deleteTagpro = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const deletedTagpro = await tagproService.deleteTagpro(params, accessToken);
    res.status({ message: 'Tagpro deleted', deletedTagpro });
  } catch (error) {
    next(error);
  }
};
