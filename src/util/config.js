const ENV = require("dotenv").config({
path: require("find-config")(".env")
});
if (ENV.error) throw ENV.error;

module.exports = {
	environment: process.env.NODE_ENV || 'development',
    api: {
        port: 4000,
        basePath: '/v1'
    },
	mongoUri: process.env.PROCESS_ENGINE_API_MONGO_URI || null,
	gitClientId: process.env.REACT_APP_CLIENT_ID,
	gitClientSecret: process.env.REACT_APP_CLIENT_SECRET,
	gitRedirectUri: process.env.REACT_APP_REDIRECT_URI
}; 