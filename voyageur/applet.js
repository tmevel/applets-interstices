var accueil;
var principale;
var jeu;
var depart;
var chrono;
var villes;
var t_villes;
var regle;
var carte;
var carteCtx
var ht;
var hr;
var manager;
var alertT;
var resultat;
var solution;
var joueur;
var l1;
var l2;
var indice;

window.onload = function(){
	accueil = document.getElementById("accueil");
	principale = document.getElementById("principale");
	jeu = document.getElementById("jeu");
	chrono = document.getElementById("chrono");
	depart = document.getElementById("depart");
	villes = document.getElementById("villes");
	carte = document.getElementById("carte");
	ht = document.getElementById("ht");
	hr = document.getElementById("hr");
	carteCtx = carte.getContext("2d");
	carteCtx.strokeStyle = "#404040";
	carteCtx.lineWidth = 3;
	regle = document.getElementById("regle");
	alertT = document.getElementById("alerte-temps");
	resultat = document.getElementById("resultat");
	solution = document.getElementById("solution");
	joueur = document.getElementById("joueur");
	l1 = document.getElementById("l1");
	l2 = document.getElementById("l2");
	indice = document.getElementById("indice");
	
	manager = new GameManager();
	
	t_villes = new Array(0);
	
	t_villes.push(new Ville("Paris", 252, 113));
	t_villes.push(new Ville("Lyon", 357, 290));
	t_villes.push(new Ville("Toulouse", 217, 422));
	t_villes.push(new Ville("Marseille", 382, 421));
	t_villes.push(new Ville("Bordeaux", 135, 320));
	t_villes.push(new Ville("Lille", 282, 17));
	t_villes.push(new Ville("Tours", 184, 199));
	t_villes.push(new Ville("Montpellier", 303, 417));
	t_villes.push(new Ville("Rouen", 208, 83));
	t_villes.push(new Ville("Caen", 142, 92));
	
	t_villes.push(new Ville("Brest", 11, 139));
	t_villes.push(new Ville("Reims", 317, 93));
	t_villes.push(new Ville("Metz", 394, 95));
	t_villes.push(new Ville("Strasbourg", 457, 108));
	t_villes.push(new Ville("Nancy", 384, 117));
	t_villes.push(new Ville("Rennes", 103, 158));
	t_villes.push(new Ville("Orléans", 229, 171));
	t_villes.push(new Ville("Nantes", 111, 213));
	t_villes.push(new Ville("Dijon", 361, 211));
	t_villes.push(new Ville("Besançon", 415, 213));
	
	t_villes.push(new Ville("La Rochelle", 125, 259));
	t_villes.push(new Ville("Poitiers", 159, 244));
	t_villes.push(new Ville("Limoges", 216, 270));
	t_villes.push(new Ville("Clermont", 287, 286));
	t_villes.push(new Ville("Grenoble", 391, 323));
	t_villes.push(new Ville("Annecy", 409, 261));
	t_villes.push(new Ville("Toulon", 403, 427));
	t_villes.push(new Ville("Nice", 444, 402));
	t_villes.push(new Ville("Amiens", 251, 54));
	t_villes.push(new Ville("Chartres", 220, 150));
	
	t_villes.push(new Ville("Troyes", 320, 155));
	t_villes.push(new Ville("Bourges", 252, 215));
	t_villes.push(new Ville("St.Quentin", 300, 70));
	t_villes.push(new Ville("Cahors", 217, 350));
	t_villes.push(new Ville("Pau", 135, 420));
}
class GameManager{
	constructor(){
		this.dispAccueil();
		this.chrono = new Chrono(chrono);
	}
	
	dispAccueil(){
		accueil.style.display = "initial";
		principale.style.display = "none";
		jeu.style.display = "none";
	}
	dispPrincipale(){
		accueil.style.display = "none";
		principale.style.display = "initial";
		jeu.style.display = "none";
	}
	dispJeu(){
		accueil.style.display = "none";
		principale.style.display = "none";
		jeu.style.display = "initial";
	}
	
