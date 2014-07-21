/* server loader */

var express		= require('express'),
	hbs			= require('hbs'),
	config		= require('./config'),
	routes		= require('./routes'),
	console 	= require('buggr'),
	fs			= require('fs'),
	path		= require('path'),
	async		= require('async'),
	configuration,
	dev = true;

function boot(server) {
	console.log('Bringing up System...Stand By...');
	//load uncaughtExceptions fallback
	catchExceptions();
	//set the view engine
	//force the server to load synchronously
	//execute callback() once the function is complete to allow the processing to move on
	async.series([
		//1 - configure express
		function(callback) {
			configServer(server, callback);
		},
		//3 - configure passport
	//	function(callback) {
	//		configAuth(server, callback);
	//	},

		function(callback) {
			config.loadPlugins(callback);
		},
		//3 - configure routes
		function(callback) {
			loadRoutes(server, callback);
			console.log(config.plugins());
		},
		//4 - configure internal error handler
		function(callback) {
			configErrorHandler(server, callback);
		},
		//5 - start the server
		function(callback) {
			console.info('Finished configuring Server.');
			console.warn('Completing Server Boot');
			try {
				server.listen(configuration.server.port, function() {
					if(dev)console.success('✓ OK Boot');
					printServerInfo();
					console.info('Server started successfully');
					//done with this load...next
					callback();
				});
			} catch(e) {
				console.assert('Well...something went badly wrong.  Looks like:', e);
			}
		}
	],
	function(err, results) {
		if(err) {
			console.assert(err);
		}
	});
}


/**
 * [catchExceptions - fallback exception handling for error 500 on server]
 * @return {assert} [return assert and exit]
 */
function catchExceptions() {
	//Process uncaught exceptions (crude but catches the ones that slip through)
	process.on('uncaughtException', function(err, req, res, next) {
		console.error('Unhandled Exception');
		if(dev) {
			return console.assert(err);
		} else {
			var d = new Date().toISOString();
			var e_file = path.join(config.paths().logs, 'server_UE_'+d+'.log');
			fs.writeFile(e_file, err.stack, function(e) {
				if(e) {
					//if we can't write to the file in production mode we're kind of buggered for debug, but lets write out to console anyway
					console.error('✗ Failed to write assertion to file, dumping to screen.')
					console.warn('Failed to write because', e);
					return console.assert(err);
				} else {
					console.emphasis('Stack flushed to persistent storage.  Shutting down');
					return console.assert(err);
				}
			});
		}
	});
}


/**
 * [configServer description]
 * @param  {Function} callback [callback to async load]
 * @param {Object} server [the server object]
 * @return {callback}            [callback to async load]
 */
function configServer(server, callback) {
	try {
		console.warn('Configuring Server');
		server.use(express.static(config.paths().statics));
		server.set('view engine', 'hbs');
		hbs.localsAsTemplateData(server);
		//set where we serve server renders from
		server.set('views', config.paths().views);
		if(dev) server.use(require('morgan')('dev'));
		//body-parser as a global deprecated, need to specify parsers individually
		server.use(require('body-parser').urlencoded({extended: true}));
		server.use(require('body-parser').json());
		server.use(require('method-override')());
		//not convinced we need this
		server.use(require('cookie-parser')('qL17C8iQnxPuDg50mYFDk56sdR0KuUm3'));
		if(dev) console.success('✓ OK Express.use');
		return callback();
	} catch(e) {
		console.assert('Error in configServer', e);
	}
}


/**
 * Load router
 * @param  {Object}   server   Contains server instance
 * @param  {Function} callback Callback to async load
 * @return {Function}            Callback to async load
 */
function loadRoutes(server, callback) {
	try {
		console.warn('Starting router');
		require('./routes')(server);
		server.use(function(req, res, next) {
			res.status(404);
			res.render('404', {status: 404, url: req.url});
		});
		return callback();
	} catch(e) {
		console.assert('Failed to start router:', e);
	}
}

/**
 * load ErrorHandler (internal server errors)
 * @param  {Object}   server   Contains server instance
 * @param  {Function} callback
 */
function configErrorHandler(server, callback) {
	try {
		server.use(function(err, req, res, next) {
			if(!err) return next();
			//do something more user friendly with the error messages and stacktrace
			res.statusCode = 500;
			res.render('500', {message: err.message});
		});
		return callback();
	} catch (e) {
		console.assert(e);
	}
}


/**
 * prints out the server information for debugging
 */
function printServerInfo() {
	console.info('Server Details:');
	console.info();
	console.info('Server: ',configuration.url);
	console.info('Port:   ',configuration.server.port);
	console.info();
}


function init() {
	configuration = config();
	if(configuration.mode === 'production') {
		dev = false;
	} else {
		console.log();
		console.warn('Starting in Development Mode');
		console.log();
	}
	var server = express();

	boot(server);
}

module.exports = init;