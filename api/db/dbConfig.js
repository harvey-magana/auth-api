const knex = require('knex');
const config = require('../db/knexfile');
const knexfile = require('../../api/db/knexfile');
const db = knex(config.development);

module.exports = db;