	nbrPlayer(n){
		this.nPlayer = n;
		if(n==1){
			document.getElementById("regle").src = "regle1joueur.png";
		}else{
			document.getElementById("regle").src = "regle2joueurs.png";
		}
		this.dispPrincipale();
		if(chrono.timer!=null){chrono.end();}
	}
	newGame(d){
		resultat.style.display = "none";
		nouvelle.style.display = "none";
		rejouer.style.display = "none";
		this.dispJeu();
		this.chrono.start();
		this.partie = new Jeu(d);
		if(this.nPlayer==1){
			solution.style.display = "initial";
			joueur.style.display = "none";
		}else{
			solution.style.display = "none";
			joueur.style.display = "initial";
			joueur.innerHTML = "Joueur 1";
			this.joueur = 1;
		}
		
	}
	end(s){
		if(manager.chrono.timer!=null){manager.chrono.end();}
		if(this.nPlayer==1){
			if(s){
				resultat.innerHTML = "GAGNÉ";
			}else{
				resultat.innerHTML = "";
			}
		}else if(this.joueur == 1){
			this.hjoueur1 = this.partie.hr;
			this.tjoueur1 = this.chrono.time;
			this.joueur = 2;
			joueur.innerHTML = "Joueur 2";
			var t = "";
			if(this.tjoueur1 >=60){
				t = Math.trunc(this.tjoueur1/60)+" m ";
			}
			l1.innerHTML = "Joueur 1 : heure(s) restante(s) : "+this.hjoueur1+"H, en "+t+""+this.tjoueur1%60+" s";
			l2.style.color = "red";
			l2.innerHTML = "Joueur 2 : à vous de jouer";
			l1.style.display = "initial";
			l2.style.display = "initial";
			setTimeout(this.rejouer, 1000);
			return;
		}else{
			this.joueur = 1;
			joueur.innerHTML = "Joueur 1";
			this.hjoueur2 = this.partie.hr;
			this.tjoueur2 = this.chrono.time;
			var t = "";
			if(this.tjoueur2 >=60){
				t = Math.trunc(this.tjoueur2/60)+" m ";
			}
			l2.style.color = "yellow";
			l2.innerHTML = "Joueur 2 : heure(s) restante(s) : "+this.hjoueur2+"H, en "+t+""+this.tjoueur2%60+" s";
			l1.style.display = "initial";
			l2.style.display = "initial";
			if(this.hjoueur1>this.hjoueur2){
				resultat.innerHTML = "Joueur 1 a gagné";
			}else if(this.hjoueur1<this.hjoueur2){
				resultat.innerHTML = "Joueur 2 a gagné";
			}else if(this.tjoueur1 == this.tjoueur2){
				resultat.innerHTML = "Vous êtes à égalité";
			}else if(this.tjoueur1>this.tjoueur2){
				resultat.innerHTML = "Joueur 2 a gagné";
			}else{
				resultat.innerHTML = "Joueur 1 a gagné";
			}
		}
		nouvelle.style.display = "initial";
		rejouer.style.display = "initial";
		resultat.style.display = "initial";
	}
	rejouer(){
		resultat.style.display = "none";
		nouvelle.style.display = "none";
		rejouer.style.display = "none";
		manager.chrono.start();
		manager.partie.visited.splice(1, manager.partie.visited.length-1);
		manager.partie.repaint();
	}
	nouvelle(){
		this.newGame(this.partie.diff);
	}
	retour(){
		if(principale.style.display != "none"){
			this.dispAccueil();
		}else if(jeu.style.display != "none"){
			this.dispPrincipale();
		}
		if(this.chrono.timer!=null){this.chrono.end();}
	}
	click(event){
		var source = event.target || event.srcElement;
		if(manager.partie!=null){
			var ville;
			manager.partie.villes.forEach(function(v){
				if(v.nom == source.id){
					ville = v;
				}
			});
			manager.partie.click(ville);
		}
	}
}

