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
  title: yup.string().trim().min(1).max(70).required(),
  textcontent: yup.string(),
});

exports.postEditSchema = yup.object({
  title: yup.string().trim().min(1).max(70),
  textcontent: yup.string(),
});
