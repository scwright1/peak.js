
var clientControllers = {
	'home': function(req, res, next) {
		res.send(200, {'message': 'Everything is Awesome!'});
	}
};


module.exports = clientControllers;