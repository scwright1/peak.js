var client = require('../controllers/client');

module.exports = function(server) {
	server.get('/', client.home);
};