var cubeViewer;
var controller;
var canvasMousePressed = false;
var timeouts = [];


window.onload = function(){
	var canvas = document.getElementById("cube-viewer");
	cubeViewer = new CubeViewer(canvas);
	cubeViewer.paintComponent();
	
	canvas.addEventListener("mouseup", mouseReleased);
	canvas.addEventListener("mousedown", mousePressed);
	canvas.addEventListener("mousemove", mouseMoved);
	canvas.addEventListener("keypress", keyPressed);
	
	controller = new Controller();
	controller.quickMix();
	controller.updateDisp();
}

function clearAllTimeouts(){
	for(var i=0;i<timeouts.length;i++){
		window.clearTimeout(timeouts[i]);
	}
	
	timeouts = [];
}

function mousePressed(event){
	if(event.button == 0){
		canvasMousePressed = true;
	}
}
function mouseReleased(event){
	if(event.button == 0){
		canvasMousePressed = false;
	}
}
function mouseMoved(event){
	if(canvasMousePressed){
		var dx = event.movementX / 180.0 * 3.141592653589793;
		var dy = event.movementY / 180.0 * 3.141592653589793;
		
		cubeViewer.rotate(cubeViewer.viewer, 1, -dx);
		cubeViewer.rotate(cubeViewer.viewer, 0, dy);
		
		cubeViewer.emptyQueue();
		cubeViewer.computeAbsolute();
		cubeViewer.drawCube();
		cubeViewer.paintComponent();
	}
}
function keyPressed(event){
	switch(event.key){
		case "r":
			controller.r();
		break;
		case "b":
			controller.b();
		break;
		case "d":
			controller.d();
		break;
	}
}

class CubeViewer{
	constructor(canvas){
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		
		this.flash = false;
		this.modified = true;
		this.moves = 0;
		
		this.rcubes = [];
		this.rcubes.push(this.makeCube(-1, -1, -1));
        this.rcubes.push(this.makeCube(0, -1, -1));
        this.rcubes.push(this.makeCube(0, 0, -1));
        this.rcubes.push(this.makeCube(-1, 0, -1));
        this.rcubes.push(this.makeCube(-1, -1, 0));
        this.rcubes.push(this.makeCube(0, -1, 0));
        this.rcubes.push(this.makeCube(0, 0, 0));
        this.rcubes.push(this.makeCube(-1, 0, 0));
        
        this.acubes = [];
        for(var i=0;i<8;i++){
			this.acubes.push([]);
			for(var j=0;j<8;j++){
				this.acubes[i].push([]);
				for(var k=0;k<3;k++){
					this.acubes[i][j].push(0);
				}
			}
		}
		
		this.faces = [];
		this.faces.push([ 0, 1, 2, 3 ]);
		this.faces.push([ 7, 6, 5, 4 ]);
        this.faces.push([ 1, 5, 6, 2 ]);
        this.faces.push([ 0, 3, 7, 4 ]);
        this.faces.push([ 0, 4, 5, 1 ]);
        this.faces.push([ 3, 2, 6, 7 ]);
        
        this.orientations = [];
        this.orientations.push([ 1, 2, 1, 2 ]);
        this.orientations.push([ 2, 1, 2, 1 ]);
        this.orientations.push([ 2, 1, 2, 1 ]);
        this.orientations.push([ 1, 2, 1, 2 ]);
        this.orientations.push([ 0, 0, 0, 0 ]);
        this.orientations.push([ 0, 0, 0, 0 ]);
		
        this.icolors = [ [ "blue", "black", "black", "red", "white", "black" ], [ "blue", "black", "orange", "black", "white", "black" ], [ "blue", "black", "orange", "black", "black", "yellow" ], [ "blue", "black", "black", "red", "black", "yellow" ], [ "black", "green", "black", "red", "white", "black" ], [ "black", "green", "orange", "black", "white", "black" ], [ "black", "green", "orange", "black", "black", "yellow" ], [ "black", "green", "black", "red", "black", "yellow" ] ];
        this.qlength = 0;
        this.qcolor = [];
        this.qorder = [];
        this.qpoly = [];
        for(var i=0;i<100;i++){
			this.qcolor.push(0);
			this.qorder.push(0);
			this.qpoly.push([]);
			for(var j=0;j<4;j++){
				this.qpoly[i].push([]);
				for(var k=0;k<3;k++){
					this.qpoly[i][j].push(0);
				}
			}
		}
        
        this.viewer = [ [ 1.0, 0.0, 0.0 ], [ 0.0, 1.0, 0.0 ], [ 0.0, 0.0, 1.0 ] ];
        this.anim = false;
        this.state = [ 0, 1, 2, 3, 4, 5, 6, 7 ];
        this.orientation = [0, 0, 0, 0, 0, 0, 0, 0];
        this.rotate(this.viewer, 0, 0.4);
        this.rotate(this.viewer, 1, -0.3);
	}
	
