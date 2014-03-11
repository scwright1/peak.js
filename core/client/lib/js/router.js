define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "home",
			"admin": "showAdmin",
			"*actions": "defaultAction"
		}
	});

	var initialize = function() {
		var router = new AppRouter();
		router.on('route:home', function() {
			console.log('Home view via client');
		});

		router.on('route:showAdmin', function() {
			//render admin view
			console.log('Admin view via client');
		});

		router.on('defaultAction', function(actions) {
			console.log('No Route: ', actions);
		});
		Backbone.history.start();
	};
	return {
		initialize: initialize
	};
});