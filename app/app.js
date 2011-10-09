// 
//  app.js
//  Johannes
//  
//  Created by Colin Bate on 2011-10-08.
//  Copyright 2011 Colin Bate. All rights reserved.
// 

// 1. Load common components/configuration
var Johannes = require('./lib/common');
var config = Johannes.config;

// 2. Set up web server (express)
var express = require('express');
var eco = require('eco');
var app = express.createServer();
app.configure(function () {
	app.set('views', __dirname + '/' + config.folders.views);
	app.set('view engine', config.app.viewengine);
	app.register('.eco', eco);
	app.use(express.bodyParser());
	
	app.use(express['static'](__dirname + '/' + config.folders.staticFiles));
	app.set('view options', {
	    open: '{{',
	    close: '}}'
	});
	app.use(Johannes.middleware.isLocalhost);
	app.use(app.router);
	app.use(Johannes.routes.catchAll);
});

// 3. Set up view helpers
var property = require('property');
app.dynamicHelpers ({
	scripts: property.factory(),
	styles: property.factory()
});

app.locals({
	lang: config.language.current,
	attempt: function (field) {
		return '';
	},
	d: function (value, defval) {
		return (typeof (value) !== 'undefined') ? value : defval;
	} 
});

var listen = function (err) {
	if (err) {
		console.log('Error loading controllers');
		process.exit(1);
	}
	console.log('Finished loading controllers');
	
	// Start listening
	app.listen(config.app.port);
	console.log(config.app.name, 'running on port', config.app.port);
};

// 4. Load in controllers
Johannes.controllers.initialize(app, listen);


