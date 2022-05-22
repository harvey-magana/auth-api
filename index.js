require('dotenv').config();

const server = require('./api/server');

server.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`\n *** Server is listening on http://${process.env.HOST}:${process.env.PORT}`.black.bgYellow.underline);
});

/**
 * not yet added: 
 * 
 *  
 *  
 * 
 * implement check_token and refresh_token
 * router.get('/:id', postsController.getUserPostById);
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
