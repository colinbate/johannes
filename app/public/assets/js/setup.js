(function () {
	var $ = jQuery;
	
	var dbInfoHandler = function (data, status, xhr) {
		if (data && data.success) {
			$('form#db-info-form').fadeOut(function () {
				$('#newuser').fadeIn();
			});
		}
	};
	
	var newUserHandler = function (data, status, xhr) {
		
	};
	
	// Initialize with DOM.
	$(function () {
		$('form#db-info-form').ajaxForm(dbInfoHandler);
		$('form#new-user-form').ajaxForm(newUserHandler);
	});
}());