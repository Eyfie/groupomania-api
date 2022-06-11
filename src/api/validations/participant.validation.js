const yup = require('yup');

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champ ${path} doit être rempli`,
  },
  string: {
    matches: ({ path }) => `Le champs ${path} doit avoir pour valeur 'participate' ou 'interested'`,
  },
  number: {
    integer: ({ path }) => `Le champ ${path} doit être un chiffre entier`,
  },
});
//* TODO put it in the doc partcipate/interested
exports.participantSchema = yup.object({
  type: yup.string().matches(/(participate|interested)/).required(),
  EventId: yup.number().integer(),
});
