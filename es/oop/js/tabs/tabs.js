function Tab(tabs_id,content_id){
	this.content=document.getElementById(content_id);
	this.btns=document.getElementById(tabs_id);
	if(content==null||typeof content!="object"){
		throw new Error("id为:"+content_id+"的元素必须为div容器");
	}
	if(this.btns!=null&&typeof this.btns=="object"){
		var buttons=this.btns.childNodes;
		var buttons_size=buttons.length;
		var _this=this;
		for(var i=0;i<buttons_size;i++){
			buttons[i].onclick=function(){
				_this.content.innerHTML=this.innerHTML;
				_this.clear_btns_class();
				this.className="tabs_btn_active";
			}
		}
	}else{
		throw new Error("id为:"+tabs_id+"的元素必须为dom元素");
	}
}
Tab.prototype.echo=function(){
	console.log("content:%o",this.content);
	console.log("btns:%o",this.btns);
}
Tab.prototype.clear_btns_class=function(){
	var buttons=this.btns.childNodes;
	var buttons_size=buttons.length;
	for(var j=0;j<buttons_size;j++){
		buttons[j].className="";
	}
}