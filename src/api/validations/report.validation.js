const yup = require('yup');

yup.setLocale({
  number: {
    integer: ({ path }) => `Le champs ${path} doit être un chiffre entier`,
  },
});

exports.reportSchema = yup.object({
  PostId: yup.number().integer(),
  CommentId: yup.number().integer(),
});
