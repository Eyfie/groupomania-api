const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champs ${path} doit être rempli`,
  },
  string: {
    min: 'Le mot de passe doit contenir au moins 8 caractères',
    max: 'Le mot de passe peut contenir 32 caractères au maximum',
    matches: 'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre au minimum',
    email: 'Votre email n\'est pas dans un format correct',
  },
});
//* TODO Add theme to doc for patch user
//* TODO Put regex password
exports.accountSchema = yup.object({
  username: yup.string(),
  firstname: yup.string(),
  lastname: yup.string(),
  description: yup.string(),
  password: yup.string().min(8).max(32),
  newpassword: yup.string().min(8).max(32),
  email: yup.string().email(),
  theme: yup.string().matches(/(light|dark)/),
});

exports.accountDeleteSchema = yup.object({
  password: yup.string().required(),
});
