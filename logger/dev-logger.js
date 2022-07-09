const winston = require('winston');
require('winston-daily-rotate-file');
const {combine, timestamp, label, json} = winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: './logger/logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD HH:mm:ss',
  maxFiles: '1d',
});

function devLogger() {
  const devFormat = json(({level, message, label, timestamp, stack }) => {
    return `${timestamp} [${label}] ${level}: ${stack || message}`
  });
  
  return winston.createLogger({
    level: 'http',
    format: combine(
      label({ label: 'dev env log'}), 
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
      winston.format.errors({stack: true}),
      devFormat
    ),
    transports: [new winston.transports.Console({
      level: 'info', 
      format: combine(timestamp(), json())
    }), new winston.transports.Http({
      level: 'warn',
      format: combine(timestamp(), json()),
      host: 'localhost', port:3000
    }),
    fileRotateTransport],
    exceptionHandlers: [
      new winston.transports.File({ filename: './logger/exceptions/exceptions.log' })
    ]
  })
}

module.exports = devLogger;