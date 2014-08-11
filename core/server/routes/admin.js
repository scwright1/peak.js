var admin = require('../controllers/admin');

module.exports = function(server) {
	// redirect to /ghost and let that do the authentication to prevent redirects to /ghost//admin etc.
    server.get(/\/((dashboard|signin|dash)\/?)$/, function (req, res) {
        /*jslint unparam:true*/
        res.redirect('/admin/');
    });
    server.get('/admin/', admin.index);
    server.get('/admin/login', admin.login);
    server.post('/admin/validate', admin.validate);
    server.get('/admin/logout', admin.logout);
};