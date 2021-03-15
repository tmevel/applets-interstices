var accueil;
var principale;
var jeu;
var chrono;
var regle;
var manager;
var resultat;
var joueur;
var l1;
var l2;
var valider;
var rejouer;
var nouvelle;
var indice;
var indice1;

window.onload = function(){
	accueil = document.getElementById("accueil");
	principale = document.getElementById("principale");
	jeu = document.getElementById("jeu");
	chrono = document.getElementById("chrono");
	regle = document.getElementById("regle");
	resultat = document.getElementById("resultat");
	joueur = document.getElementById("joueur");
	l1 = document.getElementById("l1");
	l2 = document.getElementById("l2");
	valider = document.getElementById("valider");
	rejouer = document.getElementById("rejouer");
	nouvelle = document.getElementById("nouvelle");
	indice = document.getElementById("indice");
	indice1 = document.getElementById("indice1");
	
	manager = new GameManager();
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
		if(this.chrono.timer!=null){this.chrono.end();}
	}
	newGame(d){
		this.dispJeu();
		this.chrono.start();
		this.partie = new Jeu(d);
		resultat.style.display = "none";
		nouvelle.style.display = "none";
		rejouer.style.display = "none";
		valider.style.display = "none";
		if(this.nPlayer==1){
			joueur.style.display = "none";
		}else{
			joueur.style.display = "initial";
			joueur.innerHTML = "Joueur 1";
			this.joueur = 1;
		}
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
	}
	end(){
		if(manager.chrono.timer!=null){manager.chrono.end();}
		manager.partie.removeListeners();
		if(this.nPlayer==1){
			resultat.innerHTML = "GAGNÉ";
		}else if(this.joueur == 1){
			this.vjoueur1 = this.partie.vSac;
			this.tjoueur1 = this.chrono.time;
			this.joueur = 2;
			joueur.innerHTML = "Joueur 2";
			var t = "";
			if(this.tjoueur1 >=60){
				t = Math.trunc(this.tjoueur1/60)+" m ";
			}
			l1.innerHTML = "Joueur 1 : valeur du sac : "+this.vjoueur1+", en "+t+""+this.tjoueur1%60+" s";
			l1.style.color = "yellow";
			l2.style.color = "red";
			l2.innerHTML = "Joueur 2 : à vous de jouer";
			l1.style.display = "initial";
			l2.style.display = "initial";
			setTimeout(this.rejouer, 1000);
			return;
		}else{
			this.joueur = 1;
			joueur.innerHTML = "Joueur 1";
			this.vjoueur2 = this.partie.vSac;
			this.tjoueur2 = this.chrono.time;
			var t = ""
			if(this.tjoueur2 >=60){
				t = Math.trunc(this.tjoueur2/60)+" m ";
			}
			l2.style.color = "yellow";
			l1.style.color = "yellow";
			l2.innerHTML = "Joueur 2 : valeur du sac : "+this.vjoueur2+", en "+t+""+this.tjoueur2%60+" s";
			l1.innerHTML = "Joueur 1 : valeur du sac : "+this.vjoueur1+", en "+t+""+this.tjoueur1%60+" s";
			l1.style.display = "initial";
			l2.style.display = "initial";
			if(this.vjoueur1>this.vjoueur2){
				resultat.innerHTML = "Joueur 1 a gagné";
			}else if(this.vjoueur1<this.vjoueur2){
				resultat.innerHTML = "Joueur 2 a gagné";
			}else if(this.tjoueur1 == this.tjoueur2){
				resultat.innerHTML = "Vous êtes à égalité";
			}else if(this.tjoueur1>this.tjoueur2){
				resultat.innerHTML = "Joueur 2 a gagné";
			}else{
				resultat.innerHTML = "Joueur 1 a gagné";
			}
		}
		valider.style.display = "none";
		nouvelle.style.display = "initial";
		rejouer.style.display = "initial";
		resultat.style.display = "initial";
	}
	rejouer(){
		valider.style.display = "none";
		nouvelle.style.display = "none";
		rejouer.style.display = "none";
		manager.chrono.start();
		manager.partie.reset();
	}
	click(event){
		var source = event.target || event.srcElement;
		console.log(source);
		if(manager.partie!=null){
			if(source.id.match("objet")){
				manager.partie.put(source.id.charAt(5));
			}else if(source.id.match("slot")){
				manager.partie.remove(source.id.substring(4));
			}
		}
		if(indice.style.display == "initial"){
			indice.style.display = "none";
			indice1.style.display = "initial";
		}else if(indice1.style.display == "initial"){
			indice1.style.display = "none";
		}
	}
}

