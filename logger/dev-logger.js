const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf} = format;

function devLogger() {
  const devFormat = printf(({level, message, label, timestamp, stack }) => {
    return `${timestamp} [${label}] ${level}: ${stack || message}`
  });
  
  return createLogger({
    format: combine(
      label({ label: 'dev env log'}), 
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
      format.errors({stack: true}),
      devFormat
    ),
    transports: [new transports.Console(), new transports.Http()]
  })
}

// 6. set level to 'info' 
// 7. set it up to handle exceptions 

module.exports = devLogger;