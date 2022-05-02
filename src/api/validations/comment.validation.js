const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champ ${path} doit être rempli`,
  },
  number: {
    integer: 'Ce chiffre n\'est pas un entier',
  },
});

exports.commentSchema = yup.object({
  textcontent: yup.string(),
  PostId: yup.number().integer().required(),
});

exports.commentEditSchema = yup.object({
  textcontent: yup.string(),
});
