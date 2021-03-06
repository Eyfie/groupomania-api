const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champ ${path} doit être rempli`,
  },
  string: {
    matches: 'La chaîne de caractères envoyée doit être \'like\' ou \'dislike\'',
  },
  number: {
    integer: 'Ce chiffre n\'est pas un entier',
  },
});

exports.reactionSchema = yup.object({
  type: yup.string().matches(/(like|dislike)/).required(),
  PostId: yup.number().integer(),
  CommentId: yup.number().integer(),
});
