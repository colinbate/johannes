(function ($) {
	var $login;
	var $editform = $('#edit-section');
	$editform.closeMe = function () {
		this.hide().prev().show();
	};
	
	var enableEdit = function (token) {
		$editform.find('#edit-token').val(token);
		$('.section').dblclick(function (e) {
			var $editSection = $(e.currentTarget);
			var sid = $editSection.attr('id');
			$editform.find('#edit-id').val(sid);
			$editform.find('#edit-header').val($editSection.find('h2').html());
			var $body = $editform.find('#edit-body');
			$body.val('Loading...');
			
			var sName = sid.replace('section-', '');
			$.ajax('/_section/' + sName, {
				success: function (data) {
					if (data) {
						$body.val(data);
					} else {
						$body.val(':(');
					}
				},
				cache: false,
				dataType: 'html'
			});
			
			if ($editSection.hasClass('html')) {
				$editform.find('#edit-html').attr('checked', 'checked');
			} else {
				$editform.find('#edit-html').removeAttr('checked');
			}
			$editSection.hide();
			//$editform.modal({persist: true});
			$editform.detach().insertAfter($editSection).show();
		});
		$editform.find('.submit-area .save').click(function () {
			$editform.find('form').ajaxSubmit({
				dataType: 'json',
				success: function (data, s, x, $form) {
					var $sect = $('#' + $form.find('#edit-id').val());
					if (data && data.success) {
						var html = $editform.find('#edit-html').is(':checked');
						if (html) {
							$sect.removeClass().addClass('html').addClass('section');
						} else {
							$sect.removeClass().addClass('markdown').addClass('section');
						}
						$sect.find('h2').html($form.find('#edit-header').val());
						$sect.find('.section-body').html(data.renderedBody || $form.find('#edit-body').val());
						$editform.closeMe();
					} else if (data) {
						notify(data.message, 2);
					}
					//$.modal.close();
				}
			});
			return false;
		});
		$editform.find('.submit-area .cancel').click(function () {
			$editform.closeMe();
			return false;
		});
	};
	
	var showLogin = function () {
		$('#login').modal({persist: true});
	};
	
	var notify = function (msg, delay) {
		var _to;
		$.modal('<h2 class="notify">' + msg + '</h2>', {overlayClose: true, onClose: function (d) {
			clearTimeout(_to);
			d.overlay.fadeOut();
			d.container.fadeOut('normal', function () {
				$.modal.close(); // must call this!
			});
		}});
		_to = setTimeout(function () {
			$.modal.close();
		}, delay * 1000);
	};
	
	var listenForEditMode = function (e) {
		if ((e.which === 101 || e.which === 5) && e.ctrlKey) {
			showLogin();
		} else if (e.keyCode === 27 && $editform.is(':visible')) {
			$editform.closeMe();
		}
	};
	
	$(function () {
		$(document).keypress(listenForEditMode);
		$login = $('#login');
		$login.keypress(function (e) {
			if (e.which === 13) {
				$login.find('form').ajaxSubmit({
					clearForm: true,
					success: function (data) {
						if (data && data.success) {
							enableEdit(data.token);
							$.modal.close();
						}
					}
				});
				e.preventDefault();
				e.stopPropagation();
			}
		});
	});
}(jQuery));