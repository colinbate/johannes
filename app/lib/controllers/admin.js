// 
//  Admin Controller (admin.js)
//  Johannes
//  
//  Created by Colin Bate on 2011-10-03.
//  Copyright 2011 Colin Bate. All rights reserved.
// 

var hash = require('hash');

module.exports = {
	routes: {
		auth: {
			url: '/_auth',
			method: 'post'
		},
		hash: '/_hash'
	},
	auth: function (req, res) {
		res.contentType('json');
		res.send({success: false});
	},
	hash: function (req, res) {
		res.send(hash.random());
	}
};