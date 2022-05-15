require('dotenv').config();

const server = require('./api/server');

server.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`\n *** Server is listening on http://${process.env.HOST}:${process.env.PORT}`.black.bgYellow.underline);
});

/**
 * not yet added: 
 * bcryptjs 
 * connect-session-knex 
 * accesscontrol - add this last or toward the end 
 * express-fileupload 
 * express-validator jsonwebtoken 
 * jwt-decode 
 * knex 
 * knex-cleaner 
 * sqlite3 
 * 
 * 
 */
