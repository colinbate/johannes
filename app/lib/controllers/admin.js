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

module.exports = {
	routes: {
		administer: {
			url: '/_admin',
			method: 'get',
			middleware: loadContent
		},
		saveConfig: {
			url: '/_config/save',
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
	saveConfig: function (req, res) {
		if (req.isLocalhost) {
			var sitename = req.body.sitename;
			if (sitename !== '') {
				Johannes.config.app.name = sitename;
				Johannes.saveConfig();
				res.send({success: true});
			}
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