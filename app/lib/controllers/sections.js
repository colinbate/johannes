// 
//  Sections Controller (sections.js)
//  Johannes
//  
//  Created by Colin Bate on 2011-10-08.
//  Copyright 2011 Colin Bate. All rights reserved.
// 

var Johannes = require('../common');
var Section = Johannes.entity('section');

var renderSection = function (id, db, webout, part) {
	part = part || 'body';
	if (!(/p?body|header|markup/.test(part))) {
		part = 'body';
	}
	util.log('Trying to find section: ' + id + ' (part: ' + part +')');
	db.get(id, function (err, res) {
		if (err) {
			if (err.error === 'not_found') {
				webout.send('Could not find section', 404);
				return;
			}
			webout.send('Could not load section: ' + util.inspect(err));
		} else {
			res = tidySection(res);
			if (part === 'pbody') {
				res.pbody = preprocess(res);
			}
			webout.send(res[part] || 'Not found');
		}
	});
};

module.exports = {
	routes: {
		save: {
			url: '/_section/_save',
			method: 'post'
		},
		render: '/_section/:id/:part?'
	},
	save: function (req, res) {
		res.contentType('json');
		var section = {body: req.body.body};
		if (typeof (req.body.header) !== 'undefined') {
			section.header = req.body.header;
		}
		section.markup = req.body.markup || 'markdown';
		if (req.body.token === token) {
			Section.saveSection(req.body.id, section, function (err, result) {
				if (err) {
					res.send({success: false, message: 'Could not save section. LOCALIZE ME.'});
					return;
				}
			});
		} else {
			res.send({success: false, message: 'Could not authenticate save.'});
		}
	},
	render: function (req, res) {
		renderSection('section-' + req.params.id, db, res, req.params.part);
	}
};