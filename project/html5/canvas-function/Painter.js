/* by xieranmaya@qq.com
 *
 *
 */
var Painter = (function(){
	//把数学函数移动到全局变量
	var math = ["E", "LN2", "LN10", "LOG2E", "LOG10E", "PI", "SQRT1_2", "SQRT2", "abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan"];
	for(var f in math){
		window[math[f]] = Math[math[f]];
	}
	window.pi = Math.PI;
	
	var Picture = function(canvas,width,height){
		if(arguments.length<3){
			this.canvas = document.createElement('canvas');
			document.body.appendChild(this.canvas);
			if(arguments.length==1){
				this.canvas.width = this.canvas.height = canvas;
			}else{
				this.canvas.width = canvas;
				this.canvas.height = width;
			}
		}else{
			this.canvas = canvas;
		}
		this.canvas.style.border="1px solid black";
		this.ctx = this.canvas.getContext('2d');
		if(width){
			this.canvas.width=width;
		}
		if(height){
			this.canvas.height=height;
		}
		this.width=this.canvas.width;
		this.height=this.canvas.height;
		this.ass = function(){
			console.log("ass");
			return null;
		}
	}
	Picture.fuck = function(){
		console.log("fuck");
		return null;
	}
	Picture.prototype = {
		randx: function(){
			return Math.random()*this.width;
		},
		randy: function(){
			return Math.random()*this.height;
		},
		rand: function(range){
			return Math.random()*range;
		},
		randColor: function(){
			var r=0xfff;
			var t=(Math.floor(Math.random()*r)).toString(16);
			if(t.length==1){
				t="00"+t;
			}
			if(t.length==2){
				t="0"+t;
			}
		//	console.log(t+"");
			return "#"+t;
		},
		scale: function(x,y){
			if(arguments.length==0){
				return this.scale(1,-1);
			}
			this.ctx.scale(x,y);
			return this;
		},
		translate: function(x,y){
			if(arguments.length==0){
			//	console.log("-----------------",this.width,this.height);
				return this.translate(this.width/2,this.height/2);
			}
			this.ctx.translate(x,y);
			return this;
		},
		coor: function(){//绘制坐标系
			this.plot('0',-this.width/2,this.width/2,'black');
			return this.translate().scale().clear();//如果没有这句的话生成的图片背景是黑的。。。
		},
		clear: function(){//清空画布
			return this.box(-999,-999,99999,99999,"white");
		},
		toDataURL: function(){
			return this.canvas.toDataURL();
		},
		save: function(){
			window.open(this.toDataURL());
			return this;
		},
		draw: function(x,y,color){
			color = color||"black";
			this.ctx.fillStyle = color;
			this.ctx.fillRect(x,y,1,1);
			return this;
		},
		line: function(x1,y1,x2,y2,color){
			color = color||"black";
			this.ctx.strokeStyle=color;
			this.ctx.beginPath();
			this.ctx.moveTo(x1,y1);
			this.ctx.lineTo(x2,y2);
			this.ctx.stroke();
			return this;
		},
		box: function(x,y,width,height,color){
			color = color||"black";
			this.ctx.fillStyle=color;
			this.ctx.fillRect(x,y,width,height);
			return this;
		},
		circle: function(x,y,radius,color,fillornot){
			color = color||"black";
			this.ctx.fillStyle=this.ctx.strokeStyle=color;
			this.ctx.beginPath();
			this.ctx.arc(x,y,radius,0,Math.PI*2,true);
			if(fillornot){
				this.ctx.fill();
			}else{
				this.ctx.stroke();
			}
			return this;
		},
		plot: function(fn,start,end,color,duration){
			var fn2;
			if(typeof fn === 'string'){
				eval("fn2 = function(x){return "+fn+";}");
			}else{
				fn2 = fn;
			}
			var x=start;
			var step=1;
			if(!duration){
				for(x=start;x<=end;x+=step){
				//	this.draw(x,fn2(x),color);
					this.line(x,fn2(x),x+step,fn2(x+step),color);
				}
			}else{
				var tmpthis = this;
				var si = setInterval(function(){
				//	tmpthis.draw(x,fn2(x),color);
					tmpthis.line(x,fn2(x),x+step,fn2(x+step),color);
					x+=step;
					if(x>=end){
						clearInterval(si);
					}
				},duration*1000/((end-start)/step));
			}
			return this;
		},
		polarPlot: function(fn,start,end,color,duration){
			var fn2;
			if(typeof fn === 'string'){
				eval("fn2 = function(x){return "+fn+";}");
			}else{
				fn2 = fn;
			}
			
			var x=start;
			var step = 0.01;
			
			if(!duration){
				for(x=start;x<=end;x+=step){
				//	this.draw(Math.cos(x)*fn2(x),Math.sin(x)*fn2(x),color);
					this.line(Math.cos(x)*fn2(x),Math.sin(x)*fn2(x),Math.cos(x+step)*fn2(x+step),Math.sin(x+step)*fn2(x+step),color);
				}
			}else{
				var tmpthis = this;
				var si = setInterval(function(){
				//	tmpthis.draw(Math.cos(x)*fn2(x),Math.sin(x)*fn2(x),color);
					tmpthis.line(Math.cos(x)*fn2(x),Math.sin(x)*fn2(x),Math.cos(x+step)*fn2(x+step),Math.sin(x+step)*fn2(x+step),color);
					x+=step;
					if(x>end){
						clearInterval(si);
					}
				},duration*1000/((end-start)/step));
			}
			return this;
		},
		paraPlot: function(fnx,fny,start,end,color,duration){
			var fnxx,fnyy;
			if(typeof fnx === 'string'){
				eval('fnxx=function(t){return '+fnx+'}');
			}else{
				fnxx=fnx;
			}
			if(typeof fny === 'string'){
				eval('fnyy=function(t){return '+fny+'}');
			}else{
				fnxx=fnx;
			}
					
			var t=start;
			var step = 0.01;
			if(!duration){
				for(t=start;t<=end;t+=step){
					this.draw(fnxx(t),fnyy(t),color);
				}
			}else{
				tmpthis = this
				var si = setInterval(function(){
					tmpthis.draw(fnxx(t),fnyy(t),color);
					t+=step;
					if(t>end){
						clearInterval(si);
					}
				},duration*1000/((end-start)/step));
			}
			return this;
		}
	}
	return Picture;
})();
