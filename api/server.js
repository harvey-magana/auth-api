require('dotenv').config();
require('colors');

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const KnexSessionStore = require('connect-session-knex')(session);
const compression = require('compression');

const store = new KnexSessionStore({
	knex: require('../api/db/dbConfig'),
	tablename: 'sessions',
	sidfieldname: 'sid',
	createtable: true, 
	clearInterval: 60 * 60 * 250
});

const server = express();

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
		fileSize: 270 * 270
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
	store: store
}));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);
server.use('/api/comments', commentsRouter);
server.use('/api/user_post', userPostRouter);
server.use('/api/post_comment', postCommentRouter);

server.get('/', (req, res) => {
	res.json({ message: 'The API is up and running... '});
});

module.exports = server;