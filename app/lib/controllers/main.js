// 
//  Main Controller (main.js)
//  Johannes
//  
//  Created by Colin Bate on 2011-10-03.
//  Copyright 2011 Colin Bate. All rights reserved.
// 


module.exports = {
	routes: {
		home: '/',
		test: '/test'
	},
	dependencies: {
		Page: undefined,
		someVar: 'default value'
	},
	
	home: function (req, res) {
		res.render('index');
		//this.dependencies.Page.load('home', function (err, page) {
		//			if (err) {
		//				res.render('error', {message: config.language.current.entity.page.error.load});
		//				return;
		//			}
		//			res.render('shell', {page: page, pageId: page.id});
		//		});
	},
	
	test: function (req, res) {
		res.send('Test output for Colin: ' + this.dependencies.someVar);
	}
};