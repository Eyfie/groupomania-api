const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champ ${path} doit être rempli`,
  },
  string: {
    matches: 'La chaîne de caractères envoyée doit être \'like\' ou \'dislike\'',
  },
});

exports.tagproSchema = yup.object({
  type: yup.string().matches(/(position|job)/).required(),
  name: yup.string().required(),
});

exports.tagproEditSchema = yup.object({
  type: yup.string().matches(/(position|job)/),
  name: yup.string(),
});