	makeCube(x,y,z){
		return [ [ x, y, z ], [ x + 1, y, z ], [ x + 1, y + 1, z ], [ x, y + 1, z ], [ x, y, z + 1 ], [ x + 1, y, z + 1 ], [ x + 1, y + 1, z + 1 ], [ x, y + 1, z + 1 ] ];
	}
	
	setColor(i, j, c) {
        this.icolors[i][j] = c;
        this.modified = true;
    }
    
    computeAbsolute() {
        for (var i = 0; i < 8; ++i) {
            var rcube = this.rcubes[i];
            var acube = this.acubes[i];
            for (var j = 0; j < 8; ++j) {
                var point = rcube[j];
                for (var k = 0; k < 3; ++k) {
                    var tmp = 0.0;
                    for (var l = 0; l < 3; ++l) {
                        tmp += point[l] * this.viewer[l][k];
                    }
                    acube[j][k] = tmp;
                }
            }
        }
    }
    
    nextDirection(d) {
        return (d == 2) ? 0 : (d + 1);
    }
    
    rotate(ps, d, r) {
        var d2 = this.nextDirection(d);
        var d3 = this.nextDirection(d2);
        for(var i=0; i < ps.length; i++){
            var q1 = ps[i][d2];
            var q2 = ps[i][d3];
            ps[i][d2] = q1 * Math.cos(r) - q2 * Math.sin(r);
            ps[i][d3] = q2 * Math.cos(r) + q1 * Math.sin(r);
        }
    }
    
    flipFlash() {
        this.flash = !this.flash;
    }
    
    paintComponent() {
        if (this.modified) {
            this.xCenter = this.canvas.width / 2;
            this.yCenter = this.canvas.height / 2;
            this.scale = Math.min(this.xCenter, this.yCenter);
            this.emptyQueue();
            this.computeAbsolute();
            this.drawCube();
            this.modified = false;
        }
        if (this.flash) {
            this.setColor(Color.red);
            this.ctx.fillRect(0, 0, (this.xCenter * 2.0), (this.yCenter * 2.0));
            return;
        }
		this.setColor("white");
        this.ctx.fillRect(0, 0, (this.xCenter * 2.0), (this.yCenter * 2.0));
        this.drawQueue();
    }
    
    emptyQueue() {
        this.qlength = 0;
    }
    
    addQueue(p1, p2, p3, p4, c) {
        var w = p1[2] + p2[2] + p3[2] + p4[2] + ((c == "black") ? 10000 : 0);
        if (this.qlength == 0) {
            this.qpoly[0][0] = p1;
            this.qpoly[0][1] = p2;
            this.qpoly[0][2] = p3;
            this.qpoly[0][3] = p4;
            this.qcolor[0] = c;
            this.qorder[0] = w;
            ++this.qlength;
            return;
        }
        var min = 0;
        var max = this.qlength - 1;
        for (var middle = Math.trunc((max - min) / 2); middle != min; middle = Math.trunc(min + (max - min) / 2)) {
            var wm = this.qorder[middle];
            if (w == wm) {
                max = (min = middle);
                break;
            }
            if (w < wm) {
                max = middle;
            }
            else {
                min = middle;
            }
        }
        if (min != max && w > this.qorder[min]) {
            ++min;
        }
        if (w > this.qorder[min]) {
            ++min;
        }
        for (var i = this.qlength - 1; min <= i; --i) {
            this.qpoly[i + 1][0] = this.qpoly[i][0];
            this.qpoly[i + 1][1] = this.qpoly[i][1];
            this.qpoly[i + 1][2] = this.qpoly[i][2];
            this.qpoly[i + 1][3] = this.qpoly[i][3];
            this.qcolor[i + 1] = this.qcolor[i];
            this.qorder[i + 1] = this.qorder[i];
        }
        this.qpoly[min][0] = p1;
        this.qpoly[min][1] = p2;
        this.qpoly[min][2] = p3;
        this.qpoly[min][3] = p4;
        this.qcolor[min] = c;
        this.qorder[min] = w;
        ++this.qlength;
    }
    
