/* server loader */

var express		= require('express'),
	config		= require('./config'),
	routes		= require('./routes');

function boot(server) {
	config.load();
	routes.client(server);
	server.listen(config().server.port, function() {
		console.log('Listening on port '+config().server.port);
	});
}

function init() {
	var server = express();
	boot(server);
}

module.exports = init;