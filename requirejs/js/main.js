//"use strict";
console.log("requirejs配置");
require.config({
	baseUrl:'js/lib',
	paths:{
//		"jQuery":["//cdn.bootcss.com/jquery/3.2.1/jquery.min","jquery1.11.3.min"],
		"jQuery":["jquery1.11.3.min"],
		"alert":["alert"]
	}
});
////引用jq
require(["jQuery"],function(){
	$(document.body).append("<h1>hello requirejs</h1>")
});