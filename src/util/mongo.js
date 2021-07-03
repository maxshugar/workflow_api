const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const { mongoUri, environment } = config;

if(mongoUri === null)
	return logger.error('Missing mongo uri environment variable. Log into atlas to retrieve connection string :)');

mongoose.Promise = global.Promise;

const connection = mongoose.connect(mongoUri, { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

connection
	.then(db => {
		logger.info(`Successfully connected to MongoDB cluster in ${environment} mode.`);
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			logger.info('Attempting to re-establish database connection.');
			mongoose.connect(mongoConnStr);
		} else {
			logger.error('Error while attempting to connect to database:');
			logger.error(err);
		}
	});

module.exports = connection;