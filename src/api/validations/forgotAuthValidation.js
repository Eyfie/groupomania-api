const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champs ${path} doit être rempli`,
  },
  string: {
    email: 'Le format de cet email n\'est pas correct',
  },
});

const forgotSchema = yup.object({
  email: yup.string().email().required(),
});

module.exports = forgotSchema;
