const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champs ${path} doit être rempli`,
  },
  string: {
    email: 'Votre email n\'est pas dans un format correct',
    min: 'Le mot de passe doit contenir au moins 8 caractères',
    max: 'Le mot de passe peut contenir 32 caractères au maximum',
    matches: 'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre au minimum',
  },
});

//* TODO Put Regex for password checking
const signupSchema = yup.object({
  username: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32)
    .matches('')
    .required(),
});

module.exports = signupSchema;
