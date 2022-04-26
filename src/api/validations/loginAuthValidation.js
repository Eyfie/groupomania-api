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

  username: yup.string().required(),
  password: yup.string()
    .min(8)
    .max(32),
});

module.exports = loginSchema;
