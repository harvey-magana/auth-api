require('dotenv').config();
require('colors');

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const KnexSessionStore = require('connect-session-knex')(session);
const compression = require('compression');
const lusca = require('lusca');
const rateLimit = require('express-rate-limit');

const store = new KnexSessionStore({
	knex: require('../api/db/dbConfig'),
	tablename: 'sessions',
	sidfieldname: 'sid',
	createtable: true, 
	clearInterval: 60 * 60 * 250
});

const server = express();

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 300,
	standardHeaders: true,
	legacyHeaders: false
});

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 20,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		message: 'Too many authentication attempts. Please try again later.'
	}
});

const authRouter = require('../api/routes/authRouter');
const usersRouter = require('../api/routes/usersRouter');
const postsRouter = require('../api/routes/postsRoutes');
const commentsRouter = require('../api/routes/commentsRouter');
const userPostRouter = require('../api/routes/userPostRoutes');
const postCommentRouter = require('../api/routes/postCommentRouter');

server.use(compression({
	level: 6,
	filter: (req, res) => {
		if(req.headers['x-no-compression']) {
			return false;
		}
		return compression.filter(req, res);
	}
}));

server.use(fileUpload({
	createParentPath: true,
	limits: {
		fileSize: 5 * 1024 * 1024
	},
	abortOnLimit: true
}));

server.use(helmet());
server.use(helmet.noSniff());
server.use(helmet.dnsPrefetchControl({
	allow: false
}));
server.use(helmet.hidePoweredBy());
server.use(helmet.xssFilter());
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(session({
	secret: process.env.SESSION_SECRET,
	name: 'appSession',
	resave: false, 
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production'
	},
	store: store
}));

server.get('/api/csrf-token', lusca.csrf(), (req, res) => {
  return res.status(200).json({
    csrfToken: res.locals._csrf
  });
});

server.use(lusca.csrf());

server.use('/api/auth', authLimiter, authRouter);
server.use('/api/users', apiLimiter, usersRouter);
server.use('/api/posts', apiLimiter, postsRouter);
server.use('/api/comments', apiLimiter, commentsRouter);
server.use('/api/user_post', apiLimiter, userPostRouter);
server.use('/api/post_comment', apiLimiter, postCommentRouter);

server.get('/', (req, res) => {
	res.json({ message: 'The API is up and running... '});
});

module.exports = server;