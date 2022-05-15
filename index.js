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
 *  create store object from KnexSessionStore
 * 	add store object to session in server.js 
 * 	create api/db 
 * 	 
 * 	
 * 	
 *  
 * 	
 *  
 * 
 *  create api/models 
 *  create api/controllers
 *  create api/controllers/authController.js 
 *  transfer logic from authRouter to authController.js 
 * 
 * add test script to packaage.json 
 * create a simple test and run it 
 */
