require('dotenv').config();

const server = require('./api/server');

server.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`\n *** Server is listening on http://${process.env.HOST}:${process.env.PORT}`.black.bgYellow.underline);
});


/**
 * Pre-deployment list 
 *   
 * fix users changing passwords, it does not function correctly 
 *  
 * 
 * review the following:
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
 * https://devcenter.heroku.com/articles/deploying-nodejs
 * https://userfront.com/guide/auth/jwt-public-private-keys.html
 * 
 * heroku task list:
 * 
 * specify engines version in package.json 
 * set NODE_ENV to production 
 * consider adding npm debug for logging 
 * remove any error reporting that could compromise your production app 
 * consider adding npm compression to reduce load time 
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
 *  
 * 
 * 
 * 
 * 
 * sign token 
 * set token in a cookie 
 * 
 * update environment variables to be more secure 
 */