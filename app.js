const express = require('express');
const db = require('./models');

const app = express();

app.use(express.json());

db.sequelize.sync();
module.exports = app;
