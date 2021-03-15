var robot;
var editor;
var mode = "editor";
var robot;
var disp;
var map;
var canvas;
var robotInitial;
var changeMode;
var placer;
var log;
var strat;
var nomStrat;
var dir;
var lancer;
var pas;
var sens;
var currentStrat;
var angle;
var longueur;
var angleV;
var longueurV;
var recommencer;
var status;

window.onload = function(){
	canvas = document.getElementById("canvas");
	robot = document.getElementById("robot");
	editor = document.getElementById("editor");
	changeMode = document.getElementById("changeMode");
	disp = new Display(canvas.getContext("2d"));
	placer = document.getElementById("placer");
	log = document.getElementById("log");
	strat = document.getElementById("strat");
	lancer = document.getElementById("lancer");
	dir = document.getElementById("dir");
	pas = document.getElementById("pas");
	recommencer = document.getElementById("recommencer");
	angle = document.getElementById("somme-angle");
	longueur = document.getElementById("longueur");
	var tab = new Array(88);
	for(var i=0;i<tab.length;i++){
		tab[i] = new Array(38);
		for(var k=0;k<tab[i].length;k++){
			tab[i][k] = "empty";
		}
	}
	var tabinit = [["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "wall", "wall", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "wall", "wall", "wall", "wall", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "wall", "wall", "wall", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "wall", "empty", "empty"], ["empty", "empty", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]]
	for(var i=0; i<tabinit.length; i++){
		for(var k=0; k<tabinit[i].length; k++){
			tab[2*i][2*k] = tabinit[i][k];
			tab[2*i+1][2*k] = tabinit[i][k];
			tab[2*i][2*k+1] = tabinit[i][k];
			tab[2*i+1][2*k+1] = tabinit[i][k];
		}
	}
		
	var robotInitial = new Robot(30,30,90);
	map = new Map(disp, tab, robotInitial);
	map.drawMap();
	setStrategie();
}

class Map{
	constructor(disp, map, robot){
		this.disp = disp;
		this.map = map;
		this.initialRobot = robot;
		this.modeRobot();
		this.resetRobot();
		this.drawMap();
		this.controller = new RobotController(this);
		this.placer = "wall";
	}
	tournerR(){
		this.initialRobot.ang = (this.initialRobot.ang + 270)%360;
		this.resetRobot();
		this.drawMap();
	}
	effacer(){
		for(var i=0;i<88;i++){
			for(var k=0;k<38;k++){
				this.map[i][k] = "empty";
			}
		}
		this.drawMap();
	}
	resetRobot(){
		longueurV = 0;
		angleV = 0;
		this.path = new Array(0);
		this.path.push(this.initialRobot);
	}
	drawMap(){
		this.disp.clear();
		for(var i=0;i<88;i++){
			for(var k=0;k<38;k++){
				if(this.map[i][k] == "wall"){
					this.disp.fill(i,k);
				}
			}
		}
		if(this.mode == "editor"){
			this.disp.dispGrid();
		}else{
			this.disp.drawPath(this.path);
		}
		this.disp.drawRobot(this.path[this.path.length-1]);
		angle.innerHTML = "Somme des angles: "+angleV;
		longueur.innerHTML = "Longueur du chemin: "+longueurV;
	}
	modeEditor(){
		this.resetRobot();
		this.mode = "editor";
		robot.style.display = "none";
		editor.style.display = "initial";
		changeMode.innerHTML = "Explorer le labyrinthe";
	}
	modeRobot(){
		if(this.possible()){
			this.mode = "robot";
			robot.style.display = "initial";
			editor.style.display = "none";
			changeMode.innerHTML = "Modifier le labyrinthe";
			log.innerHTML = "";
		}else{
			alert("labyrinthe impossible");
		}
	}
	changeMode(){
		setStrategie();
		if(this.mode=="robot"){
			this.modeEditor();
		}else{
			this.modeRobot();
		}
		this.drawMap();
	}
	
	mouse(event){
		if(event.buttons != 0 && this.mode == "editor" && this.placer == "wall"){
			var pos = getCase(canvas, event);
			if(Math.trunc(this.initialRobot.x/2)==pos.x && Math.trunc(this.initialRobot.y/2)==pos.y){
				this.placer = "robot";
			}else if(event.buttons == 1){
				this.map[pos.x*2][pos.y*2] = "wall";
				this.map[pos.x*2+1][pos.y*2] = "wall";
				this.map[pos.x*2+1][pos.y*2+1] = "wall";
				this.map[pos.x*2][pos.y*2+1] = "wall";
			}else if(event.buttons == 2){
				this.map[pos.x*2][pos.y*2] = "empty";
				this.map[pos.x*2+1][pos.y*2] = "empty";
				this.map[pos.x*2+1][pos.y*2+1] = "empty";
				this.map[pos.x*2][pos.y*2+1] = "empty";
			}
		}else if(this.placer == "robot"){
			var pos = getCase(canvas, event);
			this.initialRobot = new Robot(pos.x*2,pos.y*2,this.initialRobot.ang);
			this.resetRobot();
		}
		this.drawMap();
	}
	mouseup(event){
		var pos = getCase(canvas, event);
		if(this.placer == "robot"){
			this.placer = "wall";
			this.map[pos.x*2][pos.y*2] = "empty";
			this.map[pos.x*2+1][pos.y*2] = "empty";
			this.map[pos.x*2+1][pos.y*2+1] = "empty";
			this.map[pos.x*2][pos.y*2+1] = "empty";
		}
	}
	possible(){
		var copy = new Array(44);
		for(var i=0;i<copy.length;i++){
			copy[i] = new Array(18);
			for(var k=0;k<copy[i].length;k++){
				copy[i][k] = this.map[i*2][k*2];
			}
		}
		return this.explore(Math.trunc(this.initialRobot.x/2),Math.trunc(this.initialRobot.y/2),copy);
	}
	explore(x,y,map){
		if(map[x][y]!="empty"){
			return false;
		}else if(x==0||x==43||y==0||y==17){
			return true;
		}
		map[x][y] = "explored";
		if(this.explore(x+1,y,map)){return true;}
		if(this.explore(x-1,y,map)){return true;}
		if(this.explore(x,y+1,map)){return true;}
		if(this.explore(x,y-1,map)){return true;}
	}
	
}

function getCase(canvas, evt){
	var pos = getMousePos(canvas, evt);
	return {
		x: Math.trunc(pos.x/20),
		y: Math.trunc(pos.y/20)
	}
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

class Display{
	constructor(ctx){
		this.ctx = ctx;
	}
	fill(x, y){
		this.ctx.beginPath();
		this.ctx.fillStyle = "green";
		this.ctx.fillRect(10*x, 10*y, 10, 10);
		this.ctx.stroke();
	}
	draw(x, y){
		this.ctx.beginPath();
		this.ctx.lineWidth = "1";
		this.ctx.strokeStyle = "grey";
		this.ctx.rect(20*x, 20*y, 20, 20);
		this.ctx.stroke();
	}
	clear(){
		this.ctx.beginPath();
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0, 0, 900, 400);
		this.ctx.stroke();
	}
	dispGrid(){
		for(var i=0;i<45;i++){
			for(var k=0;k<20;k++){
				this.draw(i,k);
			}
		}
	}
	drawRobot(robot){
		this.ctx.beginPath();
		this.ctx.strokeStyle = "red";
		this.ctx.fillStyle = "red";
		this.ctx.lineWidth = 3;
		switch(Math.trunc(robot.ang%360+360)%360){
			case 90:
				this.ctx.moveTo(Math.trunc(robot.x/2)*20+10,Math.trunc(robot.y/2)*20);
				this.ctx.lineTo(Math.trunc(robot.x/2)*20+20,Math.trunc(robot.y/2)*20+20);
				this.ctx.lineTo(Math.trunc(robot.x/2)*20,Math.trunc(robot.y/2)*20+20);
				break;
			case 270:
				this.ctx.moveTo(Math.trunc(robot.x/2)*20+10,Math.trunc(robot.y/2)*20+20);
				this.ctx.lineTo(Math.trunc(robot.x/2)*20+20,Math.trunc(robot.y/2)*20);
				this.ctx.lineTo(Math.trunc(robot.x/2)*20,Math.trunc(robot.y/2)*20);
				break;
			case 0:
				this.ctx.moveTo(Math.trunc(robot.x/2)*20+20,Math.trunc(robot.y/2)*20+10);
				this.ctx.lineTo(Math.trunc(robot.x/2)*20,Math.trunc(robot.y/2)*20+20);
				this.ctx.lineTo(Math.trunc(robot.x/2)*20,Math.trunc(robot.y/2)*20);
				break;
			case 180:
				this.ctx.moveTo(Math.trunc(robot.x/2)*20,Math.trunc(robot.y/2)*20+10);
				this.ctx.lineTo(Math.trunc(robot.x/2)*20+20,Math.trunc(robot.y/2)*20+20);
				this.ctx.lineTo(Math.trunc(robot.x/2)*20+20,Math.trunc(robot.y/2)*20);
				break;
		}
		this.ctx.closePath();
		this.ctx.stroke();
	}
	drawPath(path){
		this.ctx.beginPath();
		this.ctx.strokeStyle = "red";
		this.ctx.fillStyle = "red";
		this.ctx.lineWidth = 1;
		this.ctx.moveTo(Math.trunc(path[0].x/2)*20+10,Math.trunc(path[0].y/2)*20+10);
		for(var i=1;i<path.length;i++){
			this.ctx.lineTo(Math.trunc(path[i].x/2)*20+10,Math.trunc(path[i].y/2)*20+10);
		}
		this.ctx.stroke();
	}
}
class Robot{
	constructor(x, y, ang){
		this.x = x;
		this.y = y;
		this.ang = ang;
	}
	sortis(){
		if(this.x==0 || this.y==0 || this.x==87 || this.y==37){
			return true;
		}
		return false;
	}
	avancer1(){
		var r = new Robot(Math.round(this.x+Math.cos(degToRad(this.ang))), Math.round(this.y-Math.sin(degToRad(this.ang))), this.ang);
		if(r.sortis()){
			log.innerHTML = "Le robot est sorti du labyrinthe!";
		}
		return r;
	}
}

class RobotController{
	constructor(map){
		this.map = map;
	}
	avancer(){
		var current = this.map.path[this.map.path.length-1];
		while(!this.murDevant(current)){
			current = current.avancer1();
			longueurV++;
		}
		this.map.path.push(current);
		this.map.drawMap();
	}
	tournerD(){
		var a = 0;
		var last = this.map.path[this.map.path.length-1];
		for(var i=0;i<4;i++){
			if(this.murMainDroite(last) && !this.murDevant(last)){
				this.map.path.push(last);
				break;
			}else{
				last = new Robot(last.x,last.y,last.ang+90);
				a+=90;
			}
		}
		if(a>180){a=a-360;}
		angleV+=a;
		this.map.drawMap();
	}
	tournerG(){
		var a = 0;
		var last = this.map.path[this.map.path.length-1];
		for(var i=0;i<4;i++){
			if(this.murMainGauche(last) && !this.murDevant(last)){
				this.map.path.push(last);
				break;
			}else{
				last = new Robot(last.x,last.y,last.ang-90);
				a-=90;
			}
		}
		if(a<-180){a=a+360;}
		angleV+=a;
		this.map.drawMap();
	}
	collerD(){
		this.tournerD();
		var current = this.map.path[this.map.path.length-1];
		var last = current;
		var bouge = false;
		while(this.possible(current) && this.murMainDroite(current)){
			last = current;
			current = current.avancer1();
			longueurV++;
			bouge = true;
		}
		current = last.avancer1();
		if(this.possible(current)&&bouge){
			this.map.path.push(current);
			longueurV++;
		}else{
			this.map.path.push(last);
		}
		this.map.drawMap();
	}
	collerG(){
		this.tournerG();
		var current = this.map.path[this.map.path.length-1];
		var last = current;
		var bouge = false;
		while(this.possible(current) && this.murMainGauche(current)){
			last = current;
			current = current.avancer1();
			longueurV++;
			bouge = true;
		}
		current = last.avancer1();
		if(this.possible(current)&&bouge){
			this.map.path.push(current);
			longueurV++;
		}else{
			this.map.path.push(last);
		}
		this.map.drawMap();
	}
	murDevant(robot){
		if(Math.round(robot.x+Math.cos(degToRad(robot.ang)))<0 || Math.round(robot.y-Math.sin(degToRad(robot.ang)))<0 || Math.round(robot.x+Math.cos(degToRad(robot.ang)))>87 || Math.round(robot.y-Math.sin(degToRad(robot.ang)))>37){
			return true;
		}else if(this.map.map[Math.round(robot.x+Math.cos(degToRad(robot.ang)))][Math.round(robot.y-Math.sin(degToRad(robot.ang)))] == "wall"){
			return true;
		}else{
			return false;
		}
	}
	murMainDroite(robot){
		if(this.map.map[Math.round(robot.x+Math.cos(degToRad(robot.ang))+Math.cos(degToRad(robot.ang)-Math.PI/2))][Math.round(robot.y-Math.sin(degToRad(robot.ang))-Math.sin(degToRad(robot.ang)-Math.PI/2))] == "wall" || this.map.map[Math.round(robot.x+Math.cos(degToRad(robot.ang)-Math.PI/2))][Math.round(robot.y-Math.sin(degToRad(robot.ang)-Math.PI/2))] == "wall"){
			return true;
		}else{
			return false;
		}
	}
	murMainGauche(robot){
		if(this.map.map[Math.round(robot.x+Math.cos(degToRad(robot.ang))+Math.cos(degToRad(robot.ang)+Math.PI/2))][Math.round(robot.y-Math.sin(degToRad(robot.ang))-Math.sin(degToRad(robot.ang)+Math.PI/2))] == "wall" || this.map.map[Math.round(robot.x+Math.cos(degToRad(robot.ang)+Math.PI/2))][Math.round(robot.y-Math.sin(degToRad(robot.ang)+Math.PI/2))] == "wall"){
			return true;
		}else{
			return false;
		}
	}
	possible(robot){
		if(robot.x<0 || robot.y<0 || robot.x>87 || robot.y>37){
			return false;
		}
		if(this.map.map[robot.x][robot.y] == "empty"){
			return true;
		}else{
			return false;
		}
	}
	sortis(robot){
		if(robot.x==0 || robot.y==0 || robot.x==87 || robot.y==37){
			return true;
		}
		return false;
	}
		
}
function clone(t){
	var c = new Array(0);
	t.forEach(function(e){c.push(e);});
	return c;
}
function radToDeg(a){
	return (a*360)/(2*Math.PI);
}
function degToRad(a){
	return (a*2*Math.PI)/(360);
}
function setStrategie(){
	status = "stop";
	map.resetRobot();
	nomStrat = strat.value;
	sens = dir.value;
	if(nomStrat == "manuelle"){
		lancer.style.display = "none";
		dir.style.display = "none";
		pas.style.display = "none";
		document.getElementById("title-control").style.display = "initial";
		document.getElementById("robot-control1").style.display = "initial";
		document.getElementById("robot-control2").style.display = "initial";
		dispRecommencer();
	}else{
		lancer.style.display = "initial";
		dir.style.display = "initial";
		pas.style.display = "initial";
		document.getElementById("title-control").style.display = "none";
		document.getElementById("robot-control1").style.display = "none";
		document.getElementById("robot-control2").style.display = "none";
		dispLancer();
		switch(nomStrat){
			case "pledge":
				currentStrat = new StratPledge(sens);
				break;
			case "coller":
				currentStrat = new StratColler(sens);
				break;
			case "direction":
				currentStrat = new StratDirection(sens);
				break;
		}
	}
	map.drawMap();
}
function pasapas(){
	if(status == "auto"){return;}
	currentStrat.pas();
}
function lancerR(){
	if(status == "auto"){return;}
	status = "auto";
	dispRecommencer();
	call();
}
function call(){
	if(status == "auto"){
		currentStrat.pas();
		setTimeout(call, 500);
	}
}
function dispRecommencer(){
	recommencer.style.display = "initial";
	pas.style.display = "none";
	lancer.style.display = "none";
}
function dispLancer(){
	recommencer.style.display = "none";
	pas.style.display = "initial";
	lancer.style.display = "initial";
}
class StratColler{
	constructor(mur){
		this.etape = 0;
		this.mur = mur;
	}
	pas(){
		switch(this.etape){
			case 0:
				map.controller.avancer();
				log.innerHTML = "Obstacle rencontré";
				this.etape = 1;
				break;
			case 1:
				if(this.mur == "droite"){
					map.controller.tournerD();
				}else{
					map.controller.tournerG();
				}
				log.innerHTML = "Robot pivoté vers le prochain coin du labyrinthe";
				this.etape = 2;
				break;
			case 2:
				if(this.mur == "droite"){
					map.controller.collerD();
				}else{
					map.controller.collerG();
				}
				log.innerHTML = "Coin du labyrinthe atteint";
				this.etape = 1;
				break;
		}
	}
}
class StratDirection{
	constructor(mur){
		this.etape = 0;
		this.mur = mur;
	}
	pas(){
		switch(this.etape){
			case 0:
				map.controller.avancer();
				if(map.path[map.path.length-1].sortis()){
					this.etape = -1;
					dispRecommencer();
				}else{
					log.innerHTML = "Obstacle rencontré";
					this.etape = 1;
				}
				break;
			case 1:
				if(this.mur == "droite"){
					map.controller.tournerD();
				}else{
					map.controller.tournerG();
				}
				log.innerHTML = "Robot pivoté vers le prochain coin du labyrinthe";
				this.etape = 2;
				break;
			case 2:
				if(map.initialRobot.ang == ((map.path[map.path.length-1].ang%360)+360)%360){
					log.innerHTML = "Le robot est dans la même direction qu'au début";
					this.etape = 0;
				}else{
					if(this.mur == "droite"){
						map.controller.collerD();
					}else{
						map.controller.collerG();
					}
					log.innerHTML = "Coin du labyrinthe atteint";
					this.etape = 1;
				}
				break;
		}
	}
}
class StratPledge{
	constructor(mur){
		this.etape = 0;
		this.mur = mur;
	}
	pas(){
		switch(this.etape){
			case 0:
				map.controller.avancer();
				if(map.path[map.path.length-1].sortis()){
					this.etape = -1;
					dispRecommencer();
				}else{
					log.innerHTML = "Obstacle rencontré";
					this.etape = 1;
				}
				break;
			case 1:
				if(this.mur == "droite"){
					map.controller.tournerD();
				}else{
					map.controller.tournerG();
				}
				log.innerHTML = "Robot pivoté vers le prochain coin du labyrinthe";
				this.etape = 2;
				break;
			case 2:
				if(angleV == 0){
					log.innerHTML = "Somme des angles égale à 0";
					this.etape = 0;
				}else{
					if(this.mur == "droite"){
						map.controller.collerD();
					}else{
						map.controller.collerG();
					}
					log.innerHTML = "Coin du labyrinthe atteint";
					this.etape = 1;
				}
				break;
		}
	}
}
