const tagpostService = require('../services/tagpost.service');

exports.getAllTagposts = async (req, res, next) => {
  const { accessToken } = req;
  try {
    const allTagposts = await tagpostService.getAllTagposts(accessToken);
    res.status(200).json({ message: 'Tagposts found', allTagposts });
  } catch (error) {
    next(error);
  }
};

exports.getTagpost = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const tagpost = await tagpostService.getTagpost(params, accessToken);
    res.status(200).json({ message: 'Tagpost found', tagpost });
  } catch (error) {
    next(error);
  }
};

exports.createTagpost = async (req, res, next) => {
  const { body, accessToken } = req;
  try {
    const newTagpost = await tagpostService.createTagpost(body, accessToken);
    res.status(201).json({ message: 'Tagpost created', newTagpost });
  } catch (error) {
    next(error);
  }
};

exports.modifyTagpost = async (req, res, next) => {
  const { params, body, accessToken } = req;
  try {
    const updatedTagpost = await tagpostService.modifyTagpost(params, body, accessToken);
    res.status(200).json({ message: 'Tagpost updated', updatedTagpost });
  } catch (error) {
    next(error);
  }
};

exports.deleteTagpost = async (req, res, next) => {
  const { params, accessToken } = req;
  try {
    const deletedTagpost = await tagpostService.deleteTagpost(params, accessToken);
    res.status({ message: 'Tagpost deleted', deletedTagpost });
  } catch (error) {
    next(error);
  }
};
