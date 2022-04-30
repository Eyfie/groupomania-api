const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champ ${path} doit être rempli`,
  },
  string: {
    matches: 'Les chaînes de caractères doivent être _\'like\' ou \'dislike\'',
  },
});

exports.reactionSchema = yup.object({
  type: yup.string().matches(/(like|dislike)/).require(),
});
