Cookie=function(){}
Cookie.errCookieValueMsg="cookie必须为string";
Cookie.errExpireValueMsg="过期时间必须为date类型";
/**
 * 每调用document.cookie=会在浏览器中新增cookie值而不会擦掉之前写过的cookie值
 * expires过期时间是给浏览器用的，直接打印document.cookie看不到这些信息
 * @param {Object} name
 * @param {Object} value
 * @param {Object} exp
 */
Cookie.add=function(name,value,exp){
	var arglength= arguments.length;
	if(arglength<2){
		throw new Error("要添加cookie至少两个参数");
	}else if(arglength>=2){
		//添加cookie操作
		if(typeof name=="string"&&typeof value=="string"){
			if(name.length<=0){
				throw new Error("cookie name不能为空");	
			}
			if(exp&&typeof exp=="object"){
				document.cookie=name+"="+value+";expires="+exp;	
			}else if(exp){
				throw new Error(Cookie.errCookieValueMsg+"\n"+Cookie.errExpireValueMsg);
			}else{
				document.cookie=name+"="+value;
			}
		}else{
			throw new Error(Cookie.errCookieValueMsg);
		}
	}
}

/**
 * 获取指定cookie
 * @param name cookie key名称
 */
Cookie.get=function(name){
	var cookies=document.cookie;
	var cookie_values=cookies.split(";");
	if(cookie_values.length>0){
		for(index in cookie_values){
			var cookie=cookie_values[index].split("=");
			if(cookie[0]==name){
				return cookie[1];
			}
		}
		return ;
	}else{
		retun ;
	}
}

/**
 * 移除cookie,设置cookie键为一个过期时间就会删除cookie了
 * @param {Object} name
 */
Cookie.remove=function(name){
	if(typeof name=="string"){
		var current=new Date();
		//将cookie的过期时间设置成一个过去的时间就可以删除cookie了
		current.setDate(current.getDate()-1);//过去一天
		console.log("expires:%s",current);
		Cookie.add(name,"",current);
	}
}
/**
 * https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * 1.It will not delete cookies with HttpOnly flag set, as the HttpOnly flag disables Javascript's access to the cookie
 * 2.It will not delete cookies that have been set with a Path value. (This is despite the fact that those cookies will appear 
 * 	in document.cookie, but you can't delete it without specifying the same Path value with which it was set
 */
Cookie.clear=function(){
	var cookies = document.cookie.split(";");
	var cookies_size=cookies.length;
    for (var i = 0; i < cookies_size; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
