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

var isLocalhost = function (req, res, next) {
	req.isLocalhost = (req.client.remoteAddress === '127.0.0.1');
	res.local('isLocalhost', req.isLocalhost);
	next();
};

var Common = (function () {
	console.log('Initializing common Johannes components');
	var config = configLoader.parse(configPath);
	var lang = config.language.current;
	var db = new(cradle.Connection)().database(config.app.db);
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
		}
	};
}());

module.exports = Common;