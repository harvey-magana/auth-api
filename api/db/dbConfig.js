require('dotenv').config();
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex');
const config = require('../db/knexfile')[environment];
const db = knex(config.development);

module.exports = db;