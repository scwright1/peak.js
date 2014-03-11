var client = require('../controllers/admin');

module.exports = function(server) {
	server.get('/admin', admin.home);
};