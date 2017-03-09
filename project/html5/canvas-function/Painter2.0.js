/* by xieranmaya@qq.com
 * version 2.0
 * 2012-3-3 21:59:59
 */
var Painter = (function(){
	//把数学函数移动到全局变量
	var math = ["E", "LN2", "LN10", "LOG2E", "LOG10E", "PI", "SQRT1_2", "SQRT2", "abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan"];
	for(var f in math){
		window[math[f]] = Math[math[f]];
	}
	window.pi = Math.PI;
	window.e = Math.E;

	var Picture = function(canvas,width,height){
		if(arguments.length==1){
			//只有一个参数，这个参数可能为一个canvas；也可能是一个数字，表示一个正方形
			if(typeof canvas === 'number'){
				this.canvas = document.createElement('canvas');
				document.body.appendChild(this.canvas);
				this.width = this.canvas.width = canvas;
				this.height = this.canvas.height = canvas;
			}
			if(typeof canvas === 'object'){
				this.canvas = canvas;
				this.width = this.canvas.width;
				this.height = this.canvas.height;
			}
		}

		if(arguments.length == 2){
			//两个参数，可能是长和宽；也可能是一个canvas加上一个边长
			if(typeof canvas === 'number'){
				this.canvas = document.createElement('canvas');
				document.body.appendChild(this.canvas);
				this.canvas.width = this.width = canvas;
				this.canvas.height = this.height = width;
			}
			if(typeof canvas === 'object'){
				this.canvas = canvas;
				this.width = this.canvas.width;
				this.height = this.canvas.height;
			}
		}

		if(arguments.length == 3){
			//三个参数，第一个为canvas对象，第二个为width，第三个为height
			this.canvas = canvas;
			this.width = canvas.width;
			this.height = canva.height;
		}

		this.canvas.style.border = "1px solid black";
		this.ctx = this.canvas.getContext('2d');
		return this;
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
			var t=(Math.floor(Math.random()*0xfff)).toString(16);
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
			return this.translate().scale().clear();//如果没有这句的话生成的图片背景是黑的。。。
		//	this.plot('0',-this.width/2,this.width/2,'black');
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
			this.ctx.arc(x,y,radius,0,pi*2,true);
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

			return this.paraPlot(function(x){return x},fn2,start,end,color,duration);
		},
		polarPlot: function(fn,start,end,color,duration){
			var fn2;
			if(typeof fn === 'string'){
				eval("fn2 = function(x){return "+fn+";}");
			}else{
				fn2 = fn;
			}

			return this.paraPlot(function(){return fn2*sin(x)},function(){return fn2*cos(x)},start,end,color,duration);
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
				fnyy=fny;
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