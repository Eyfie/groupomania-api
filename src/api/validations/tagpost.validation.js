const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champ ${path} doit être rempli`,
  },
});

exports.tagpostSchema = yup.object({
  name: yup.string().required(),
});
