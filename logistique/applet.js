var aff;
var n0;
var r;
var k;
var legend;

var colors = ["green", "blue", "red", "orange", "purple"];
var colorsC = ["green", "blue", "red", "orange", "purple"];

window.onload = function(){
	aff = new Aff(document.getElementById("graph"));
	n0 = document.getElementById("N0");
	r = document.getElementById("r");
	k = document.getElementById("K");
	legend = document.getElementById("legend-panel-content");
	aff.draw();
	n0.value = 2;
	r.value = 10;
	k.value = 8;
}
function dispInfo(){
	window.alert("N0 est la population initiale, N0 >0, choisir un nombre entre 0.01 et K\nr est le taux de croissance, r > 0, choisir un nombre entre 0.002 et 69\nK est la capacité limite, K > N0, choisir un nombre plus petit que 999");
}
class Graph{
	constructor(ctx, maxX, maxY){
		this.ctx = ctx;
		this.offsetX = 130;
		this.offsetY = 80;
		this.arrow = 15;
		this.width = 1200;
		this.height = 1000;
		this.ctx.lineWidth = 3;
		this.ctx.font = 2*this.arrow+"px Arial";
		this.scale = new Scale((this.width-this.offsetX)/maxX,(this.height-this.offsetY)/maxY);
	}
	rescale(maxX, maxY){
		this.scale = new Scale((this.width-this.offsetX)/maxX,(this.height-this.offsetY)/maxY);
	}
	drawAxes(){
		this.ctx.strokeStyle = "black";
		this.ctx.fillStyle = "black";
		this.drawLinePx(0,0,0,this.height-this.offsetY);
		this.drawLinePx(0,this.height-this.offsetY,-this.arrow,this.height-this.offsetY-this.arrow);
		this.drawLinePx(0,this.height-this.offsetY,this.arrow,this.height-this.offsetY-this.arrow);
		this.drawLinePx(0,0,this.width-this.offsetX,0);
		this.drawLinePx(this.width-this.offsetX,0,this.width-this.offsetX-this.arrow,-this.arrow);
		this.drawLinePx(this.width-this.offsetX,0,this.width-this.offsetX-this.arrow,this.arrow);
		this.ctx.fillText("N", this.offsetX-3*this.arrow, 3*this.arrow);
		this.ctx.fillText("t", this.width-30, this.height-this.offsetY+3*this.arrow);
	}
	drawLinePx(x1,y1,x2,y2){
		//console.log("("+x1+";"+y1+") ("+x2+";"+y2+")");
		this.ctx.beginPath();
		this.ctx.moveTo(this.offsetX+x1,this.height-y1-this.offsetY);
		this.ctx.lineTo(this.offsetX+x2,this.height-y2-this.offsetY);
		this.ctx.closePath();
		this.ctx.stroke();
	}
	drawXVal(x,style, text){
		this.ctx.strokeStyle = style;
		this.ctx.fillStyle = style;
		this.scale.xToPx(x);
		this.drawLinePx(this.scale.xToPx(x),-this.arrow,this.scale.xToPx(x),this.arrow);
		this.ctx.fillText(text, this.scale.xToPx(x)+this.offsetX-this.arrow, this.height);
		
	}
	drawYVal(y,style, text){
		this.ctx.strokeStyle = style;
		this.ctx.fillStyle = style;
		this.drawLinePx(-this.arrow,this.scale.yToPx(y),this.arrow,this.scale.yToPx(y));
		this.ctx.fillText(text, 0, this.height-this.offsetY-this.scale.yToPx(y)+this.arrow);
	}
	drawFunction(f){
		this.ctx.strokeStyle = f.style;
		this.ctx.fillStyle = f.style;
		for(var i=0;i<this.width-this.offsetX;i++){
			this.drawLinePx(i,this.scale.yToPx(f.f(this.scale.pxToX(i))),i+1,this.scale.yToPx(f.f(this.scale.pxToX(i+1))));
		}
	}
	drawFValues(f){
		this.drawYVal(f.n0,f.style,"N0");
		this.drawYVal(f.k,f.style,"K");
	}
	resetGraph(){
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
	drawCross(f,xPx){
		this.ctx.strokeStyle = "grey";
		xPx-=this.offsetX;
		if(xPx<0){return;}
		var yPx = this.scale.yToPx(f.f(this.scale.pxToX(xPx)));
		this.drawLinePx(xPx,0,xPx,this.height-this.offsetY);
		this.drawLinePx(0,yPx,this.width-this.offsetX,yPx);
		this.drawXVal(this.scale.pxToX(xPx),"black",Math.trunc(1000*this.scale.pxToX(xPx))/1000);
		this.drawYVal(this.scale.pxToY(yPx),"black",Math.trunc(100*this.scale.pxToY(yPx))/100);
	}
}

class Scale{
	constructor(xCoeff, yCoeff){
		this.xc = xCoeff;
		this.yc = yCoeff;
	}
	xToPx(x){
		return x*this.xc;
	}
	yToPx(y){
		return y*this.yc;
	}
	pxToX(x){
		return x/this.xc;
	}
	pxToY(y){
		return y/this.yc;
	}
}

class Exp{
	constructor(n0, r, k, style){
		this.n0 = n0;
		this.r = r;
		this.k = k;
		this.style = style;
	}
	f(t){
		return this.n0*Math.exp(this.r*t)/(1+this.n0*(Math.exp(this.r*t)-1)/this.k);
	}
	tau(){
		return Math.log(this.k/this.n0-1)/this.r;
	}
	equals(f){
		if(this.n0==f.n0&&this.r==f.r&&this.k==f.k){
			return true;
		}
		return false;
	}
}

class Aff{
	constructor(canvas){
		this.canvas = canvas;
		this.graph = new Graph(canvas.getContext("2d"),1,1);
		this.f = new Array(0);
	}
	addF(f){
		if(this.f.length>=5){return;}
		var l = document.createElement("div");
		l.className = "h-legend";
		l.onclick = lclick;
		l.innerHTML = "N0="+f.n0+" r="+f.r+" K="+f.k;
		legend.childNodes.forEach(function(e){e.className = "n-legend";});
		l.style.color = colors[0];
		f.style = colors[0];
		colors.splice(0, 1);
		legend.appendChild(l);
		this.f.push(f);
		this.draw();
	}
	removeSelected(){
		if(this.f.length==0){return;}
		var fptr = this.f.slice();
		var tmp = this.f.slice();
		legend.childNodes.forEach(function(e){
			if(e.className == "h-legend"){
				tmp.forEach(function(f){
					if(f.style == e.style.color){
						colors.push(f.style);
						fptr.splice(fptr.indexOf(f), 1);
					}
				});
				legend.removeChild(e);
			}
		});
		this.f = fptr;
		this.draw();
	}
	removeAll(){
		this.f = new Array(0);
		legend.innerHTML = "";
		colors = colorsC.slice();
		this.draw();
	}
	draw(){
		var maxX = 0;
		var maxY = 0;
		for(var i=0;i<5;i++){
			if(this.f[i]!=null){
				maxX = Math.max(maxX, 6*this.f[i].tau());
				maxY = Math.max(maxY, 1.2*this.f[i].k);
			}
		}
		if(maxX == 0){maxX = 1;}
		this.graph.rescale(maxX, maxY);
		this.graph.resetGraph();
		this.graph.drawAxes();
		
		var color;
		legend.childNodes.forEach(function(e){
			if(e.className == "h-legend"){
				color = e.style.color;
			}
		});
		this.f.forEach(function(f){
			if(f!=null){
				aff.graph.drawFunction(f);
				if(f.style == color){
					aff.graph.drawFValues(f);
				}
			}
		});
	}
}

function add(){
	if(r.value>=0.002&&r.value<=69&&n0.value>=0.01&&k.value<=999&&k.value>n0.value){
		aff.addF(new Exp(n0.value, r.value, k.value, "black"));
	}else{
		dispInfo();
	}
}
function remove(){
	aff.removeSelected();
}
function removeAll(){
	aff.removeAll();
}
function lclick(event){
	var source = event.target || event.srcElement;
	legend.childNodes.forEach(function(e){e.className = "n-legend";});
	source.className = "h-legend";
	aff.f.forEach(function(f){
		if(f.style == source.style.color){
			r.value = f.r;
			n0.value = f.n0;
			k.value = f.k;
		}
	});
	aff.draw();
}
function move(event){
	if(aff.f.length==0){return;}
	var func;
	legend.childNodes.forEach(function(e){
		if(e.className == "h-legend"){
			aff.f.forEach(function(f){
				if(f.style == e.style.color){
					func = f;
				}
			});
		}
	});
	aff.draw();
	aff.graph.drawCross(func, getMousePos(aff.canvas, event).x);
}
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect(),
		scaleX = canvas.width / rect.width,
		scaleY = canvas.height / rect.height;
	return {
		x: (evt.clientX - rect.left) * scaleX,
		y: (evt.clientY - rect.top) * scaleY
	}
}
