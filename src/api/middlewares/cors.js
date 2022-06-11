const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3000', 'http://www.groupomania.com'],
  optionSuccessStatus: 200,
  credentials: true,
};

module.exports = cors(corsOptions);
