const tagpostService = require('../services/tagpost.service');

exports.getAllTagposts = async (req, res, next) => {
  try {
    const Tagposts = await tagpostService.getAllTagposts();
    res.status(200).json({ message: 'Tagposts found', Tagposts });
  } catch (error) {
    next(error);
  }
};

exports.getTagpost = async (req, res, next) => {
  const { params } = req;
  try {
    const Tagpost = await tagpostService.getTagpost(params);
    res.status(200).json({ message: 'Tagpost found', Tagpost });
  } catch (error) {
    next(error);
  }
};

exports.createTagpost = async (req, res, next) => {
  const { body } = req;
  try {
    const Tagpost = await tagpostService.createTagpost(body);
    res.status(201).json({ message: 'Tagpost created', Tagpost });
  } catch (error) {
    next(error);
  }
};

exports.modifyTagpost = async (req, res, next) => {
  const { params, body } = req;
  try {
    const Tagposts = await tagpostService.modifyTagpost(params, body);
    res.status(200).json({ message: 'Tagpost updated', Tagposts });
  } catch (error) {
    next(error);
  }
};

exports.deleteTagpost = async (req, res, next) => {
  const { params } = req;
  try {
    const Tagposts = await tagpostService.deleteTagpost(params);
    res.status(200).json({ message: 'Tagpost deleted', Tagposts });
  } catch (error) {
    next(error);
  }
};
