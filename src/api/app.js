const express = require('express');
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth.route');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

//* Paths
app.use('/avatar', express.static(path.join(__dirname, '../../public/avatar')));
app.use('/images', express.static(path.join(__dirname, '../../public/images')));
app.use('/video', express.static(path.join(__dirname, '../../public/video')));

//* Routes
app.use('/api/user', authRoutes);

//* Errors
app.use(errorHandler);

module.exports = app;
