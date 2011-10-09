var Johannes = require('../common');
var Section = Johannes.entity('section');

var loadPage = function (pageName, db, webout) {
	pageName = 'page-' + pageName;
	try {
		db.get(pageName, function (err, res) {
			if (err) {
				webout.send("<h1>Error fetching page</h1>");
			} else {
				loadSections(res, db, webout);
			}
		});
	} catch (e) {
		console.log('Error accessing database: ' + util.inspect(e));
	}
};

var renderPage = function (page, callback) {
	Section.find(page.sections, function(err, res) {
		if (err) {
			callback(err);
			return;
		}
		page.sections = res;
		callback(null, page);
	});
};

module.exports = {
	load: function(pageName, callback) {
		pageName = 'page-' + pageName;
		Johannes.db.get(pageName, function (err, res) {
			if (err) {
				callback(err);
				return;
			}
			renderPage(res, callback);
		});
	}
};