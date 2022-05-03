const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champ ${path} doit être rempli`,
  },
  string: {
    url: ({ path }) => `Le champs ${path} doit être une url`,
    date: ({ path }) => `Le champs ${path} doit contenir une date`,
    min: ({ path, min }) => `Le champ ${path} doit contenir au moins ${min} caractères`,
    max: ({ path, max }) => `Le champ ${path} doit contenir au maximum ${max} caractères`,
  },
});

exports.eventSchema = yup.object({
  title: yup.string().min(1).max(70).required(),
  textcontent: yup.string().required(),
  location: yup.string().url().required(),
  date: yup.date().require(),
});

exports.eventEditSchema = yup.object({
  title: yup.string().min(1).max(70),
  textcontent: yup.string(),
  location: yup.string().url(),
  date: yup.date(),
});
