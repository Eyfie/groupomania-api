const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champs ${path} doit être rempli`,
  },
  string: {
    email: 'Le format de cet email n\'est pas correct',
    min: 'Le mot de passe doit contenir au moins 8 caractères',
    max: 'Le mot de passe peut contenir 32 caractères au maximum',
    matches: 'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre au minimum',
    username: 'Votre pseudo n\'est pas dans un format correct',
    firstname: 'Votre prénom n\'est pas dans un format correct',
    lastname: 'Votre nom n\'est pas dans un format correct',
  },
});

exports.forgotSchema = yup.object({
  email: yup.string().email().required(),
});

exports.loginSchema = yup.object({
  email: yup.string().email(),
  username: yup.string(),
  password: yup.string()
    .min(8)
    .max(32)
    .required(),
});

exports.modifySchema = yup.object({
  newpassword: yup.string().min(8).max(32)
    .required(),
});

exports.signupSchema = yup.object({
  username: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  theme: yup.number().integer().required(),
});
