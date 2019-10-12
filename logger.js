import path from 'path';

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, simple } = format;

const options = {
    infoFile: {
        filename: path.join(__dirname, 'logs', 'all-logs.log'),
        format: combine(timestamp(), simple()),
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false
    },
    errorFile: {
        level: 'error',
        filename: path.join(__dirname, 'logs', 'errors.log'),
        format: combine(timestamp(), prettyPrint()),
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true
    }
}

const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new transports.File(options.infoFile),
        new transports.File(options.errorFile)
    ],
    exitOnError: false
});

export default ({
    error: err => {
        logger.error(err);
    },
    warn: err => {
        logger.warn(err);
    },
    info: err => {
        logger.info(err);
    },
    debug: err => {
        logger.debug(err);
    }
});