var tidySection = function (section) {
	section.id = section._id;
	section.markup = section.markup || 'html';
	return section;
};

var renderPageSections = function (sections) {
	var realSections = [];
	for (var i = 0; i < sections.length; i += 1) {
		var s = sections[i].doc;
		realSections.push(tidySection(s));
	}
	return realSections;
};

var saveSection = function (db, webout, sectionId, header, body, markup) {
	
};

module.exports = {
	db: undefined,
	load: function (sectionName, callback) {
		
	},
	find: function (sections, callback) {
		if (typeof (callback) !== 'function') {
			return;
		}
		if (sections) {
			this.db.get(sections, function (err, res) {
				if (err) {
					callback(err);
					return;
				}
				callback(null, renderPageSections(res));
			});
		}
	},
	render: function (section) {
		if (section && section.markup === 'markdown') {
			section.body = markdown.toHTML(section.body);
		}
		return section;
	},
	save: function (id, section, callback) {
		this.db.merge(id, section, function (err, res) {
			
			if (err) {
				webout.send({success: false, message: 'Could not save the section ' + sectionId});
			} else {
				util.log('Saved section ' + res.id);
				webout.send({success: true, renderedBody: preprocess(section)});
			}
		});
	}
};