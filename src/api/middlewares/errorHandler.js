const errorHandler = (error, res) => {
  if (error) {
    res.status(error.status || 500).json({ message: error.message || 'Something went wrong, please try again !' });
  }
};

module.exports = errorHandler;
