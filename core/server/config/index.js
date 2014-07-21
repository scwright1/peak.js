/* load config */

var paths = require('./paths'),
	loader = require('./loader'),
	console = require('buggr'),
	fs = require('fs'),
	configuration,
	pluginList = [];

function config() {
	return configuration;
}

function loadPlugins(callback) {
	var pluginDir = paths().plugins;
	fs.readdir(pluginDir, function(err, list) {
		if(err) {
			console.assert('Failed to load plugins');
			return callback();
		} else {
			list.forEach(function(item, i) {
				fs.open(pluginDir+'/'+item+'/index.js', 'r', function(err, fd) {
					if(err) {
						return console.warn('Skipping plugin:', item);
					} else {
						fs.close(fd);
						pluginList[i] = require(pluginDir+'/'+item)();
					}
				});
			});
			return callback();
		}
	});
}

function plugins() {
	return pluginList;
}

function load() {
	//do the loading work here
	return loader().then(function(config) {
		configuration = config;
	});
}

config.paths = paths;
config.load = load;
config.loadPlugins = loadPlugins;
config.plugins = plugins;

module.exports = config;
