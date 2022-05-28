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
 * heroku task list:
 * heroku cli installation (via homebrew)
 * specify engines version in package.json 
 * creat a build section in package.json 
 * create and build out a Procfile for heroku to use 
 * - Profile with no extension, such as .txt or .json (no!), contents web: npm start, for example 
 * - add Procile to root 
 * run npm install 
 * run heroku local web 
 * 
 * 
 * review any node.js and express.js best practice material on pre-deployment and deployment 
 * create your pre-deployment list of items to take care of from Heroku 
 *  
 * separate auth from the rest of the services in the project under the same parent directory 
 * have auth run on port 4000 
 * create certs directory and put public and private .pem files there 
 * 
 * add rsa public and private key for jwt 
 * sign token 
 * set token in a cookie 
 * 
 * update environment variables to be more secure 
 */