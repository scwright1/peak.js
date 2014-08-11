var configuration = require('../config')();


var adminControllers = {
	'index': function(req, res, next) {
		res.render('dashboard', {title: configuration.server.site_url});
	},
	'login': function(req, res, next) {
		res.render('login', {title: configuration.server.site_url});
	},
	'validate': function(req, res, next) {
		var post = req.body;
  		if (post.email === '1234' && post.password === '1234') {
    		req.session.user_id = post.email;
    		res.redirect('/admin/');
  		} else {
    		res.redirect('/admin/login');
  		}
	},
	'logout': function(req, res, next) {
		req.session.user_id = null;
  		res.redirect('/admin/login');
	}
};


module.exports = adminControllers;