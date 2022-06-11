const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');
const reactionRoutes = require('./routes/reaction.route');
const eventRoutes = require('./routes/event.route');
const participantRoutes = require('./routes/participant.route');
const reportRoutes = require('./routes/report.route');
const tagproRoutes = require('./routes/tagpro.route');
const tagpostRoutes = require('./routes/tagpost.route');
const refreshRoutes = require('./routes/refresh.route');
const logoutRoutes = require('./routes/logout.route');

const app = express();
require('dotenv').config();

Error.stackTraceLimit = Infinity;
app.options('*', cors);
app.use(cors);
app.use(express.json({ limit: '50mb' }));

//* Cookies middleware
app.use(cookieParser());

app.use(helmet());

//* Paths
app.use('/avatar', express.static(path.join(__dirname, '../../public/avatar')));
app.use('/images', express.static(path.join(__dirname, '../../public/images')));

//* Signup / Login / Retrieve
app.use('/api/auth', authRoutes);

//* Refresh Token
app.use('/api/refresh', refreshRoutes);

//* Log out
app.use('/api/logout', logoutRoutes);

//* Auth
app.use(auth);

//* Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/reaction', reactionRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/participant', participantRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/tagpro', tagproRoutes);
app.use('/api/tagpost', tagpostRoutes);

//* Errors
app.use('/api', errorHandler);

module.exports = app;
