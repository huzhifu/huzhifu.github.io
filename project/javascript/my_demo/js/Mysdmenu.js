function Mysdmenu(id){
	this.divEles=document.getElementById(id).children;
	this.isOnlyOne=false;//打开某个菜单时，是否使其他打开的菜单关闭
	this.isSave=true;//新打开的界面是否保持上一关闭时的样式
}
Mysdmenu.prototype.init=function(){
	var that=this;
	this.readState();
	for(var i=0,length=this.divEles.length;i<length;i++){
		this.divEles[i].children[0].onclick=function(){
			that.toggleMenu(this.parentNode);
		}
	}
};
Mysdmenu.prototype.toggleMenu=function(divMenu){
	if(divMenu.className=="collapsed"){
		//divMenu.className="";
        this.expandMenu(divMenu);
        this.closeOtherMenu(divMenu);
	}else{
//		divMenu.className="collapsed";
		this.closeMenu(divMenu);
	}
};
Mysdmenu.prototype.expandMenu=function(divMenu){
	var expandHeight=0;
	var itemMove=8;
	var that=this;
	for(var i=0,length=divMenu.children.length;i<length;i++){
		expandHeight+=divMenu.children[i].offsetHeight;
	}
	var intervalId=setInterval(function(){
		var curHeight=divMenu.offsetHeight+itemMove;
		if(curHeight>=expandHeight){
			clearInterval(intervalId);
			divMenu.className='';
			curHeight=expandHeight;
			that.saveState();
		}
		divMenu.style.height=curHeight+"px";
	},20);
	
};
Mysdmenu.prototype.closeMenu=function(divMenu){
	var closeHeight=divMenu.children[0].offsetHeight;
	var itemMove=-8;
	var that=this;
	var intervalId=setInterval(function(){
		var curHeight=divMenu.offsetHeight+itemMove;
		if(curHeight<=closeHeight){
			clearInterval(intervalId);
			divMenu.className='collapsed';
			curHeight=closeHeight;
			that.saveState();
		}
		divMenu.style.height=curHeight+"px";
	},20);
	
}
Mysdmenu.prototype.closeOtherMenu=function(divMenu){
	if(this.isOnlyOne){
		for(var i=0,length=this.divEles.length;i<length;i++){
		if(this.divEles[i].className!="collapsed"&&this.divEles[i]!=divMenu){
			this.closeMenu(this.divEles[i]);
		}
	}
	}
}
Mysdmenu.prototype.saveState=function(){
	if(this.isSave){
		var states=[];
		for(var i=0,length=this.divEles.length;i<length;i++){
			if(this.divEles[i].className=='collapsed'){
				states.push(0);
			}else{
				states.push(1);
			}
		}
		var date=new Date();
		date.setTime(date.getTime()+1000*60*60*24*30);
		document.cookie="menustate="+states.join("")+";expires="+date.toUTCString();
	}
}
Mysdmenu.prototype.readState=function(){
	if(this.isSave){
		if(document.cookie!=''){
			var stateStr=document.cookie;
			stateStr=/menustate=(\d+)/.exec(stateStr);
			if(stateStr!=null){
				stateArr=stateStr[1].split("");
				for(var i=0;i<stateArr.length;i++){
					this.divEles[i].className=stateArr[i]==0? "collapsed":"";
				}
			}
		}
	}
}
