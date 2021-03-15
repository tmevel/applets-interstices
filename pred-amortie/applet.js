var systems = [];
var currentSystemId = -1;
var display;
var checkboxes;



window.onload = function(){
	checkboxes = document.getElementById("checkboxes");
	display = {
		left: document.getElementById("left").getContext("2d"),
		right: document.getElementById("right").getContext("2d"),
		dt: 0.25,
		init: function(){
			this.clear();
			this.drawAxes();
			systems = [];
			currentSystemId = -1;
			checkboxes.innerHTML = "";
		},
		clear: function(){
			this.left.fillStyle = "white";
			this.left.fillRect(0,0,400,250);
			this.right.fillStyle = "white";
			this.right.fillRect(0,0,250,250);
		},
		draw: function(){
			this.clear();
			
			for(var k=0;k<systems.length;k++){
				systems[k].init();
				
				var result = [];
				
				for(var i=0;i<400;i++){
					result.push([systems[k].n, systems[k].p]);
					systems[k].run(this.dt);
				}
				
				this.left.lineWidth = 1;
				this.left.strokeStyle = (k==currentSystemId)?"red":"grey";
				this.left.beginPath();
				
				for(var i=0;i<result.length;i++){
					
					this.left.lineTo(i,250-250*result[i][1]);
				}
				
				this.left.stroke();
				
				this.left.strokeStyle = (k==currentSystemId)?"blue":"grey";
				this.left.beginPath();
				
				for(var i=0;i<result.length;i++){
					
					this.left.lineTo(i,250-250*result[i][0]);
				}
				
				this.left.stroke();
				
				this.right.strokeStyle = (k==currentSystemId)?"lightgreen":"grey";
				this.right.lineWidth = 1;
				this.right.beginPath();
				
				for(var i=0;i<result.length;i++){
					
					this.right.lineTo(250*result[i][0],250-250*result[i][1]);
				}
				
				this.right.stroke();
				
				this.right.beginPath();
				this.right.strokeStyle = (k==currentSystemId)?"blue":"grey";
				this.right.moveTo(250*systems[k].nmin, 250);
				this.right.lineTo(250*systems[k].nmin, 250 * (1 - systems[k].pnmin));
				this.right.moveTo(250*systems[k].nmax, 250);
				this.right.lineTo(250*systems[k].nmax, 250 * (1 - systems[k].pnmax));
				this.right.stroke();
				
				this.right.beginPath();
				this.right.strokeStyle = (k==currentSystemId)?"red":"grey";
				this.right.moveTo(0, 250*(1 - systems[k].pmin));
				this.right.lineTo(250*systems[k].npmin, 250*(1 - systems[k].pmin));
				this.right.moveTo(0, 250*(1 - systems[k].pmax));
				this.right.lineTo(250*systems[k].npmax, 250*(1 - systems[k].pmax));
				this.right.stroke();
			}
			
			this.drawAxes();
		},
		drawAxes: function(){
			this.left.lineWidth = 1;
			this.left.strokeStyle = "black";
			this.left.fillStyle = "black";
			this.left.beginPath();
			this.left.moveTo(0,0);
			this.left.lineTo(0,250);
			this.left.lineTo(400,250);
			
			this.left.font = "12px sans-serif";
			
			this.left.moveTo(0,0);
			this.left.lineTo(5,0);
			
			for(var i=1;i<=4;i++){
				this.left.moveTo(0,50*i);
				this.left.lineTo(5,50*i);
				
				var y = (8-2*(i-1))/10;
				
				this.left.fillText(y, 6, 50*i);
			}
			
			this.left.moveTo(40,250);
			this.left.lineTo(40,245);
			
			for(var i=2;i<=9;i++){
				this.left.moveTo(40*i,250);
				this.left.lineTo(40*i,245);
				
				if(i%2 == 0){
					var y = i*10;
					this.left.fillText(y, i*40+3, 247);
				}
			}
			
			this.left.fillText("t", 390, 247);
			this.left.fillStyle = "blue";
			this.left.fillText("---Lièvre", 6, 10);
			this.left.fillStyle = "red";
			this.left.fillText("---Lynx", 6, 20);
			
			this.left.stroke();
			
			 
			
			this.right.lineWidth = 1;
			this.right.strokeStyle = "black";
			this.right.fillStyle = "black";
			this.right.beginPath();
			this.right.moveTo(0,0);
			this.right.lineTo(0,250);
			this.right.lineTo(250,250);
			
			this.right.font = "12px sans-serif";
			
			this.right.moveTo(0,0);
			this.right.lineTo(5,0);
			
			for(var i=1;i<=4;i++){
				this.right.moveTo(0,50*i);
				this.right.lineTo(5,50*i);
				
				var y = (8-2*(i-1))/10;
				
				this.right.fillText(y, 6, 50*i);
			}
			
			for(var i=1;i<=4;i++){
				this.right.moveTo(50*i,250);
				this.right.lineTo(50*i,245);
				
				var y = 2*(i/10);
				
				this.right.fillText(y, 3+50*i, 247);
			}
			
			this.right.fillText("N", 240, 247);
			this.right.fillText("P", 6, 10);
			
			this.right.stroke();
		}
	}
	display.init();
}

