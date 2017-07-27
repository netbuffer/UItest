Cookie=function(){}
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
Cookie.remove=function(name){
	if(typeof name=="string"){
		var current=new Date();
		//将cookie的过期时间设置成一个过去的时间就可以删除cookie了
		current.setDate(current.getDate()-1);//过去一天
		console.log("expires:%s",current);
		Cookie.add(name,"",current);
	}
}
