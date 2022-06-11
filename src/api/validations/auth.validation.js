const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champs ${path} doit être rempli`,
  },
  string: {
    email: 'Le format de cet email n\'est pas correct',
    min: ({ min }) => `Le mot de passe doit contenir au moins ${min} caractères`,
    max: ({ max }) => `Le mot de passe peut contenir ${max} caractères au maximum`,
  },
});

exports.forgotSchema = yup.object({
  email: yup.string().email().required(),
});

exports.loginSchema = yup.object({
  username: yup.string(),
  password: yup.string()
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
  password: yup.string().min(8).max(24)
    .matches(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])/)
    .required(),
  theme: yup.string().matches(/(light|dark)/),
});
