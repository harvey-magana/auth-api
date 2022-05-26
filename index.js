require('dotenv').config();

const server = require('./api/server');

server.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`\n *** Server is listening on http://${process.env.HOST}:${process.env.PORT}`.black.bgYellow.underline);
});


/**
 * Pre-deployment list 
 * Review all in-project features that have not been implemented and determine whether they should, 
 * such as creating more complex join statements that put data from users, posts and comments 
 * together with one query 
 * 
 * review the following:
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
 * https://devcenter.heroku.com/articles/deploying-nodejs
 * https://userfront.com/guide/auth/jwt-public-private-keys.html
 * 
 * review any node.js and express.js best practice material on pre-deployment and deployment 
 * create your pre-deployment list of items to take care of from Heroku 
 *  
 * add rsa public and private key for jwt 
 * 
 * update environment variables to be more secure 
 */