/*
Global App Config
*/

var path			= require('path'),
	rootPath		= path.resolve(__dirname, '../../../'),
	corePath		= path.resolve(rootPath, 'core/'),
	serverPath		= path.resolve(corePath, 'server/');

function paths() {
	return {
		'config': path.join(rootPath, 'config.js'),
		'views': path.join(serverPath, 'views/'),
		'statics': path.join(corePath, 'static/'),
		'server': serverPath
	};
}

module.exports = paths;