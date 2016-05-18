/**
*	@name						jQuery Enter Submit Plugin
*	@descripton					A jQuery plugin to submit a form using enter key on the input fields.
*	@version					1.0.0
*	@requires					jQuery 1.7.2+
*
*	@author						Alexandre Arcanjo de Queiroz
*	@author-email				alexandre.queiroz@live.com
*
*	@license					MIT License - http://www.opensource.org/licenses/mit-license.php
*/
$.fn.extend({
	enter: function(options) {
		this.each(function(index, form) {
			var fields = $(form).find(":input:not(:hidden,:submit,:reset,:button), select, textarea");
			var submitButton = $(form).find(":submit");
			if (fields) {
				$(fields).each(function(index, field) {
					$(field).keypress(function(event) {
						var key = event.keyCode || event.which;
						
						var ENTER = 13;

						if (key == ENTER) {
   							event.preventDefault();
							if (submitButton && submitButton.length > 0) {
								$(form).submit();
							} else {
								if (options) {
   									if (options.buttonId) {
   										var selector = options.buttonId;
   										if (options.buttonId[0] != '#') {
   											selector = '#' + options.buttonId;
   										}
										$(selector).click();
									} else if (options.buttonClass) {
										var selector = options.buttonClass;
										if (options.buttonClass[0] != '.') {
											selector = '.' + options.buttonClass;
										}
										$(selector).click();										
									}									
								}
							}
						}
					})
				});
			}
		})
	}
});
