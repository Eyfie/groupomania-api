const express = require('express');
const path = require('path');

const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

//* Paths
app.use('/avatar', express.static(path.join(__dirname, '../../public/avatar')));
app.use('/images', express.static(path.join(__dirname, '../../public/images')));
app.use('/video', express.static(path.join(__dirname, '../../public/video')));

//* Signup / Login / Retrieve
app.use('/api/user', authRoutes);

//* Auth
app.use(auth);

//* Routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);

//* Errors
app.use(errorHandler);

module.exports = app;
