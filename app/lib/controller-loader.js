// 
//  Controller Loading (route-master.js)
//  Johannes
//  
//  Created by Colin Bate on 2011-10-03.
//  Copyright 2011 Colin Bate. All rights reserved.
// 
var fs = require('fs');
var path = require('path');
var allowedVerbs = /^get|post|put|delete$/;

var loadController = function (file, server) {
	var app = server;
	var controller = require('./controllers/' + file);
	var routes = controller.routes;
	var thisAction, meth, url, middleware;

	Object.keys(controller).map(function(action){
		var fn = controller[action];
		if (typeof(fn) === 'function') {
			thisAction = routes[action];
			if (thisAction) {
				if (typeof (thisAction) === 'string') {
					url = thisAction;
					meth = 'get';
				} else {
					url = thisAction.url;
					meth = thisAction.method.toLowerCase() || 'get';
					middleware = thisAction.middleware;
				}
				if (typeof (middleware) === 'function') {
					app[meth](url, middleware, function (req, res) {
						fn.apply(controller, [req, res]);
					});
				} else {
					app[meth](url, function (req, res) {
						fn.apply(controller, [req, res]);
					});
				}
				console.log('initialized', meth, url);
			} else {
				console.log('WARNING: no mapping for', action, 'defined');
			}
		}
	});
	
	return controller;
};

var parseControllers = function (server, callback) {
	var currentControllers = {};
	fs.readdir(__dirname + '/controllers', function (err, files) {
		if (err) {
			callback(err);
			return;
		}
		files.forEach(function(file){
			console.log('loading controller ' + file);
			var basename = path.basename(file, '.js');
			currentControllers[basename] = loadController(file, server);
		});
		callback(null, currentControllers);
	});
};

module.exports = {
	current: {},
	initialize: function (server, callback) {
		var isCallback = (typeof (callback) === 'function');
		parseControllers(server, function (err, controllers) {
			if (err) {
				if (isCallback) {
					callback(err);
				}
				return;
			}
			if (isCallback) {
				callback(null, controllers);
			}
		});
	}
};