require('dotenv').config();
require('colors');

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const KnexSessionStore = require('connect-session-knex')(session);

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
const userPostRouter = require('../api/routes/userPostRoutes')

server.use(fileUpload({
	createParentPath: true,
	limits: {
		fileSize: 270 * 270
	},
	abortOnLimit: true
}));

server.use(helmet());
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
server.use('/api/userpost', userPostRouter);

server.get('/', (req, res) => {
	res.json({ message: 'The API is up and running... '});
});

module.exports = server;