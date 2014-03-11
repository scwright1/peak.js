/* server loader */

var express		= require('express'),
	hbs			= require('hbs'),
	config		= require('./config'),
	routes		= require('./routes');

function boot(server) {
	config.load();
	server.set('view engine', 'hbs');
	server.set('views', config.paths().views);
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