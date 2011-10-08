// 
//  app.js
//  Johannes
//  
//  Created by Colin Bate on 2011-10-08.
//  Copyright 2011 Colin Bate. All rights reserved.
// 

var util = require('util');
var markdown = require('markdown');
var property = require('property');

// 1. Load configuration
var config = require('./lib/config').parse(__dirname + '/config.json');

// 2. Set up web server (express)
var express = require('express');
var app = express.createServer();
app.configure(function () {
	app.set('views', __dirname + '/' + config.folders.views);
	app.set('view engine', config.app.viewengine);
	app.use(express.bodyParser());
	
	app.use(express['static'](__dirname + '/' + config.folders.staticFiles));
	app.set('view options', {
	    open: '{{',
	    close: '}}'
	});
});
app.dynamicHelpers ({
	scripts: property.factory(),
	styles: property.factory()
});

app.locals({
	lang: config.language.current
});

// 3. Connect to database (CouchDB)
var cradle = require('cradle');
var db = new(cradle.Connection)().database(config.app.db);

// 4. Setup entities
var entities = require('./lib/loader').load({db: db});

// 5. Load in controllers
var routeMaster = require('./lib/route-master');
routeMaster.initialize(app, {Page: entities.page, someVar: 'adhoc value'});

// 6. Start listening
app.listen(config.app.port);
console.log(config.app.name, 'running on port', config.app.port);
