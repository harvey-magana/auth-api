require('dotenv').config();

const server = require('./api/server');

server.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`\n *** Server is listening on http://${process.env.HOST}:${process.env.PORT}`.black.bgYellow.underline);
});

/**
 * not yet added: 
 * bcryptjs 
 * 
 * accesscontrol - add this last or toward the end 
 * express-fileupload 
 * express-validator jsonwebtoken 
 * jwt-decode 
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
 * 	 
 * 	
 *  
 * 	
 *  
 *  
 *  
 *  create api/controllers
 *  create api/controllers/authController.js 
 *  transfer logic from authRouter to authController.js 
 *  
 *  middlewares not added yet:
 *  signToken and verifyToken for jwt 
 *  validate for data validation 
 * 
 * 	utils not added 
 */
