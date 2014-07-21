/*
Global App Config
*/

var path			= require('path'),
	rootPath		= path.resolve(__dirname, '../../../'),
	corePath		= path.resolve(rootPath, 'core/'),
	serverPath		= path.resolve(corePath, 'server/'),
	pluginsPath 	= path.resolve(rootPath, 'plugins/');

function paths() {
	return {
		'config': path.join(rootPath, 'config.js'),
		'views': path.join(serverPath, 'views/'),
		'statics': path.join(corePath, 'static/'),
		'server': serverPath,
		'plugins': pluginsPath
	};
}

module.exports = paths;