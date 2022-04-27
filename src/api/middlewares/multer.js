const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

const WHITELIST = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg'];

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    const { avatar } = req.body;
    const imgType = (typeof avatar === 'string') ? 'avatar' : 'images';

    cb(null, `public/${imgType}`);
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0].trim().split(' ').join('_');
    const img = `${Date.now()}-${name + path.extname(file.originalname)}`;
    cb(null, img);
  },
});

const isValidFormat = (req, file, cb) => {
  if (!WHITELIST.includes(file.mimetype)) return cb(new createError[400]('File is not in a correct format'), false);
  return cb(null, true);
};

module.exports = multer({
  storage,
  fileFilter: isValidFormat,
  limits: {

  },
}).fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'media', maxCount: 1 },
]);
