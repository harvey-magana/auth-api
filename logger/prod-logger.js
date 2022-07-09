const winston = require('winston');
const {combine, timestamp, label, errors, json} = winston.format;

function prodLogger() {
  return winston.createLogger({
    format: combine(label({ label: 'prod env log'}), timestamp(), errors({stack: true}), json()),
    transports: [new winston.transports.Console({
      level: 'info', 
      format: combine(timestamp(), json())
    }), new winston.transports.Http({
      level: 'warn',
      format: combine(timestamp(), json())
    })]
  })
}

module.exports = prodLogger;