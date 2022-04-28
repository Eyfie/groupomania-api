/* eslint-disable newline-per-chained-call */
const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champ ${path} doit être rempli`,
  },
  string: {
    min: ({ path, min }) => `Le champ ${path} doit contenir au moins ${min} caractères`,
    max: ({ path, max }) => `Le champ ${path} doit contenir au maximum ${max} caractères`,
  },
});

exports.postSchema = yup.object({
  title: yup.string().trim().min().max().required(),
  textcontent: yup.string(),
});
