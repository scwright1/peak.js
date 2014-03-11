/* server loader */

var express		= require('express'),
	hbs			= require('hbs'),
	config		= require('./config'),
	routes		= require('./routes');

function boot(server) {
	config.load();
	//set the view engine
	server.set('view engine', 'hbs');
	//set where we serve server renders from
	server.set('views', config.paths().views);
	//set where we serve static webpage content from
	server.use(express.static(config.paths().client));
	//set up the router
	routes.client(server);
	routes.admin(server);
	//start the server
	server.listen(config().server.port, function() {
		console.log('Listening on port '+config().server.port);
	});
}

function init() {
	var server = express();
	boot(server);
}

module.exports = init;