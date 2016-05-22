;(function($) {
	"use strict";

	// 支持全屏的浏览器
	function supportFullScreen() {
		var doc = document.documentElement;
		return ('requestFullscreen' in doc) ||
			('mozRequestFullScreen' in doc && document.mozFullScreenEnabled) ||
			('webkitRequestFullScreen' in doc);
	}

	// 请求全屏
	function requestFullScreen(elem) {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullScreen) {
			elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	}

	// 全屏状态
	function fullScreenStatus() {
		return document.fullscreen ||
			document.mozFullScreen ||
			document.webkitIsFullScreen ||
			false;
	}
	// 取消全屏
	function cancelFullScreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}

	// 开启全屏
	function onFullScreenEvent(callback) {
		$(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange", function() {
			callback(fullScreenStatus());
		});
	}

	$.support.fullscreen = supportFullScreen();

	$.fn.fullScreen = function(props) {
		if (!$.support.fullscreen || this.length !== 1) {
			return this;
		}

		if (fullScreenStatus()) {
			// 如果处于全屏则退出
			cancelFullScreen();
			return this;
		}

		var options = $.extend({
				'background': '',
				'callback': $.noop(),
				'fullscreenClass': 'fullScreen'
			}, props),

			elem = this,

			fs = $('<div>', {
				'css': {
					'overflow-y': 'auto',
					'background': options.background,
					'width': '100%',
					'height': '100%'
				}
			}).insertBefore(elem).append(elem);

		// 添加全屏样式
		elem.addClass(options.fullscreenClass);

		requestFullScreen(fs.get(0));

		fs.click(function(e) {
			if (e.target == this) {
				cancelFullScreen();
			}
		});

		elem.cancel = function() {
			cancelFullScreen();
			return elem;
		};
		onFullScreenEvent(function(fullScreen) {
			if (!fullScreen) {
				$(document).off('fullscreenchange mozfullscreenchange webkitfullscreenchange');
				// 移除样式
				elem.removeClass(options.fullscreenClass).insertBefore(fs);
				fs.remove();
			}

			if (options.callback) {
				options.callback(fullScreen);
			}
		});
		return elem;
	};
	$.fn.cancelFullScreen = function() {
		cancelFullScreen();
		return this;
	};
}(jQuery));