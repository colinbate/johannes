// 
//  Admin Controller (admin.js)
//  Johannes
//  
//  Created by Colin Bate on 2011-10-03.
//  Copyright 2011 Colin Bate. All rights reserved.
// 

var Johannes = require('../common');
var hash = require('hash');

var loadContent = function (req, res, next) {
	res.local('content', Johannes.lang.controller.admin);
	next();
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
		administer: {
			url: '/_admin',
			method: 'get',
			middleware: loadContent
		},
		saveDbInfo: {
			url: '/_admin/db/save',
			method: 'post'
		},
		auth: {
			url: '/_auth',
			method: 'post'
		},
		hash: '/_hash'
	},
	administer: function (req, res) {
		res.render('admin/index');
	},
	saveDbInfo: function (req, res) {
		if (req.isLocalhost) {
			var info = {
				host: req.body.db_host,
				port: req.body.db_port,
				name: req.body.db_name
			};
			validateDbInfo(info);
			Johannes.config.app.db.host = info.host;
			Johannes.config.app.db.port = info.port;
			Johannes.config.app.db.name = info.name;
			Johannes.saveConfig();
			
			res.send({success: true});
			return;
		}
		res.send({success: false, message: 'Cannot save config remotely'});
	},
	auth: function (req, res) {
		res.contentType('json');
		res.send({success: false});
	},
	hash: function (req, res) {
		res.send(hash.random());
	}
};