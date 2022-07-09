require('dotenv').config();

const server = require('./api/server');
const logger = require('./logger');

logger.info('info log')
logger.warn('warn log')
logger.error('error log');
logger.http('http log');

server.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`\n *** Server is listening on http://${process.env.HOST}:${process.env.PORT}`.black.bgYellow.underline);
});


/**
 * Pre-deployment list 
 *   https://medium.com/geekculture/deploy-node-application-and-postgresql-database-to-heroku-6efaa6be3b9b
 * fix users changing passwords, it does not function correctly, consider password reset:
 *  https://dev.to/cyberwolve/how-to-implement-password-reset-via-email-in-node-js-132m
 * 
 * review the following:
 * https://devcenter.heroku.com/articles/getting-started-with-nodejs (review this!)
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
 * https://devcenter.heroku.com/articles/deploying-nodejs
 * https://userfront.com/guide/auth/jwt-public-private-keys.html
 * 
 * heroku task list:
 * 
 * 
 * performance: https://expressjs.com/en/advanced/best-practice-performance.html
 * 
 * npm debug
 * api restarts if it stops for any reason (nodemon?) (kind of..., nodemon is for development and pm2 is the same thing for production)
 * process manager: pm2 or npm forever, https://flaviocopes.com/pm2/, 
 * init system: systemd or upstart (look up launchd and launchctl for mac)
 * load balancer (consider nginx or express.js custom method)
 * cache request results 
 * 
 * security: https://expressjs.com/en/advanced/best-practice-security.html
 * audit dependencies 
 * tls (nginx)
 * npm helmet, maximize use and configuration
 * session cookies 
 * npm node-rate-limiter-flexible
 * npm snyk 
 * npm csurf (session middleware must be set up before implementing this)
 * sqlmap (brew install sqlmap)
 * nmap (brew install nmap)
 * SSLyze (brew install SSLyze)
 * reduce fingerprinting
 * 
 * 20220529909am
 * password
 * 
 * sign token 
 * set token in a cookie 
 * 
 * update environment variables to be more secure 
 */