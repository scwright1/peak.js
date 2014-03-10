/* load config */

var paths = require('./paths'),
	env = process.env.NODE_ENV || 'development',
	pConfig;

function config() {
	return pConfig;
}

function load() {
	var configFile = paths().config;
	pConfig = require(configFile)[env];
	return pConfig;
}

config.paths = paths;
config.load = load;

module.exports = config;
