/* peak.js core loader */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function server() {
	return;
}

function start() {
	console.log('Peak.js Start');
	var server = require('./server');
	server();
}

server.start = start;

module.exports = server;