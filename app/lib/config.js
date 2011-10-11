var fs = require('fs');
var readConfig = function (filename) {
	var config;
	try {
		config = JSON.parse(fs.readFileSync(filename, 'utf8'));
	} catch (e) {
		console.log('Could not parse config file:', filename);
		config = null;
	}
	return config;
};

var parseAppConfig = function (configFile) {
	var config = readConfig(configFile);
	if (!config) {
		console.log('No config means no app for you. Self-destruct.');
		process.exit(1);
	}
	var langfile = __dirname + '/../' + config.folders.languages + '/' + config.language.code + '.json';
	var lang = readConfig(langfile);
	if (!lang) {
		console.log('Check', langfile, '- it did not parse well. Exiting.');
		process.exit(1);
	}
	return {config: config, lang: lang};
};

module.exports = {
	parse: parseAppConfig
};
