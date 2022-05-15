require('dotenv').config();
require('colors');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
    res.json({ message: 'The API is up and running... '});
});

module.exports = server;