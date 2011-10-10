(function () {
	var $ = jQuery;
	
	var genericFormHandler = function (data, status, xhr) {
		if (data && data.success) {
			alert('Success!');
		} else {
			alert(':(');
		}
	};
	
	// Initialize with DOM.
	$(function () {
		$('form').ajaxForm(genericFormHandler);
	});
}());