var algo = new Array(0);
var bstart;
var breset;


window.onload = function(){
	algo.push(document.getElementById("basique"));
	algo.push(document.getElementById("amelioree"));
	algo.push(document.getElementById("era1"));
	algo.push(document.getElementById("era2"));
	bstart = document.getElementById("start");
	breset = document.getElementById("reset")
}

function start(){
	algo.forEach(function(a){
		a.contentWindow.postMessage("start",'*');
	});
	if(bstart.innerHTML == "Lancer"){
		bstart.innerHTML = "Pause";
	}else{
		bstart.innerHTML = "continuer";
	}	
}

function reset(){
	algo.forEach(function(a){
		a.contentWindow.postMessage("reset",'*');
	});
	bstart.innerHTML = "Lancer";
}
