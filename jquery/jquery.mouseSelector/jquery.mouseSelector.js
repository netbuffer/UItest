(function($){



    var defaults={
        targets:{
            name:"data-mouse-selector-target",
            value:null
        },
        selectedCss:"default-selected-css"
    }
    var elementParamArr=[];
    var container;
    var selector;
    var startPoint;
    var working=false;
    var ifMouseDown=false;
    var ifPreventClick=false;
    var selectedCssName;

    $.fn.mouseSelector=function(options){
        var options= $.extend(defaults,options||defaults);
        if(!options.targets.value||!options.targets.name)
            return;
        container=$(this).addClass("ms-clearfix container");
        _initSelector();
        _initElementParams(options.targets);
        _initEvent(options);
        return this;
    }

    /**
     *
     * @private  初始化拖选框
     *
     * @author AfterWin
     * @mail CJ_Zheng1023@hotmail.com
     */
    function _initSelector(){
        selector=$("<div></div>").addClass("mouse-selector");
        container.append(selector);
    }

    /**
     *
     *
     * @param targets   被选元素
     * @private 缓存被选元素坐标，高度，宽度信息
     *
     * @author zhengchj
     * @mail CJ_Zheng1023@hotmail.com
     */
    function _initElementParams(targets){
        container.find("["+targets.name+"='"+targets.value+"']").each(function(){
            var me=$(this);
            var elementParam={
                x:me.position().left+Number(me.css("margin-left").split("px")[0]),
                y:me.position().top+Number(me.css("margin-top").split("px")[0]),
                width:me.outerWidth(),
                height:me.outerHeight(),
                jqueryObj:me
            }
            elementParamArr.push(elementParam);
        })
    }

    /**
     *
     * @param options 配置参数
     * @private 初始化绑定事件
     *
     * @author AfterWin
     * @mail CJ_Zheng1023@hotmail.com
     */
    function _initEvent(options){
        var expr="["+options.targets.name+"='"+options.targets.value+"']";
        selectedCssName=options.selectedCss;
        container.bind({
            selectstart:function(){
                return false;
            },
            mousedown:function(e){
                startPoint={
                    x:e.pageX-$(this).offset().left+$(this).scrollLeft(),
                    y:e.pageY-$(this).offset().top+$(this).scrollTop()
                }
                selector.css({
                    left:startPoint.x,
                    top:startPoint.y
                }).show();
                ifMouseDown=true;
                ifPreventClick=false;
            },
            mousemove:function(e){

                if(!ifMouseDown)
                    return;
                working=true;
                var endPoint={
                    x:e.pageX-$(this).offset().left+$(this).scrollLeft(),
                    y:e.pageY-$(this).offset().top+$(this).scrollTop()
                }
                var left=Math.min(startPoint.x,endPoint.x),
                    top=Math.min(startPoint.y,endPoint.y),
                    width=Math.abs(endPoint.x-startPoint.x),
                    height=Math.abs(endPoint.y-startPoint.y)
                selector.css({
                    left:left,
                    top:top,
                    width:width,
                    height:height
                })
                _ifSelect(left,top,width,height);
            },
            mouseup:function(){
                _reset();
            },
            click:function(){
                if(!ifPreventClick){
                    $(this).find(expr).removeClass(selectedCssName);
                }
            },
            mouseleave:function(){
                //_reset();
            }
        })
        container.find(expr).click(function(e){
            if($(this).hasClass(selectedCssName)){
                $(this).removeClass(selectedCssName)
            }else{
                $(this).addClass(selectedCssName);
            }
            e.stopPropagation();
        })
    }

    /**
     *
     * @param selectorLeft 托选框左上顶点X坐标
     * @param selectorTop  拖选框左上顶点Y坐标
     * @param selectorWidth 拖选框宽度
     * @param selectorHeight 拖选框高度
     * @private 判断拖选框是否扫过被选元素
     *
     * @author AfterWin
     * @mail CJ_Zheng1023@hotmail.com
     */
    function _ifSelect(selectorLeft,selectorTop,selectorWidth,selectorHeight){
        for(var i=0,len=elementParamArr.length;i<len;i++){
            var ep=elementParamArr[i];
            if(selectorLeft+selectorWidth<ep.x||selectorLeft>ep.x+ep.width||selectorTop+selectorHeight<ep.y||selectorTop>ep.y+ep.height){
                ep.jqueryObj.removeClass(selectedCssName);
            }else{
                ep.jqueryObj.addClass(selectedCssName);
            }
        }
    }

    /**
     *
     * @private 复原标识位
     *
     * @author AfterWin
     * @mail CJ_Zheng1023@hotmail.com
     */
    function _reset(){
        if(working){
            ifPreventClick=true;
            working=false;
        }
        ifMouseDown=false;
        startPoint=null;
        selector.hide().css({
            width:0,
            height:0
        });
    }








})(jQuery);