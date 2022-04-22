const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champ ${path} doit être rempli`,
  },
  string: {
    email: 'Le format de cet email n\'est pas correct',
    username: 'Votre pseudo n\'est pas dans un format correct',
  },
});

const loginSchema = yup.object({
  oneOf: {
    username: yup.string().required(),
    email: yup.string().email().required(),
  },
});

module.exports = loginSchema;
