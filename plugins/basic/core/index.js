/* peak.js core loader */

function plugin() {
	return;
}

function load() {
	boot();
}

function boot() {
	console.log('booting...');
}

function shout() {
	console.log('AAAAAAAH');
}

plugin.boot = boot;
plugin.shout = shout;

module.exports = plugin;