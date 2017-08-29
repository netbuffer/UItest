console.log("requirejs配置,加载非标准js");
require.config({
	baseUrl:'js/lib',
	paths:{
		"css":"//cdn.bootcss.com/require-css/0.1.10/css.min",
		"jQuery":["//cdn.bootcss.com/jquery/3.2.1/jquery.min","jquery1.11.3.min"],
		"bootstrap":"//cdn.bootcss.com/bootstrap/3.3.1/js/bootstrap.min",
		"show_msg":"funcs",
		"show":"manyfuncs"
	},
	shim:{
		//定义依赖关系
		show_msg:{
			exports:"show_msg"
		},
		show:{
			init:function(){
				return {
					"show_msg1":show_msg1,
					"show_msg2":show_msg2
				}
			}
		}
		
		
	}
});
require(["show_msg","show"],function(){
});