class Chrono{
	constructor(label){
		this.label = label;
	}
	start(){
		this.time = 0;
		this.timer = setInterval(this.add1Sec, 1000);
		this.refreshDisp();
	}
	end(){
		clearInterval(this.timer);
	}
	add1Sec(){
		manager.chrono.time++;
		manager.chrono.refreshDisp();
	}
	refreshDisp(){
		var disp = "<strong>";
		if(Math.trunc(this.time/60)<10){
			disp+="0";
		}
		disp+=Math.trunc(this.time/60)+":";
		if(this.time%60<10){
			disp+="0";
		}
		disp+=this.time%60+"</strong>";
		this.label.innerHTML = disp;
	}
}

class Ville{
	constructor(nom, x, y){
		this.nom = nom;
		this.x = x;
		this.y = y;
		this.element = document.createElement("div");
		this.element.id = nom;
		this.element.style.height = "16px";
		this.element.style.position = "absolute";
		this.element.style.top = y+"px";
		this.element.style.left = x+"px";
		this.element.onclick = manager.click;
		this.point = document.createElement("img");
		this.point.setAttribute("src","villePointVert.png");
		this.point.id = nom;
		this.couleur = "vert";
		this.element.appendChild(this.point);
		this.label = document.createElement("text");
		this.label.className = "nom-ville";
		this.label.innerHTML = "<strong>"+nom+"</strong>";
		this.label.id = nom;
		this.element.appendChild(this.label);
		this.element.style.display = "none";
		villes.appendChild(this.element);
	}
	affDist(ville){
		this.label.innerHTML = "<strong>"+Math.trunc(10*this.dist(ville))/10+"</strong>";
	}
	affNom(){
		this.label.innerHTML = "<strong>"+this.nom+"</strong>";
	}
	dist(ville){
		return Math.sqrt(Math.pow(this.x-ville.x,2)+Math.pow(this.y-ville.y,2))/20;
	}
	setVisible(bool){
		if(bool){
			this.element.style.display = "initial";
		}else{
			this.element.style.display = "none";
		}
	}
	green(){
		this.point.setAttribute("src", "villePointVert.png");
		this.couleur = "vert";
	}
	red(){
		this.point.setAttribute("src", "villePointRouge.png");
		this.couleur = "rouge";
	}
	grey(){
		this.point.setAttribute("src", "villePointGris.png");
		this.couleur = "gris";
	}
}