    drawQueue() {
        for (var i = this.qlength - 1; i >= 0; --i) {
            this.setColor("black");
            var x = [];
			var y = [];
            x.push(Math.trunc(this.qpoly[i][0][0] * this.scale / 2.0 + this.xCenter));
            x.push(Math.trunc(this.qpoly[i][1][0] * this.scale / 2.0 + this.xCenter));
            x.push(Math.trunc(this.qpoly[i][2][0] * this.scale / 2.0 + this.xCenter));
            x.push(Math.trunc(this.qpoly[i][3][0] * this.scale / 2.0 + this.xCenter));
            y.push(Math.trunc(this.qpoly[i][0][1] * this.scale / 2.0 + this.yCenter));
            y.push(Math.trunc(this.qpoly[i][1][1] * this.scale / 2.0 + this.yCenter));
            y.push(Math.trunc(this.qpoly[i][2][1] * this.scale / 2.0 + this.yCenter));
            y.push(Math.trunc(this.qpoly[i][3][1] * this.scale / 2.0 + this.yCenter));
            this.fillPolygon(x, y, 4);
            
            this.setColor(this.qcolor[i]);
            var dx1 = (x[1] - x[0]) / 32;
            var dy1 = (y[1] - y[0]) / 32;
            var dx2 = (x[2] - x[1]) / 32;
            var dy2 = (y[2] - y[1]) / 32;
            var array = x;
            var n = 0;
            array[n] += Math.trunc(dx1 + dx2);
            var array2 = x;
            var n2 = 1;
            array2[n2] += Math.trunc(dx2 - dx1);
            var array3 = x;
            var n3 = 2;
            array3[n3] += Math.trunc(-dx1 - dx2);
            var array4 = x;
            var n4 = 3;
            array4[n4] += Math.trunc(-dx2 + dx1);
            var array5 = y;
            var n5 = 0;
            array5[n5] += Math.trunc(dy1 + dy2);
            var array6 = y;
            var n6 = 1;
            array6[n6] += Math.trunc(dy2 - dy1);
            var array7 = y;
            var n7 = 2;
            array7[n7] += Math.trunc(-dy1 - dy2);
            var array8 = y;
            var n8 = 3;
            array8[n8] += Math.trunc(-dy2 + dy1);
            this.fillPolygon(x, y, 4);
            this.setColor("black");
            this.drawPolygon(x, y, 4);
        }
    }
    
    fillPolygon(x, y, length){
		this.ctx.beginPath();
		this.ctx.moveTo(x[0], y[0]);
		for(var i=1;i<length;i++){
			this.ctx.lineTo(x[i], y[i]);
		}
		this.ctx.closePath();
		this.ctx.fill();
	}
	
	drawPolygon(x, y, length){
		this.ctx.beginPath();
		this.ctx.moveTo(x[0], y[0]);
		for(var i=1;i<length;i++){
			this.ctx.lineTo(x[i], y[i]);
		}
		this.ctx.closePath();
		this.ctx.stroke();
	}
	
	setColor(color){
		this.ctx.fillStyle = color;
		this.ctx.strokeStyle = color;
	}
    
    drawCube() {
        for (var i = 0; i < 8; ++i) {
            var cube = this.acubes[i];
            for (var j = 0; j < 6; ++j) {
                var face = this.faces[j];
                var p1 = cube[face[0]];
                var p2 = cube[face[1]];
                var p3 = cube[face[2]];
                var p4 = cube[face[3]];
                var xx1 = p1[0];
                var xx2 = p2[0];
                var xx3 = p4[0];
                var yy1 = p1[1];
                var yy2 = p2[1];
                var yy3 = p4[1];
                if ((xx2 - xx1) * (yy3 - yy1) > (xx3 - xx1) * (yy2 - yy1)) {
                    this.addQueue(p1, p2, p3, p4, this.icolors[i][j]);
                }
            }
        }
    }
    
