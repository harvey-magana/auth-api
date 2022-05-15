require('dotenv').config();
require('colors');

const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const KnexSessionStore = require('connect-session-knex')(session);

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(session({
	secret: process.env.SESSION_SECRET,
	name: 'appSession',
	resave: false, 
	saveUninitialized: false
}));

server.get('/', (req, res) => {
  res.json({ message: 'The API is up and running... '});
});

module.exports = server;