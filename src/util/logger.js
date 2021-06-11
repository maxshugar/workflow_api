const winston = require('winston');
const winstonPapertrail = require('winston-papertrail');

const config = require('./config');

let logger;

if (config.environment == 'development') {
	logger = console;
} else {
	const papertrailTransport = new winston.transports.Papertrail({
		host: config.logger.host,
		port: config.logger.port,
	});

	logger = new winston.Logger({
		transports: [papertrailTransport],
	});
}

module.exports = logger;  