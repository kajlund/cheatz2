const path = require('path')

const { createLogger, format, transports } = require('winston')
// https://github.com/winstonjs/winston-daily-rotate-file#readme
const DailyRotateFile = require('winston-daily-rotate-file')

const { combine, errors, printf, json, label, metadata, splat, timestamp, colorize } = format
// See https://github.com/winstonjs/logform
const logFormat = printf((info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

const logger = createLogger({
  exitOnError: false,
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    label({ label: path.basename(__filename) }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Format the metadata object
    splat(),
    metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    errors({ stack: true })
  ),
  transports: [
    new transports.Console({
      format: combine(colorize({ all: true }), logFormat),
    }),
    // https://github.com/winstonjs/winston-daily-rotate-file
    new DailyRotateFile({
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs',
      maxFiles: '30d',
      format: combine(json()),
    }),
  ],
})

module.exports = logger
