/* load config */

var paths = require('./paths'),
	loader = require('./loader'),
	configuration;

function config() {
	return configuration;
}

function load() {
	//do the loading work here
	return loader().then(function(config) {
		configuration = config;
	});
}

config.paths = paths;
config.load = load;

module.exports = config;