class Jeu{
	constructor(d){
		this.diff = d;
		this.p = new Array(0);
		this.v = new Array(0);
		this.q = new Array(0);
		this.s = new Array(0);
		this.addListeners();
		this.poidsTotal = 0;
		this.valeurTotal = 0;
		this.pSac = 0;
		this.vSac = 0;
		this.initVal();
		this.dispVal();
		this.full = false;
		indice.style.display = "initial";
		indice1.style.display = "none";
	}
	reset(){
		this.pSac = 0;
		this.vSac = 0;
		this.full = false;
		this.addListeners();
		this.q = clone(this.qinit);
		this.s = new Array(0);
		for(var s=0;s<13;s++){
			this.s.push(null);
			document.getElementById("slot"+s).style.display = "none";
		}
		resultat.style.display = "none";
		this.dispVal();
	}
	addListeners(){
		for(var o=0;o<4;o++){
			document.getElementById("objet"+o).onclick = manager.click;
		}
		for(var s=0;s<13;s++){
			document.getElementById("slot"+s).onclick = manager.click;
		}
	}
	removeListeners(){
		for(var o=0;o<4;o++){
			document.getElementById("objet"+o).onclick = null;
		}
		for(var s=0;s<13;s++){
			document.getElementById("slot"+s).onclick = null;
		}
	}
	initVal(){
		for(var i=0;i<4;i++){
			this.p.push(this.random(5,15));
			this.v.push(this.random(3,8)*10);
			switch(this.diff){
				case(0):
					this.q.push(1);
					break;
				case(1):
					this.q.push(this.random(1,2));
					break;
				case(2):
					this.q.push(this.random(1,4));
					break;
			}
			this.poidsTotal += this.q[i]*this.p[i];
			this.valeurTotal += this.q[i]*this.v[i];
		}
		this.qinit = clone(this.q);
		this.p.sort(function(a,b){return b-a;});
		for(var s=0;s<13;s++){
			this.s.push(null);
		}
		this.poids_max = this.random(this.poidsTotal*2/3, this.poidsTotal*3/4);
		this.resolve();
	}
	resolve() {
		var listeObjet = new Array(0);
		
		for(var i=0;i<4;i++){
			for(var k=0;k<this.q[i];k++){
				listeObjet.push(i);
			}
		}
		
		var fini = false;
		this.solution_valeur = 0;
		this.solution_poids = 0;
		var utilise = new Array(listeObjet.length);
		for (var i = 0; i < listeObjet.length; i++) { utilise[i] = -1;}

		switch (this.diff) {
			case 0:
				for (var i = 0; i < listeObjet.length; i++) {
					var temp;

					do {
						temp = this.random(0, listeObjet.length - 1);
					} while (utilise[temp] != -1);
					if (this.solution_poids + this.p[listeObjet[temp]] > this.poids_max){break;}
					utilise[temp] = listeObjet[temp];
					this.solution_poids += this.p[listeObjet[temp]];
					this.solution_valeur += this.v[listeObjet[temp]];
				} 
				break;
			case 1:
				var pi_sur_ai = new Array(4);
				for (var i = 0; i < 4; i++){
					pi_sur_ai[i] = this.p[i] / this.v[i];
				}
				this.Trier_Ordre_Croissant(pi_sur_ai, utilise);
				for (var j = 0; j < 4 && !fini; j++) {
					for (var i = 0; i < listeObjet.length && !fini; i++) {
						if (utilise[j] == listeObjet[i]){
							if (this.solution_poids + this.p[utilise[j]] > this.poids_max) {
								fini = true;
							} else {
								this.solution_poids += this.p[utilise[j]];
								this.solution_valeur += this.v[utilise[j]];
								console.log(this.solution_valeur);
							} 
						}
					} 
				} 
				break;
			case 2:
				var meilleur_apport = new Array(listeObjet.length+1);
				for(var i=0;i<=listeObjet.length;i++){
					meilleur_apport[i] = new Array(this.poids_max + 1);
				}
				for (var j = 0; j <= this.poids_max; j++){
					meilleur_apport[0][j] = 0;
				}
				for (var i = 1; i <= listeObjet.length; i++) {
					var temp = listeObjet[i - 1];
					for (var j = 0; j < this.p[temp]; j++){
						meilleur_apport[i][j] = meilleur_apport[i - 1][j];
					}
					for (; j <= this.poids_max; j++){
						meilleur_apport[i][j] = Math.max(meilleur_apport[i - 1][j - this.p[temp]] + this.v[temp], meilleur_apport[i - 1][j]);
					}
				} 
				this.solution_valeur = meilleur_apport[listeObjet.length][this.poids_max];
				this.solution_poids = this.poids_max;
				break;
		}
	}
	Trier_Ordre_Croissant(tab, ordre) {
		for (var i = 0; i < 4; i++){
			ordre[i] = i;
		}
		for (var j = 0; j < 3; j++) {
			for (var i = 1; i < 4; i++) {
				if (tab[i - 1] > tab[i]) {
					var temp = ordre[i];
					ordre[i] = ordre[i - 1];
					ordre[i - 1] = temp;
					var temp2 = tab[i];
					tab[i] = tab[i - 1];
					tab[i - 1] = temp2;
				} 
			} 
		}
	}
	dispVal(){
		for(var o=0;o<4;o++){
			document.getElementById("nobjet"+o).innerHTML = "<strong>"+this.q[o]+"</strong>";
			document.getElementById("pobjet"+o).innerHTML = "<strong>"+this.p[o]+"</strong>";
			document.getElementById("vobjet"+o).innerHTML = "<strong>"+this.v[o]+"</strong>";
			var objIm = document.getElementById("objet"+o);
			if(this.q[o]>0){
				objIm.src = "objet"+o+".gif";
			}else{
				objIm.src = "vide"+o+".gif";
			}
		}
		for(var s=0;s<13;s++){
			var slot = document.getElementById("slot"+s);
			if(this.s[s]!=null){
				slot.src = "objet"+this.s[s]+".gif";
				slot.nomObjet = this.s[s];
				slot.style.display = "initial";
			}else{
				slot.style.display = "none";
			}
		}
		this.updateBar();
	}
	updateBar(){
		document.getElementById("bar-poids-lim").innerHTML = this.pSac+"/"+this.poids_max;
		document.getElementById("bar-valeur-lim").innerHTML = this.vSac+"/"+this.solution_valeur;
		document.getElementById("bar-poids-lim").style.width = (this.poids_max/this.poidsTotal)*100+"%";
		document.getElementById("bar-valeur-lim").style.width = (this.solution_valeur/this.valeurTotal)*100+"%";
		document.getElementById("bar-poids").style.width = (this.pSac/this.poidsTotal)*100+"%";
		document.getElementById("bar-valeur").style.width = (this.vSac/this.valeurTotal)*100+"%";
		if(this.pSac>this.poids_max){
			l1.style.color = "red";
			l2.style.color = "red";
			document.getElementById("bar-poids").style.background = "red";
			l1.innerHTML = "Attention, vous avez dépassé le poids maximal!";
			l2.innerHTML = "Veuillez retirer du sac des objets";
			l1.style.display = "initial";
			l2.style.display = "initial";
			valider.style.display = "none";
		}else{
			document.getElementById("bar-poids").style.background = "green";
			l1.style.display = "none";
			l2.style.display = "none";
			if(this.vSac>=this.solution_valeur){
				valider.style.display = "initial";
			}
		}
		if(this.vSac>=this.solution_valeur){
			document.getElementById("bar-valeur").style.background = "green";
		}else{
			document.getElementById("bar-valeur").style.background = "red";
		}
		
	}
	put(i){
		if(this.q[i]>0&&!this.full){
			this.q[i]--;
			this.pSac+=this.p[i];
			this.vSac+=this.v[i];
			for(var s=0;s<13;s++){
				if(this.s[s]==null){
					this.s[s] = i;
					break;
				}
			}
		}
		this.dispVal();
	}
	remove(s){
		var slot = document.getElementById("slot"+s);
		this.q[slot.nomObjet]++;
		this.pSac-=this.p[slot.nomObjet];
		this.vSac-=this.v[slot.nomObjet];
		this.s[s] = null;
		this.dispVal();
	}
	random(a,b){
		return Math.round(a+Math.random()*(b-a));
	}
}

class Chrono{
	constructor(label){
		this.label = label;
	}
	start(){
		this.end();
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
function clone(t){
	var c = new Array(0);
	t.forEach(function(e){c.push(e);});
	return c;
}
