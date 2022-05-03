const express = require('express');
const path = require('path');

const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const rights = require('./middlewares/rights');

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');
const reactionRoutes = require('./routes/reaction.route');
const eventRoutes = require('./routes/event.route');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

//* Paths
app.use('/avatar', express.static(path.join(__dirname, '../../public/avatar')));
app.use('/images', express.static(path.join(__dirname, '../../public/images')));
app.use('/video', express.static(path.join(__dirname, '../../public/video')));

//* Signup / Login / Retrieve
app.use('/api/auth', authRoutes);

//* Auth
app.use(auth);

//* Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/reaction', reactionRoutes);

//* Check rights for following routes
app.use('/api', rights);

//* Routes
app.use('/api/event', eventRoutes);

//* Errors
app.use('/api', errorHandler);

module.exports = app;
