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
 * complete the usersModel logic 
 * add the rest of the routes in the authRouter file 
 * add and create usersRouter.js to router directory 
 * add and create usersModel.js t models directory 
 * add users routes to server.js 
 * test 
 * 	add and create postsRouter.js to router directory 
 * 	add and create postsModel.js to model directory 
 * 	add posts routes to server.js 
 * 	test 
 *  add and create commentsRouter.js to router directory 
 * 	add and create commentsModel.js to model directory 
 *  add comments routes to server.js 
 *  test 
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
