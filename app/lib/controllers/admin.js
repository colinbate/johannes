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
		auth: {
			url: '/_auth',
			method: 'post'
		},
		hash: '/_hash'
	},
	administer: function (req, res) {
		res.render('admin/index');
	},
	auth: function (req, res) {
		res.contentType('json');
		res.send({success: false});
	},
	hash: function (req, res) {
		res.send(hash.random());
	}
};