var rdisp;
var tdisp;
var tslider;
var idisp;
var kdisp;
var kidisp;
var timer;

window.onload = function(){
	table = document.getElementById("table-num");
	rdisp = document.getElementById("np");
	idisp = document.getElementById("i");
	kdisp = document.getElementById("k");
	kidisp = document.getElementById("ki");
	timer = document.getElementById("timer");
	reset();
	window.onmessage = function(e){
		if (e.data == "start") {
			start();
		}else if(e.data == "reset"){
			reset();
		}
	};
}

var status = "reset";
var r = 56;
var n = 56;
var t = 100;
var time;
var timec;
var listN;


function resetTable(){
	r = n;
	table.innerHTML = "";
	var nc = Math.ceil(Math.sqrt(n))
	var c = 1;
	var i;
	table.style.fontSize = "0.8em";
	for(i=0;i<nc;i++){
		var j;
		var row = table.insertRow(i);
		for(j=0;j<nc&&c<=n;j++){
			var cell = row.insertCell(j);
			cell.id = "num-"+c;
			cell.className = "normal-num";
			cell.innerHTML = c;
			c++;
		}
	}
	remove(1);
}
function resetDisp(){
	timer.style.color = "#FFFFFF";
	rdisp.style.color = "#FFFFFF";
	kdisp.innerHTML = "k= 0";
	idisp.innerHTML = "i= 0";
	kidisp.innerHTML = "k*i= 0";
	timer.innerHTML = "t= 0s";
	resetTable();
}

function red(n){
	var num = document.getElementById("num-"+n);
	if(num!=null && num.className=="normal-num"){
		num.className = "red-num";
	}
}

function remove(n){
	var num = document.getElementById("num-"+n);
	if(num!=null && num.className!="removed-num"){
		num.className = "removed-num";
		num.innerHTML = "";
		r--;
		rdisp.innerHTML = "Reste à tester: "+r;
	}
}
function reset(){
	status = "reset";
	resetDisp();
}
function start(){
	if(status == "reset"){
		status = "run";
		listN = new Array(n);
		for(i=2;i<=n;i++){
			listN[i] = i;
		}
		timec = 0;
		time = Date.now();
		era1(2,2);
	}else if(status == "run"){
		status = "pause";
	}else if(status == "pause"){
		status = "run";
	}else if(status == "ended"){
		reset();
		start();
	}
}

function end(){
	if(status!="reset"){
		rdisp.innerHTML = "Résultats: "+r+" nombres premiers";
		timer.style.color = "#FF0000";
		rdisp.style.color = "#FF0000";
	}
}

function era1(i,k){
	if(status=="pause"){
		time = Date.now();
		setTimeout(era1, 100, i, k);
	}else if(status=="run"){
		timec+=Date.now()-time;
		time = Date.now();
		timer.innerHTML = "t= "+(timec/1000)+"s";
		if(i*k<=n){
			if(listN.indexOf(i*k)>=0){listN.splice(listN.indexOf(i*k), 1);}
			remove(i*k);
		}
		k++;
		if(k>Math.ceil(n/i)){
			do{
				i++;
			}while(listN.indexOf(i)==-1);
			k=i;
		}
		if(i<=Math.ceil(Math.sqrt(n))){
			red(i*k);
			kdisp.innerHTML = "k= "+k;
			idisp.innerHTML = "i= "+i;
			kidisp.innerHTML = "k*i= "+(k*i);
			setTimeout(era1, t, i, k);
		}else{
			end();
		}
	}
}
