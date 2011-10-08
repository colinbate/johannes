// 
//  loader.js
//  Johannes
//  
//  Created by Colin Bate on 2011-10-03.
//  Copyright 2011 Colin Bate. All rights reserved.
// 

module.exports = {
	area: undefined,
	linkroll: undefined,
	page: undefined,
	role: undefined,
	section: undefined,
	user: undefined,
	
	load: function (context) {
		this.page = require('./entities/page');
		this.page.db = context.db;
		
		this.section = require('./entities/section');
		this.section.db = context.db;
		
		return this;
	}
};