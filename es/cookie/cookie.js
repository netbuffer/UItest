Cookie=function(){}
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
	}else if(arglength==2){
		if(typeof name=="string"&&typeof value=="string"){
			document.cookie=name+"="+value;	
		}else{
			throw new Error("cookie必须为string");
		}
	}else if(arglength>=3){
		//添加cookie操作
		if(typeof name=="string"&&typeof value=="string"&&typeof exp=="object"){
			document.cookie=name+"="+value+";expires="+exp;	
		}else{
			throw new Error("cookie必须为string并且过期时间必须为date类型");
		}
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
