require('dotenv').config();

const server = require('./api/server');

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
 * npm compression 
 * reverse proxy (nginx)
 * logging (npm winston or npm bunyan)
 * npm debug 
 * exceptions handling 
 * api restarts if it stops for any reason
 * process manager: pm2 or npm forever 
 * init system: systemd or upstart
 * cache request results 
 * load balancer 
 * 
 * security: https://expressjs.com/en/advanced/best-practice-security.html
 * audit dependencies 
 * tls 
 * npm helmet, maximize use and configuration
 * reduce fingerprinting
 * session cookies 
 * npm node-rate-limiter-flexible
 * npm snyk 
 * npm csurf 
 * sqlmap 
 * nmap 
 * SSLyze
 * 
 * 20220529909am
 * password
 * 
 * sign token 
 * set token in a cookie 
 * 
 * update environment variables to be more secure 
 */