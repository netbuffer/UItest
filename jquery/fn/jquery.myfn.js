/**
 * 插件开发入门http://www.css88.com/archives/4821
 */
(function ($) {
    $.fn.myfn = function () {
        //你自己的插件代码
        console.log("^_^");
        //此处没有必要将this包在$号中如$(this)，因为this已经是一个jQuery对象。
        //$(this)等同于 $($('#element'));
        this.css("color","blue").text("^_^").css("border","black 2px solid").css("text-align","center");
        return this.fadeIn('normal', function () {
            //此处callback函数中this关键字代表一个DOM元素
            console.log(this);//dom元素
            console.log($(this));//jq元素
        });
        
    };
})(jQuery);