    normalize() {
        var rcubes;
        for (var length = (rcubes = this.rcubes).length, j = 0; j < length; ++j) {
            var cube = rcubes[j];
            var array;
            for (var length2 = (array = cube).length, k = 0; k < length2; ++k) {
                var p = array[k];
                for (var i = 0; i < 3; ++i) {
                    if (p[i] < -0.5) {
                        p[i] = -1.0;
                    }
                    else if (p[i] > 0.5) {
                        p[i] = 1.0;
                    }
                    else {
                        p[i] = 0.0;
                    }
                }
            }
        }
    }
    
    doAction(action, value) {
		if(!cubeViewer.animationEnded()){
			return;
		}
        cubeViewer.moves = 16;
        if (cubeViewer.anim) {
            return false;
        }
        cubeViewer.anim = true;
        var rotation = 0;
        switch (action) {
            case 0:
            case 1: {
                rotation = 2;
                break;
            }
            case 2:
            case 3: {
                rotation = 0;
                break;
            }
            default: {
                rotation = 1;
                break;
            }
        }
        var angle = 0.0;
        switch (value) {
            case 3: {
                angle = -0.09817477042468103;
                break;
            }
            case 2: {
                angle = 0.19634954084936207;
                break;
            }
            default: {
                angle = 0.09817477042468103;
                break;
            }
        }
        if (action == 2 | action == 1 | action == 5) {
            angle = -angle;
        }
        for (var i = 0; i < 16; ++i) {
			setTimeout(cubeViewer.animatedRotation, i * 30, rotation, angle, action);
        }
        cubeViewer.paintComponent();
        cubeViewer.anim = false;
        for (var n = 0; n < value; ++n) {
            var tmps = cubeViewer.state[cubeViewer.faces[action][3]];
            var tmpo = cubeViewer.orientation[cubeViewer.faces[action][3]];
            for (var j = 3; j > 0; --j) {
                cubeViewer.state[cubeViewer.faces[action][j]] = cubeViewer.state[cubeViewer.faces[action][j - 1]];
                cubeViewer.orientation[cubeViewer.faces[action][j]] = (cubeViewer.orientation[cubeViewer.faces[action][j - 1]] + cubeViewer.orientations[action][j - 1]) % 3;
            }
            cubeViewer.state[cubeViewer.faces[action][0]] = tmps;
            cubeViewer.orientation[cubeViewer.faces[action][0]] = (tmpo + cubeViewer.orientations[action][3]) % 3;
        }
        return true;
    }
    doActionWithoutAnimation(action, value) {
        var rotation = 0;
        cubeViewer.moves = 1;
        switch (action) {
            case 0:
            case 1: {
                rotation = 2;
                break;
            }
            case 2:
            case 3: {
                rotation = 0;
                break;
            }
            default: {
                rotation = 1;
                break;
            }
        }
        var angle = 0.0;
        switch (value) {
            case 3: {
                angle = -0.09817477042468103;
                break;
            }
            case 2: {
                angle = 0.19634954084936207;
                break;
            }
            default: {
                angle = 0.09817477042468103;
                break;
            }
        }
        if (action == 2 | action == 1 | action == 5) {
            angle = -angle;
        }
        this.animatedRotation(rotation, angle*16, action);
        cubeViewer.paintComponent();
        cubeViewer.anim = false;
        for (var n = 0; n < value; ++n) {
            var tmps = cubeViewer.state[cubeViewer.faces[action][3]];
            var tmpo = cubeViewer.orientation[cubeViewer.faces[action][3]];
            for (var j = 3; j > 0; --j) {
                cubeViewer.state[cubeViewer.faces[action][j]] = cubeViewer.state[cubeViewer.faces[action][j - 1]];
                cubeViewer.orientation[cubeViewer.faces[action][j]] = (cubeViewer.orientation[cubeViewer.faces[action][j - 1]] + cubeViewer.orientations[action][j - 1]) % 3;
            }
            cubeViewer.state[cubeViewer.faces[action][0]] = tmps;
            cubeViewer.orientation[cubeViewer.faces[action][0]] = (tmpo + cubeViewer.orientations[action][3]) % 3;
        }
        return true;
    }
    animatedRotation(rotation, angle, action){
		var array = [];
		for (var length = (array = cubeViewer.faces[action]).length, k = 0; k < length; ++k) {
			var p = array[k];
			cubeViewer.rotate(cubeViewer.rcubes[cubeViewer.state[p]], rotation, angle);
		}
		cubeViewer.emptyQueue();
		cubeViewer.computeAbsolute();
		cubeViewer.drawCube();
		cubeViewer.paintComponent();
		cubeViewer.moves--;
	}
	animationEnded(){
		return this.moves == 0;
	}
    
