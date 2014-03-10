var config = {
	development: {
		//url to be used in link generation
		url: 'http://my.peak.io',
		//mongodb connection settings
		database: {
			host:	'127.0.0.1',
			port:	'27017',
			db:		'peak_dev'
		},
		//server details
		server: {
			host: '127.0.0.1',
			port: '3422'
		}
	},
	production: {
		//url to be used in link generation
		url: 'http://my.peak.io',
		//mongodb connection settings
		database: {
			host: '127.0.0.1',
			port: '27017',
			db:		'peak'
		},
		//server details
		server: {
			host:	'127.0.0.1',
			port:	'3421'
		}
	}
};

module.exports = config;