// 
//  Installation Controller (setup.js)
//  Johannes
//  
//  Created by Colin Bate on 2011-10-11.
//  Copyright 2011 Colin Bate. All rights reserved.
// 

var Johannes = require('../common');

var loadContent = function (view) {
	var content = Johannes.lang.controller.setup;
	if (typeof (view) !== 'undefined') {
		content = content[view];
	}
	return function (req, res, next) {
		res.local('content', content);
		next();
	};
};

var validateDbInfo = function (info) {
	if (info.port === '') {
		info.port = 5984;
	} else {
		info.port = parseInt(info.port, 10);
	}
	if (info.host === '') {
		info.host = '127.0.0.1';
	}
	if (info.name === '') {
		info.name = 'johannes';
	}
	return info;
};

module.exports = {
	routes: {
		index: {
			url: '/_setup',
			method: 'get',
			middleware: loadContent('index')
		},
		databaseInfo: {
			url: '/_setup/database',
			method: 'post'
		},
		adminUser: {
			url: '/_setup/administrator',
			method: 'post'
		},
		initializeDatabase: {
			url: '/_setup/save',
			method: 'post'
		}
	},
	index: function (req, res) {
		res.render('setup/index.eco', {
			layout: 'layout.ejs',
			dbStatus: req.dbstatus,
			content: Johannes.lang.controller.setup,
			model: Johannes.config
		});
	},
	databaseInfo: function (req, res) {
		if (req.isLocalhost) {
			var info = req.body.db;
			validateDbInfo(info);
			Johannes.config.app.db = info;
			Johannes.saveConfig();
			
			res.send({success: true});
			return;
		}
		res.send({success: false, message: 'Cannot save config remotely'});
	},
	adminUser: function (req, res) {
		
	},
	initializeDatabase: function (req, res) {
		
	}
};
