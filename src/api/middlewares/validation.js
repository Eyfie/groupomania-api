const validation = async (req, res, next, schema) => {
  const { body } = req;
  try {
    await schema.validate(body);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = validation;
