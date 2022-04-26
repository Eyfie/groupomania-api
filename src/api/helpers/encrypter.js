const bcrypt = require('bcrypt');

exports.hashString = (string) => bcrypt.hash(string, 12);

exports.checkString = (string, stringToCheck) => bcrypt.compare(string, stringToCheck);
