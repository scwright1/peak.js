/* peak.io core loader */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


function start() {
	console.log('Peak.io Start');
	var server = require('./server');
	server();
}

module.exports = start;