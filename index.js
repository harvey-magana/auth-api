require('dotenv').config();

const server = require('./api/server');

server.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`\n *** Server is listening on http://${process.env.HOST}:${process.env.PORT}`.black.bgYellow.underline);
});

/**
 * not yet added: 
 * 
 * express-validator  
 * accesscontrol - add this last or toward the end 
 * middlewares not yet added: isLoggedIn.js, validate.js, 
 * util files not yet added: , roles.js
 * 
 * 
 * 
 * 
 *  
 * 
 * 
 * 
 * 
 * 	
 */
