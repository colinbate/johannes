// 
//  Common dependencies (common.js)
//  Johannes
//  
//  Created by Colin Bate on 2011-10-09.
//  Copyright 2011 Colin Bate. All rights reserved.
// 

// If the config file moves from the root of the application, this needs to be changed.
var configPath = __dirname + '/../config.json';
// --------- NOTHING SHOULD NEED TO CHANGE BELOW THIS -----------------

var cradle = require('cradle');
var configLoader = require('./config');
var fs = require('fs');

var isLocalhost = function (req, res, next) {
	req.isLocalhost = (req.client.remoteAddress === '127.0.0.1');
	res.local('isLocalhost', req.isLocalhost);
	next();
};

var saveConfig = function () {
	var cfg = this.config;
	if (typeof (cfg) !== 'undefined') {
		var cfgStr = JSON.stringify(cfg);
		fs.writeFileSync(configPath, cfgStr);
	}
};

var Common = (function () {
	console.log('Initializing common Johannes components');
	var cfg = configLoader.parse(configPath);
	var config = cfg.config;
	var lang = cfg.lang;
	var db = new(cradle.Connection)(config.app.db.host, config.app.db.port).database(config.app.db.name);
	var entityLoader = function (name) {
		return require('./entities/' + name);
	};
	// Handles all the requests which aren't handled by controllers (i.e. most of the content from the db)
	var notFound = function (req, res) {
		res.render('error', {status: 404, message: lang.entity.page.error.load.message, title: lang.entity.page.error.load.title});
	};
	return {
		config: config,
		db: db,
		lang: lang,
		controllers: require('./controller-loader'),
		entity: entityLoader,
		routes: {
			catchAll: notFound
		},
		errors: {
			pageNotFound: {status: 404, message: lang.entity.page.error.load.message, title: lang.entity.page.error.load.title}
		},
		middleware: {
			isLocalhost: isLocalhost
		},
		saveConfig: saveConfig
	};
}());

module.exports = Common;