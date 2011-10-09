// 
//  Main Controller (main.js)
//  Johannes
//  
//  Created by Colin Bate on 2011-10-03.
//  Copyright 2011 Colin Bate. All rights reserved.
// 

var Johannes = require('../common.js');
var Page = Johannes.entity('page');

module.exports = {
	routes: {
		index: '/',
		home: '/home',
		test: '/test'
	},
	
	index: function (req, res) {
		res.render('index');
	},
	home: function (req, res) {
		var lang = Johannes.lang;
		Page.load('home', function (err, page) {
			if (err) {
				res.render('error', {status: 404, message: lang.entity.page.error.load.message, title: lang.entity.page.error.load.title});
				return;
			}
			res.render('shell', {page: page, pageId: page.id});
		});
	}

};