class System{
	constructor(r,w,e,m,k,n0,p0){
		this.r = r;
		this.w = w;
		this.e = e;
		this.m = m;
		this.k = k;
		this.n0 = n0;
		this.p0 = p0;
	}
	isValid(){
		if(isNaN(this.r) || this.r < 0){
			return false;
		}
		if(isNaN(this.w) || this.w < 0){
			return false;
		}
		if(isNaN(this.e) || this.e < 0){
			return false;
		}
		if(isNaN(this.m) || this.m < 0){
			return false;
		}
		if(isNaN(this.k) || this.k < 0){
			return false;
		}
		if(isNaN(this.n0) || this.n0 < 0){
			return false;
		}
		if(isNaN(this.p0) || this.p0 < 0){
			return false;
		}
		return true;
	}
	init(){
		this.n = this.n0;
		this.p = this.p0;
		this.nmin = this.n0;
		this.pnmin = this.p0;
		this.nmax = this.n0;
		this.pnmax = this.p0;
		
		this.pmin = this.p0;
		this.npmin = this.n0;
		this.pmax = this.p0;
		this.npmax = this.n0;
		
		this.t = 0;
	}
	toString(){
		return "r="+this.r+" , &omega;="+this.w+" , e="+this.e+" , m="+this.m+" , K="+this.k+" , N(0)="+this.n0+" , P(0)="+this.p0;
	}
	run(dt){
		this.t += dt;
		
		this.n += dt * this.n * (this.r * (1 - this.n/this.k) - this.w * this.p);
		this.p += dt * this.p * (this.e * this.w * this.n - this.m);
		
		if(this.nmin > this.n){
			this.nmin = this.n;
			this.pnmin = this.p;
		}
		
		if(this.nmax < this.n){
			this.nmax = this.n;
			this.pnmax = this.p;
		}
		
		if(this.pmin > this.p){
			this.pmin = this.p;
			this.npmin = this.n;
		}
		
		if(this.pmax < this.p){
			this.pmax = this.p;
			this.npmax = this.n;
		}
	}
}


function lancer(){
	if(systems.length >= 4){
		return;
	}
	
	systems.push(new System(frstrToFloat(document.getElementById("in-r").value), frstrToFloat(document.getElementById("in-w").value), frstrToFloat(document.getElementById("in-e").value), frstrToFloat(document.getElementById("in-m").value), frstrToFloat(document.getElementById("in-k").value), frstrToFloat(document.getElementById("in-n0").value), frstrToFloat(document.getElementById("in-p0").value)));
	if(!systems[systems.length - 1].isValid()){
		systems.pop();
		window.alert("Valeurs incorrectes, des nombres positifs sont attendus");
		return;
	}
	var id = systems.length - 1;
	currentSystemId = id;
	checkboxes.innerHTML += "<input type=\"radio\" id="+id+" name=\"systemId\" value="+id+" onchange=\"changeCurrentSystemId(event);\"><label for="+id+">"+systems[id].toString()+"</label><br>";
	document.getElementById(id).checked = true;
	display.draw();
}
function effacer(){
	display.init();
}
function changeCurrentSystemId(event){
	currentSystemId = event.target.id;
	display.draw();
}
function frstrToFloat(str){
	str = str.replace(",",".");
	return Number(str);
}