    solved() {
        for (var i = 0; i < this.state.length; ++i) {
            if (this.state[i] != i || this.orientation[i] != 0) {
                return false;
            }
        }
        return true;
    }
    
    printState() {
        console.log("State: ");
        for (var n = 0; n < this.state.length; ++n) {
            console.log(this.state[n] + " ");
        }
        console.log("");
        console.log("Orientation: ");
        for (var n = 0; n < this.orientation.length; ++n) {
            console.log(this.orientation[n] + " ");
        }
        console.log("");
    }
}

class Controller{
	constructor(){
		this.executionInProcess = false;
		this.aqueue = [];
		this.vqueue = [];
		this.stop = true;
	}
	
	randomMove(){
		var value = 2 * Math.trunc(Math.random()*2) + 1;
		var action = Math.trunc(Math.random()*3) + 1;
		if(action == 3){action = 5;}
		
		cubeViewer.doAction(action, value);
	}
	quickRandomMove(){
		var value = 2 * Math.trunc(Math.random()*2) + 1;
		var action = Math.trunc(Math.random()*3) + 1;
		if(action == 3){action = 5;}
		
		cubeViewer.doActionWithoutAnimation(action, value);
	}
	mixRecursive(nbTours){
		if(nbTours==0){
			document.getElementById("lancer").disabled = false;
			document.getElementById("melanger").disabled = false;
			return;
		}else if(!cubeViewer.animationEnded()){
			setTimeout(controller.mixRecursive, 100, nbTours);
		}else{
			controller.randomMove();
			setTimeout(controller.mixRecursive, 600, nbTours-1);
		}
		
		
	}
	
	clearDisp(){
		document.getElementById("queue").innerHTML = "";
	}
	updateDisp(){
		controller.clearDisp();
		for(var k=0;k<controller.aqueue.length;k++){
			var actionChar = "";
			switch(controller.aqueue[k]){
				case 2:
					actionChar = "r";
					break;
				
				case 5:
					actionChar = "b";
					break;
				
				case 1:
					actionChar = "d";
					break;
			}
			var value = controller.vqueue[k];
			if(value == 3){value = -1;}
			if(controller.aqueue.length-1 == k){
				document.getElementById("queue").innerHTML += " "+"<font color=red>"+actionChar+"<sup>"+value+"</sup></font>";
			}else{
				document.getElementById("queue").innerHTML += " "+actionChar+"<sup>"+value+"</sup>";
			}
		}
		var rotationText = "Rotation";
		if(controller.aqueue.length > 1){
			rotationText+="s";
		}
		rotationText += ": "+controller.aqueue.length;
		document.getElementById("nbrotations").innerHTML = rotationText;
	}
	
	mix(){
		document.getElementById("lancer").disabled = true;
		document.getElementById("melanger").disabled = true;
		controller.aqueue = [];
		controller.vqueue = [];
		controller.updateDisp();
		
		controller.mixRecursive(10);
	}
	quickMix(){
		for(var i=0;i<20;i++){
			controller.quickRandomMove();
		}
	}
	
	mixUntilSolved(){
		if(cubeViewer.solved() || controller.stop){
			return;
		}else if(!cubeViewer.animationEnded()){
			setTimeout(controller.mixUntilSolved, 100, nbTours);
		}
		
		var value = 2 * Math.trunc(Math.random()*2) + 1;
		var action = Math.trunc(Math.random()*3) + 1;
		if(action == 3){action = 5;}
		
		controller.aqueue.push(action);
		controller.vqueue.push(value);
		controller.updateDisp();
		
		cubeViewer.doAction(action, value);
		
		setTimeout(controller.mixUntilSolved, 600);
	}
	
	lancer(){
		if(document.getElementById("lancer").innerHTML == "Stop"){
			controller.stop = true;
			document.getElementById("lancer").innerHTML = "Lancer";
			document.getElementById("melanger").disabled = false;
			return;
		}
		document.getElementById("lancer").innerHTML = "Stop";
		controller.stop = false;
		document.getElementById("melanger").disabled = true;
		controller.mixUntilSolved();
	}
}


