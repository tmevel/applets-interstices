var grid;
var rdisp;
var tdisp;
var tslider;
var idisp;
var kdisp;
var kidisp;
var nslider;
var ndisp;
var startbutton;
var selectalgo;
var timer;

window.onload = function(){
	table = document.getElementById("table-num");
	rdisp = document.getElementById("np");
	tdisp = document.getElementById("tdisp");
	tslider = document.getElementById("tslider");
	idisp = document.getElementById("i");
	kdisp = document.getElementById("k");
	kidisp = document.getElementById("ki");
	nslider = document.getElementById("nslider");
	ndisp = document.getElementById("ndisp");
	startbutton = document.getElementById("start");
	selectalgo = document.getElementById("algo");
	timer = document.getElementById("timer");
	reset();
}

var status = "reset";
var r;
var n;
var time;
var timec;
var listN;


function resetTable(){
	table.innerHTML = "";
	var nc = Math.ceil(Math.sqrt(n))
	var c = 1;
	var i;
	if(n>800){
		table.style.fontSize = "0.6em";
	}else if(n>500){
		table.style.fontSize = "0.7em";
	}else if(n>300){
		table.style.fontSize = "0.8em";
	}else if(n>100){
		table.style.fontSize = "0.9em";
	}
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
	
	startbutton.innerHTML = "Lancer";
}
function resetDisp(){
	setn();
	timer.style.color = "#FFFFFF";
	rdisp.style.color = "#FFFFFF";
	kdisp.innerHTML = "k= 0";
	idisp.innerHTML = "i= 0";
	kidisp.innerHTML = "k*i= 0";
	timer.innerHTML = "t= 0s";
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
		startbutton.innerHTML = "Pause";
		listN = new Array(n);
		for(i=2;i<=n;i++){
			listN[i] = i;
		}
		timec = 0;
		time = Date.now();
		switch(selectalgo.selectedIndex){
			case 0:
				basique(2,2);
				break;
			case 1:
				amelioree(2,2);
				break;
			case 2:
				era1(2,2);
				break;
			case 3:
				era2(2,Math.ceil(n/2));
				break;
		}
	}else if(status == "run"){
		status = "pause";
		startbutton.innerHTML = "Continuer";
	}else if(status == "pause"){
		status = "run";
		startbutton.innerHTML = "Pause";
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
		startbutton.innerHTML = "Relancer";
		status = "ended";
	}
}

function setn(){
	if(status=="reset"){
		n = nslider.value;
		r = n;
		resetTable();
		rdisp.innerHTML = "Nombres à tester: "+r;
	}
	ndisp.innerHTML = "n= "+nslider.value;
}

function sett(){
	tdisp.innerHTML = "Temps d'arrêt= "+tslider.value+"ms";
}

function basique(i,k){
	if(status=="pause"){
		time = Date.now();
		setTimeout(basique, 100, i, k);
	}else if(status=="run"){
		timec+=Date.now()-time;
		time = Date.now();
		timer.innerHTML = "t= "+(timec/1000)+"s";
		if(i*k<=n){
			remove(i*k);
		}
		k++;
		if(k>n){
			k=2;
			i++;
		}
		if(i<=n){
			red(i*k);
			kdisp.innerHTML = "k= "+k;
			idisp.innerHTML = "i= "+i;
			kidisp.innerHTML = "k*i= "+(k*i);
			setTimeout(basique, tslider.value, i, k);
		}else{
			end();
		}
	}
}

function amelioree(i,k){
	if(status=="pause"){
		time = Date.now();
		setTimeout(amelioree, 100, i, k);
	}else if(status=="run"){
		timec+=Date.now()-time;
		time = Date.now();
		timer.innerHTML = "t= "+(timec/1000)+"s";
		if(i*k<=n){
			remove(i*k);
		}
		k++;
		if(k>Math.ceil(n/i)){
			i++;
			k=i;
		}
		if(i<=Math.ceil(Math.sqrt(n))){
			red(i*k);
			kdisp.innerHTML = "k= "+k;
			idisp.innerHTML = "i= "+i;
			kidisp.innerHTML = "k*i= "+(k*i);
			setTimeout(amelioree, tslider.value, i, k);
		}else{
			end();
		}
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
			setTimeout(era1, tslider.value, i, k);
		}else{
			end();
		}
	}
}

function era2(i,k){
	if(status=="pause"){
		time = Date.now();
		setTimeout(era2, 100, i, k);
	}else if(status=="run"){
		timec+=Date.now()-time;
		time = Date.now();
		timer.innerHTML = "t= "+(timec/1000)+"s";
		if(i*k<=n){
			if(listN.indexOf(i*k)>=0){listN.splice(listN.indexOf(i*k), 1);}
			remove(i*k);
		}
		k--;
		if(k<i){
			do{
				i++;
			}while(listN.indexOf(i)==-1);
			k=Math.ceil(n/i);
		}
		while(listN.indexOf(k)==-1){
			k--;
		}
		if(i<=Math.ceil(Math.sqrt(n))){
			red(i*k);
			kdisp.innerHTML = "k= "+k;
			idisp.innerHTML = "i= "+i;
			kidisp.innerHTML = "k*i= "+(k*i);
			setTimeout(era2, tslider.value, i, k);
		}else{
			end();
		}
	}
}
