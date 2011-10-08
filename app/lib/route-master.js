// 
//  route-master.js
//  Johannes
//  
//  Created by Colin Bate on 2011-10-03.
//  Copyright 2011 Colin Bate. All rights reserved.
// 
var fs = require('fs');
var allowedVerbs = /^get|post|put|delete$/;

var loadController = function (file, server, context) {
	var app = server;
	var controller = require('./controllers/' + file);
	var routes = controller.routes;
	var deps = controller.dependencies;
	var thisAction, meth, url;
	
	if (typeof (deps) !== 'undefined') {
		var dk = Object.keys(deps);
		for (var key in dk) {
			if (typeof (context[dk[key]]) !== 'undefined') {
				deps[dk[key]] = context[dk[key]];
			}
		}
	}

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
				}
				app[meth](url, function (req, res) {
					fn.apply(controller, [req, res]);
				});
				console.log('initialized', meth, url);
			} else {
				console.log('WARNING: no mapping for', action, 'defined');
			}
		}
	});
};

var parseControllers = function (server, context) {
	fs.readdir(__dirname + '/controllers', function (err, files) {
		if (err) throw err;
		files.forEach(function(file){
			console.log('loading controller ' + file);
			loadController(file, server, context);
		});
	});
};

module.exports = {
	initialize: function (server, context) {
		parseControllers(server, context);
	}
};