const yup = require('yup');

exports.postSchema = yup.object({
  textcontent: yup.string(),
  PostId: yup.number().integer(),
});
