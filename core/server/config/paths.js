/*
Global App Config
*/

var path			= require('path'),
	root			= path.resolve(__dirname, '../../../');

function paths() {
	return {
		'config': path.join(root, 'config.js')
	};
}

module.exports = paths;