require('dotenv').config();
const devLogger = require('./dev-logger');
const prodLogger = require('./prod-logger');

let logger = null;
if (process.env.NODE_ENV === 'development') {
  logger = devLogger();
} else {
  logger = prodLogger();
}

module.exports = logger;