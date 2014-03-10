/* server loader */

var express		= require('express');

function boot(server) {
	server.listen(3000, function() {
		console.log('Server started');
	});
}

function init() {
	var server = express();
	boot(server);
}

module.exports = init;