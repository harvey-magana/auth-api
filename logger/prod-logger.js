const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, errors, json} = format;

function prodLogger() {
  return createLogger({
    format: combine(label({ label: 'test winston'}), timestamp(), errors({stack: true}), json()),
    transports: [new transports.Console(), new transports.Http()]
  })
}

module.exports = prodLogger;