/**
 * 插件开发入门http://www.css88.com/archives/4821
 */

(function ($) {
 
    var methods = {
        init: function (options) {
            // this
            console.log("%cmytooltip init","color:green;font-size:30px;");
            return this.each(function () {
//              $(window).bind('resize.tooltip', methods.reposition);
				var $this = $(this),
                data = $this.data('tooltip'),
                tooltip = $('<div />', {
                    text: $this.attr('title')
                });
                // If the plugin hasn't been initialized yet
                if (!data) {
                    /*
                     Do more setup stuff here
                     */
                    $(this).data('tooltip', {
                        target: $this,
                        tooltip: tooltip
                    });
                }
            });
        },
        show: function () {
            // is
            console.log("%cmytooltip show","color:blue;font-size:30px;");
        },
        hide: function () {
            // good
            console.log("%cmytooltip hide","color:gray;font-size:30px;");
        },
        update: function (content) {
            // !!!
            console.log("%cmytooltip update with param:"+content,"color:silver;font-size:30px;");
        },
        destroy: function () {
        	console.log("destroy");
            return this.each(function () {
                var $this = $(this),data = $this.data('tooltip');
                // Namespacing FTW
                $(window).unbind('.tooltip');
                data.tooltip.remove();
                $this.removeData('tooltip');
            })
 
        },
        reposition: function () {
            console.log("reposition");
        }
    };
 
    $.fn.mytooltip = function (method) {
        // 方法调用
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.tooltip');
        }
 
    };
 
})(jQuery);

