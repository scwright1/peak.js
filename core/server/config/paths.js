/*
Global App Config
*/

var path			= require('path'),
	rootPath		= path.resolve(__dirname, '../../../'),
	corePath		= path.resolve(rootPath, 'core/'),
	serverPath		= path.resolve(corePath, 'server/'),
	clientPath		= path.resolve(corePath, 'client/');

function paths() {
	return {
		'config': path.join(rootPath, 'config.js'),
		'views': path.join(clientPath, 'views/'),
		'client': clientPath,
		'server': serverPath
	};
}

module.exports = paths;