class Jeu{
	constructor(d){
		this.diff = d;
		this.sol = false;
		t_villes.forEach(function(e){e.setVisible(false);});
		switch(this.diff){
			case 0:
			this.selectVilles(5);
			break;
			case 1:
			this.selectVilles(10);
			break;
			case 2:
			this.selectVilles(12);
			break;
		}
	}
	selectVilles(n){
		this.villes = new Array(0);
		this.visited = new Array(0);
		
		var tmp = t_villes.slice();
		if(Math.random()>0.5){
			tmp.splice(3,1);
		}else{
			tmp.splice(26,1);
			tmp.splice(7,1);
		}
		if(Math.random()>0.5){
			tmp.splice(1,1);
		}else{
			tmp.splice(22,1);
		}
		for(var i=0;i<n;i++){
			var randI = Math.trunc(Math.random()*tmp.length);
			this.villes.push(tmp[randI]);
			tmp.splice(randI, 1);
		}
		this.villes.forEach(function(e){e.setVisible(true);});
		
		this.visited.push(this.villes[0]);
		depart.innerHTML = this.visited[0].nom;
		this.bestPath();
		ht.innerHTML = Math.trunc(this.ht);
		
		this.repaint();
	}
	bestPath(){
		this.bestRandom();
		this.newV = clone(this.villes);
		this.newV.splice(0,1);
		switch(this.diff){
			case 0:
				this.bestImprove(2);
			break;
			case 1:
				this.bestImprove(400);
			break;
			case 2:
				for(var k=0;k<1000;k++){
					this.bestImprove(1000);
				}
			break;
		}
		if(manager.nPlayer==1){setTimeout(this.optiThread, 100);}
	}
	bestRandom(){
		this.best = this.villes.slice();
		this.best.push(this.villes[0]);
		this.computeHT();
	}
	bestImprove(n){
		for(var k=0;k<n;k++){
			var tmp = this.best.slice();
			var htmp = this.ht;
			for(var i=0; i<Math.random()*15; i++){
				this.bestSwitch();
			}
			this.computeHT();
			if(htmp<this.ht){
				this.best = tmp;
				this.ht = htmp;
			}
		}
	}
	bestSwitch(){
		var i1 = 1+Math.trunc(Math.random()*(this.best.length-2));
		var i2 = 1+Math.trunc(Math.random()*(this.best.length-2));
		var tmp = this.best[i1];
		this.best[i1] = this.best[i2];
		this.best[i2] = tmp;
	}
	computeHT(){
		var htmp = 0;
		var ville = this.best[0];
		this.best.forEach(function(v){
			htmp += ville.dist(v);
			ville = v;
		});
		this.ht = htmp;
	}
	optiThread(){
		if(this.opt == undefined){
			var opt = manager.partie.optimal([manager.partie.villes[0]], manager.partie.newV, 0);
			manager.partie.opt = opt.villes;
		}
	}
	optimal(visited, tvilles, parcouru){
		if(tvilles.length==0){
			visited.push(visited[0]);
			return {parcouru:parcouru+visited[0].dist(visited[visited.length-2]), villes:visited};
		}
		var min = {parcouru:Infinity, villes:null};
		if(parcouru>this.ht){return min;}
		for(var k=0;k<tvilles.length;k++){
			var newV = clone(tvilles);
			var newC = clone(visited);
			newC.push(tvilles[k]);
			var newP = parcouru+visited[visited.length-1].dist(tvilles[k]);
			newV.splice(k,1);
			var chemin = this.optimal(newC,newV,newP);
			if(chemin.parcouru<min.parcouru){min = chemin;}
		}
		return min;
	}
	click(ville){
		if((ville.couleur == "vert")||(this.visited.length == this.villes.length && ville == this.visited[0])){
			this.visited.push(ville);	
		}else if(ville.couleur == "gris"){
			var i = this.visited.indexOf(ville);
			this.visited.splice(i+1, this.visited.length-i-1);
		}
		this.repaint();
	}
	repaint(){
		l1.style.display = "none";
		l2.style.display = "none";
		this.villes.forEach(function(v){v.green();});
		carteCtx.clearRect(0, 0, carte.width, carte.height);
		carteCtx.moveTo(this.visited[0].x+7, this.visited[0].y+7);
		carteCtx.beginPath();
		var ville = this.visited[0];
		var hrtmp = this.ht;
		this.visited.forEach(function(v){
			carteCtx.lineTo(v.x+7, v.y+7);
			v.grey();
			hrtmp -= ville.dist(v);
			ville = v;
		});
		this.hr = Math.trunc(hrtmp);
		hr.innerHTML = this.hr;
		if(Math.trunc(hrtmp)<0){
			alertT.style.display = "initial";
		}else{
			alertT.style.display = "none";
			if(this.visited.length > this.villes.length){
				manager.end(!this.sol);
			}
		}
		carteCtx.stroke();
		this.visited[this.visited.length-1].red();
		if(this.visited.length == 1 && manager.nPlayer == 1){
			indice.setAttribute("src", "indice3.png");
			indice.style.display = "initial";
		}else if(this.visited.length >= 3 && manager.nPlayer == 1){
			indice.setAttribute("src", "indice4.png");
			indice.style.display = "initial";
		}else{
			indice.style.display = "none";
		}
	}
	afficherDist(){
		this.villes.forEach(function(v){
			if(manager.partie.visited.indexOf(v)==-1){
				v.affDist(manager.partie.visited[manager.partie.visited.length-1]);
			}
		});
	}
	enleverDist(){
		this.villes.forEach(function(v){
			v.affNom();
		});
	}
	solution(){
		this.sol = true;
		//this.visited = this.best;
		while(this.opt == undefined){}
		this.visited = clone(this.opt);
		this.repaint();
	}
	reset(){
		this.visited.splice(1,this.visited.length-1);
		this.repaint();
	}
}
function clone(t){
	var c = new Array(0);
	t.forEach(function(e){c.push(e);});
	return c;
}
