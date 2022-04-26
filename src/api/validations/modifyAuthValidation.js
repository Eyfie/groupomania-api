const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champ ${path} doit être rempli`,
  },
  string: {
    min: 'Le mot de passe doit contenir au moins 8 caractères',
    max: 'Le mot de passe peut contenir 32 caractères au maximum',
    matches: 'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre au minimum',
  },
});

//* TODO Put Regex for password checking
const modifySchema = yup.object({
  newpassword: yup.string().min(8).max(32)
    .required(),
});

module.exports = modifySchema;
