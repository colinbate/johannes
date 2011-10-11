// 
//  Main Controller (main.js)
//  Johannes
//  
//  Created by Colin Bate on 2011-10-03.
//  Copyright 2011 Colin Bate. All rights reserved.
// 

var Johannes = require('../common.js');
var Page = Johannes.entity('page');

var verifyDB = function (callback) {
	var db = Johannes.db;
	var status = {installed: false, error: false, notFound: false};
	if (typeof (db) === 'undefined') {
		status.notFound = true;
		callback(null, status);
	}
	db.exists(function (err, exists) {
		if (err) {
			console.log('error', err);
			status.error = true;
			callback(err, status);
		}
		if (!exists) {
			console.log('Database does not exist... need installation.');
		}
		status.installed = exists;
		callback(null, status);
	});
};

module.exports = {
	routes: {
		index: '/',
		home:  '/home',
		about: '/_johannes'
	},
	
	index: function (req, res) {
		verifyDB(function (err, status) {
			if (!status.installed) {
				res.render('setup/index.eco', {layout: 'layout.ejs', dbStatus: status, content: Johannes.lang.controller.main, model: Johannes.config});
			} else {
				// Render the homepage
				Page.load('/', function (err, page) {
					if (err) {
						res.render('error', Johannes.errors.pageNotFound);
						return;
					}
					res.render('shell', {page: page, pageId: page.id});
				});
			}
		});
	},
	home: function (req, res) {
		var lang = Johannes.lang;
		Page.load('home', function (err, page) {
			if (err) {
				res.render('error', Johannes.errors.pageNotFound);
				return;
			}
			res.render('shell', {page: page, pageId: page.id});
		});
	},
	about: function (req, res) {
		res.render('johannes');
	}
};