var configuration = require('../config')();


var adminControllers = {
	'index': function(req, res, next) {
		res.render('login', {title: configuration.server.site_url});
	}
};


module.exports = adminControllers;