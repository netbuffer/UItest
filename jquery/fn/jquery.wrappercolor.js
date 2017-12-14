(function ($) {
    $.fn.extend({
        wrappercolor:function (color) {
            return this.each(function () {
                $(this).css("color",color);
            })
        }
    });
    $.extend({
        wrappercolor:function (selector, color) {
            $(selector).css("color",color);
        }
    })
})(jQuery);