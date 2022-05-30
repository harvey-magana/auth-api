require('dotenv').config();

const server = require('./api/server');

server.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`\n *** Server is listening on http://${process.env.HOST}:${process.env.PORT}`.black.bgYellow.underline);
});


/**
 * Pre-deployment list 
 *   
 * fix users changing passwords, it does not function correctly, consider password reset:
 *  https://dev.to/cyberwolve/how-to-implement-password-reset-via-email-in-node-js-132m
 * 
 * review the following:
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
 * https://expressjs.com/en/advanced/best-practice-performance.html
 * https://expressjs.com/en/advanced/best-practice-security.html
 * https://devcenter.heroku.com/articles/deploying-nodejs
 * https://userfront.com/guide/auth/jwt-public-private-keys.html
 * 
 * heroku task list:
 *
 * specify engines version in package.json 
 * heroku create 
 * git push heroku master 
 * heroku open 
 * set NODE_ENV to production: heroku config:set NODE_ENV='production'
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
 * 20220529909am
 * password
 * 
 * sign token 
 * set token in a cookie 
 * 
 * update environment variables to be more secure 
 */