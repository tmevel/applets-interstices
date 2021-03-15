var accueil;
var principale;
var jeu;
var regle;
var manager;
var resultat;
var joueur;
var l1;
var l2;
var difficultee;
var premier;
var adversaire;
var niveau;
var nJoueurs;
var joueurs;
var commence;
var currentGame;
var score;
var last;

window.onload = function(){
	accueil = document.getElementById("accueil");
	principale = document.getElementById("principale");
	jeu = document.getElementById("jeu");
	regle = document.getElementById("regle");
	resultat = document.getElementById("resultat");
	joueur = document.getElementById("joueur");
	l1 = document.getElementById("l1");
	l2 = document.getElementById("l2");
	difficultee = document.getElementById("difficultee");
	premier = document.getElementById("premier");
	joueurs = document.getElementById("joueurs");
	adversaire = new Adversaire();
	
	manager = new GameManager();
	manager.dispAccueil();
}
class GameManager{
	constructor(){
		this.dispAccueil();
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
	
	allumettes(){
		this.jeu = "allumettes";
		document.getElementById("allumettes").style.display = "initial";
		document.getElementById("marienbad").style.display = "none";
		document.getElementById("pieces").style.display = "none";
		document.getElementById("morpion").style.display = "none";
		this.dispChoix();
	}
	marienbad(){
		this.jeu = "marienbad";
		document.getElementById("allumettes").style.display = "none";
		document.getElementById("marienbad").style.display = "initial";
		document.getElementById("pieces").style.display = "none";
		document.getElementById("morpion").style.display = "none";
		this.dispChoix();
	}
	pieces(){
		this.jeu = "pieces";
		document.getElementById("allumettes").style.display = "none";
		document.getElementById("marienbad").style.display = "none";
		document.getElementById("pieces").style.display = "initial";
		document.getElementById("morpion").style.display = "none";
		this.dispChoix();
	}
	morpion(){
		this.jeu = "morpion";
		document.getElementById("allumettes").style.display = "none";
		document.getElementById("marienbad").style.display = "none";
		document.getElementById("pieces").style.display = "none";
		document.getElementById("morpion").style.display = "initial";
		this.dispChoix();
	}
	dispChoix(){
		switch(this.jeu){
			case "allumettes":
				document.getElementById("regle").src = "images/fondRegleAllumettes.gif";
			break;
			case "marienbad":
				document.getElementById("regle").src = "images/fondRegleMarienbad.gif";
			break;
			case "pieces":
				document.getElementById("regle").src = "images/fondReglePiece.gif";
			break;
			case "morpion":
				document.getElementById("regle").src = "images/fondRegleMorpion.gif";
			break;
		}
		joueurs.style.display = "";
		premier.style.display = "none";
		difficultee.style.display = "none";
		this.dispPrincipale();
	}
	nJoueurs(n){
		nJoueurs = n;
		if(n==2){
			score = new Score2();
			switch(this.jeu){
				case "allumettes":
					currentGame = new Allumette2();
				break;
				case "marienbad":
					currentGame = new Marienbad2();
				break;
				case "pieces":
					currentGame = new Piece2();
				break;
				case "morpion":
					currentGame = new Morpion2();
				break;
			}
			currentGame.start();
		}else{
			score = new Score1();
			joueurs.style.display = "none";
			difficultee.style.display = "";
		}
	}
	difficulty(d){
		niveau = d;
		difficultee.style.display = "none";
		premier.style.display = "";
	}
	commence(c){
		commence = c;
		if(commence<2){
			last = 2;
		}else{
			last = 1;
		}
		switch(this.jeu){
			case "allumettes":
				currentGame = new Allumette1();
			break;
			case "marienbad":
				currentGame = new Marienbad1();
			break;
			case "pieces":
				currentGame = new Piece1();
			break;
			case "morpion":
				currentGame = new Morpion1();
			break;
		}
		currentGame.start();
	}
	
	retour(){
		this.dispAccueil();
	}
	click(event){
	}
}

class Allumette1{
	constructor(){
		score.effacer();
		this.tabA = new Array(0);
		switch(niveau){
			case 1:
				this.nA = 10;
				break;
			case 2:
				this.nA = 12;
				break;
			case 3:
				this.nA = 20;
				break;
		}
		document.getElementById("nA").innerHTML = "["+this.nA+" allumettes]";
		document.getElementById("tabA").innerHTML = "";
		this.allumettes = document.getElementById("tabA").insertRow();
		for(var k=0;k<this.nA;k++){
			this.tabA.push(true);
			var cell = this.allumettes.insertCell(k);
			cell.id = "a-"+k;
			cell.innerHTML = "<img id=\"i-"+k+"\" class=\"allumette150\" src=\"images/allumettes/allumetteFull.gif\" onclick=\"currentGame.click(event);\"/>";
		}
		adversaire.normal();
		adversaire.effacer();
		manager.dispJeu();
	}
	start(){
		this.joueur = last;
		this.status = "play";
		this.auSuivant();
	}
	auSuivant(){
		if(this.status == "ended"){
			if(commence == 0){
				if(last == 1){
					last = 2;
				}else{
					last = 1;
				}
			}
			this.joueur = last;
			currentGame = new Allumette1();
			currentGame.start();
			return;
		}
		this.restant = 3;
		if(this.nA==1){
			score.end(this.joueur);
			return;
		}
		if(this.joueur==1){
			this.joueur = 2;
			adversaire.dire("MMmmmmm...");
			setTimeout(this.iaJoue, 1000);
		}else{
			this.joueur = 1;
			adversaire.dire("A vous de jouer!");
		}
		if(this.nA==0){
			score.end(this.joueur);
			return;
		}
		document.getElementById("suivantA").style.display = "none";
	}
	enlever(k){
		if(this.tabA[k] && this.restant>0){
			this.restant--;
			this.nA--;
			document.getElementById("i-"+k).src = "images/allumettes/allumetteEmpty.gif";
			this.tabA[k] = false;
			document.getElementById("suivantA").style.display = "initial";
			if((this.restant == 0 && this.joueur==1) || this.nA == 0){this.auSuivant();}
		}
		document.getElementById("nA").innerHTML = "["+this.nA+" allumettes]";
		if(this.nA==1){
			document.getElementById("nA").innerHTML = "[1 allumette]";
		}
	}
	iaJoue(){
		var n = (currentGame.nA-1)%4;
		if(n==0){n=1;}
		switch(niveau){
			case 1:
				n = Math.trunc(Math.random()*3)+1;
			break;
			case 2:
				if(Math.random()>0.5){n = Math.trunc(Math.random()*3)+1;}
			break;
		}
		if(currentGame.nA<4){
			n = (currentGame.nA-1)%4;
		}
		for(var k=0;k<currentGame.tabA.length&&n!=0;k++){
			if(currentGame.tabA[k]){
				currentGame.enlever(k);
				console.log("enlevé");
				n--;
			}
		}
		currentGame.auSuivant();
	}
	click(event){
		var source = event.target || event.srcElement;
		if(this.joueur==1){this.enlever(source.id.substring(2));}
	}
}

class Allumette2{
	constructor(){
		score.effacer();
		this.tabA = new Array(0);
		this.nA = 7+Math.trunc(Math.random()*15);
		document.getElementById("nA").innerHTML = "["+this.nA+" allumettes]";
		niveau = 1;
		document.getElementById("tabA").innerHTML = "";
		this.allumettes = document.getElementById("tabA").insertRow();
		for(var k=0;k<this.nA;k++){
			this.tabA.push(true);
			var cell = this.allumettes.insertCell(k);
			cell.id = "a-"+k;
			cell.innerHTML = "<img id=\"i-"+k+"\" class=\"allumette150\" src=\"images/allumettes/allumetteFull.gif\" onclick=\"currentGame.click(event);\"/>";
		}
		adversaire.normal();
		adversaire.effacer();
		manager.dispJeu();
	}
	start(){
		this.joueur = 2;
		this.status = "play";
		this.auSuivant();
		
	}
	auSuivant(){
		if(this.status == "ended"){
			currentGame = new Allumette2();
			currentGame.start();
			return;
		}
		this.restant = 3;
		if(this.nA==1){
			score.end(this.joueur);
			return;
		}
		if(this.joueur==1){
			this.joueur = 2;
			adversaire.dire("Au joueur 2 de jouer");
		}else{
			this.joueur = 1;
			adversaire.dire("Au joueur 1 de jouer");
		}
		if(this.nA==0){
			score.end(this.joueur);
			return;
		}
		document.getElementById("suivantA").style.display = "none";
	}
	enlever(k){
		if(this.tabA[k] && this.restant>0){
			this.restant--;
			this.nA--;
			document.getElementById("i-"+k).src = "images/allumettes/allumetteEmpty.gif";
			this.tabA[k] = false;
			document.getElementById("suivantA").style.display = "initial";
			if(this.restant == 0 || this.nA == 0){this.auSuivant();}
		}
		document.getElementById("nA").innerHTML = "["+this.nA+" allumettes]";
		if(this.nA==1){
			document.getElementById("nA").innerHTML = "[1 allumette]";
		}
	}
	click(event){
		var source = event.target || event.srcElement;
		this.enlever(source.id.substring(2));
	}
}

class Marienbad1{
	constructor(){
		this.noyau = [[0,0,1],[0,2,2],[0,3,3],[0,1,0],[1,0,0],[1,1,1],[1,2,3],[1,3,2]];
		score.effacer();
		this.tabA = [[true],[true,true,true],[true,true,true,true,true]];
		this.allumettes = new Array(3);
		this.nA = [1,3,5];
		for(var k=0;k<3;k++){
			document.getElementById("tabM"+k).innerHTML = "";
			this.allumettes[k] = document.getElementById("tabM"+k).insertRow();
			for(var i=0;i<this.nA[k];i++){
				var cell = this.allumettes[k].insertCell(i);
				cell.id = "a-"+k+"-"+i;
				cell.innerHTML = "<img id=\"i-"+k+"-"+i+"\" class=\"allumette80\" src=\"images/allumettes/allumetteFull.gif\" onclick=\"currentGame.click(event);\"/>";
			}
		}
		adversaire.normal();
		adversaire.effacer();
		manager.dispJeu();
	}
	start(){
		this.joueur = last;
		this.status = "play";
		this.auSuivant();
	}
	sumA(){
		var sum = 0;
		for(var k=0;k<3;k++){
			sum+=this.nA[k];
		}
		return sum;
	}
	auSuivant(){
		if(this.status == "ended"){
			if(commence == 0){
				if(last == 1){
					last = 2;
				}else{
					last = 1;
				}
			}
			this.joueur = last;
			currentGame = new Marienbad1();
			currentGame.start();
			return;
		}
		this.etage = -1;
		if(this.sumA() == 1){
			score.end(this.joueur);
			return;
		}
		if(this.joueur==1){
			this.joueur = 2;
			adversaire.dire("MMmmmmm...");
			setTimeout(this.iaJoue, 1000);
		}else{
			this.joueur = 1;
			adversaire.dire("A vous de jouer!");
		}
		if(this.sumA() == 0){
			score.end(this.joueur);
			return;
		}
		document.getElementById("suivantM").style.display = "none";
	}
	enlever(k,i){
		if(this.tabA[k][i]){
			if(k == this.etage || this.etage == -1){
				this.etage = k;
				this.tabA[k][i] = false;
				this.nA[k]--;
				document.getElementById("i-"+k+"-"+i).src = "images/allumettes/allumetteEmpty.gif";
				document.getElementById("suivantM").style.display = "initial";
				if(this.sumA() == 0){this.auSuivant();}
			}
		}
	}
	iaJoue(){
		switch(niveau){
			case 1:
				currentGame.coupRandom();
				currentGame.auSuivant();
				return;
				break;
			case 2:
				if(Math.random()>0.5){
					currentGame.coupRandom();
					currentGame.auSuivant();
					return;
				}
				break;
			}
		for(var k=0;k<=2;k++){
			for(var i=1;i<=currentGame.nA[k];i++){
				var u = clone(currentGame.nA);
				u[k]-=i;
				if(currentGame.dansNoyau(u)){
					currentGame.enleverN(i,k);
					currentGame.auSuivant();
					return;
				}
			}
		}
		currentGame.coupRandom();
		currentGame.auSuivant();
	}
	coupRandom(){
		var etage = randInt(0,2);
		while(this.nA[etage]==0){
			etage = randInt(0,2);
		}
		this.enleverN(randInt(1,this.nA[etage]),etage);
	}
	enleverN(n, etage){
		for(var k=0;n!=0&&k<this.tabA[etage].length;k++){
			if(this.tabA[etage][k]){
				this.enlever(etage,k);
				n--;
			}
		}
	}
	dansNoyau(v){
		for(var k=0;k<this.noyau.length;k++){
			if(equals(this.noyau[k],v)){return true;}
		}
		return false;
	}
	
	click(event){
		var source = event.target || event.srcElement;
		this.enlever(source.id.substring(2,3),source.id.substring(4,5));
	}
}

class Marienbad2{
	constructor(){
		score.effacer();
		this.tabA = [[true],[true,true,true],[true,true,true,true,true]];
		this.allumettes = new Array(3);
		this.nA = [1,3,5];
		niveau = 1;
		for(var k=0;k<3;k++){
			document.getElementById("tabM"+k).innerHTML = "";
			this.allumettes[k] = document.getElementById("tabM"+k).insertRow();
			for(var i=0;i<this.nA[k];i++){
				var cell = this.allumettes[k].insertCell(i);
				cell.id = "a-"+k+"-"+i;
				cell.innerHTML = "<img id=\"i-"+k+"-"+i+"\" class=\"allumette80\" src=\"images/allumettes/allumetteFull.gif\" onclick=\"currentGame.click(event);\"/>";
			}
		}
		adversaire.normal();
		adversaire.effacer();
		manager.dispJeu();
	}
	start(){
		this.joueur = 2;
		this.status = "play";
		this.auSuivant();
		
	}
	sumA(){
		var sum = 0;
		for(var k=0;k<3;k++){
			sum+=this.nA[k];
		}
		return sum;
	}
	auSuivant(){
		if(this.status == "ended"){
			currentGame = new Marienbad2();
			currentGame.start();
			return;
		}
		this.etage = -1;
		if(this.sumA() == 1){
			score.end(this.joueur);
			return;
		}
		if(this.joueur==1){
			this.joueur = 2;
			adversaire.dire("Au joueur 2 de jouer");
		}else{
			this.joueur = 1;
			adversaire.dire("Au joueur 1 de jouer");
		}
		if(this.sumA() == 0){
			score.end(this.joueur);
			return;
		}
		document.getElementById("suivantM").style.display = "none";
	}
	enlever(k,i){
		if(this.tabA[k][i]){
			if(k == this.etage || this.etage == -1){
				this.etage = k;
				this.tabA[k][i] = false;
				this.nA[k]--;
				document.getElementById("i-"+k+"-"+i).src = "images/allumettes/allumetteEmpty.gif";
				document.getElementById("suivantM").style.display = "initial";
				if(this.sumA() == 0){this.auSuivant();}
			}
		}
	}
	click(event){
		var source = event.target || event.srcElement;
		this.enlever(source.id.substring(2,3),source.id.substring(4,5));
	}
}

class Piece1{
	constructor(){
		this.parties3 = [[false,false,true,false,true,false,false,false,false,true]
		,[false,false,false,false,true,true,true,true,false,false]
		,[false,false,true,false,true,true,false,true,false,false]
		,[false,false,true,true,false,false,false,false,false,true]
		,[false,false,false,true,true,false,false,false,true,false]
		,[false,false,false,true,false,false,true,false,true,true]
		,[false,false,true,false,false,false,false,true,false,true]
		,[false,false,true,false,false,false,false,true,true,false]
		,[false,false,true,false,false,true,false,true,true,false]
		,[false,false,false,true,false,true,true,false,true,false]
		];
		this.noyaux3 = [[[true,true,true,false,false,false,false,false,false,false],[true,false,true,true,false,false,false,false,false,false],[true,false,false,true,true,false,false,false,false,false],[true,false,false,false,true,true,false,false,false,false],[false,true,true,false,true,false,false,false,false,false],[false,true,false,true,false,true,false,false,false,false],[false,true,false,false,true,false,true,false,false,false],[false,false,true,true,false,false,true,false,false,false],[false,false,true,false,true,false,false,true,false,false]]
		,[[true,true,true,true,false,false,false,false,false,false],[true,true,false,true,true,false,false,false,false,false],[true,true,false,false,true,true,false,false,false,false],[true,true,false,false,false,true,true,false,false,false],[true,true,false,false,false,false,true,true,false,false],[true,false,true,true,false,true,false,false,false,false],[true,false,true,false,true,false,true,false,false,false],[true,false,true,false,false,true,false,true,false,false],[false,true,true,true,true,false,false,false,false,false],[false,true,true,false,true,true,false,false,false,false],[false,true,true,false,false,false,true,true,false,false],[true,false,false,true,true,false,false,true,false,false],[false,true,true,false,false,true,true,false,false,false],[false,true,false,true,false,true,false,true,false,false],[false,false,true,true,false,false,true,true,false,false],[false,true,false,true,true,false,true,false,false,false],[false,false,true,true,false,true,true,false,false,false],[false,false,true,false,true,true,false,true,false,false],[false,false,false,true,true,false,true,true,false,false],[false,false,false,false,true,true,true,true,false,false],[false,false,true,true,true,true,false,false,false,false],[false,false,false,true,true,true,true,false,false,false]]
		,[[true,true,true,true,false,false,false,false,false,false],[true,true,false,true,true,false,false,false,false,false],[true,true,false,false,true,true,false,false,false,false],[true,true,false,false,false,true,true,false,false,false],[true,false,true,true,false,true,false,false,false,false],[true,false,true,false,true,false,true,false,false,false],[true,false,true,false,false,true,false,true,false,false],[true,false,false,true,true,false,false,true,false,false],[false,true,true,true,true,false,false,false,false,false],[false,true,true,false,false,true,true,false,false,false],[false,true,false,true,false,true,false,true,false,false],[false,true,true,false,true,true,false,false,false,false],[false,true,false,true,true,false,true,false,false,false],[false,false,true,true,false,true,true,false,false,false],[false,false,true,false,true,true,false,true,false,false],[false,false,true,true,true,true,false,false,false,false]]
		,[[true,true,true,false,false,false,false,false,false,false],[true,false,true,true,false,false,false,false,false,false],[true,false,false,true,true,false,false,false,false,false],[false,true,true,false,true,false,false,false,false,false],[false,true,false,true,false,true,false,false,false,false],[false,false,true,true,false,false,true,false,false,false]]
		,[[true,true,true,false,false,false,false,false,false,false],[true,false,true,true,false,false,false,false,false,false],[true,false,false,true,true,false,false,false,false,false],[true,false,false,false,true,true,false,false,false,false],[false,true,true,false,true,false,false,false,false,false],[false,true,false,true,false,true,false,false,false,false],[false,true,false,false,true,false,true,false,false,false],[false,false,true,true,false,false,true,false,false,false],[false,false,true,false,true,false,false,true,false,false],[false,false,false,true,true,false,false,false,true,false]]
		,[[true,true,true,true,false,false,false,false,false,false],[true,true,false,true,true,false,false,false,false,false],[true,true,false,false,true,true,false,false,false,false],[true,true,false,false,false,true,true,false,false,false],[true,true,false,false,false,false,true,true,false,false],[true,true,false,false,false,false,false,true,true,false],[true,true,false,false,false,false,false,false,true,true],[true,false,true,true,false,true,false,false,false,false],[true,false,true,false,true,false,true,false,false,false],[true,false,true,false,false,true,false,true,false,false],[true,false,true,false,false,false,true,false,true,false],[true,false,true,false,false,false,false,true,false,true],[false,true,true,true,true,false,false,false,false,false],[false,true,true,false,true,true,false,false,false,false],[false,true,true,false,false,true,true,false,false,false],[false,true,true,false,false,false,true,true,false,false],[false,true,true,false,false,false,false,false,true,true],[true,false,false,true,true,false,false,true,false,false],[true,false,false,true,false,true,false,false,true,false],[true,false,false,true,false,false,true,false,false,true],[false,true,false,true,true,false,true,false,false,false],[false,true,false,true,false,true,false,true,false,false],[false,true,true,false,false,false,false,true,true,false],[false,true,false,true,false,false,false,true,false,true],[false,false,true,true,true,true,false,false,false,false],[false,false,true,true,false,true,true,false,false,false],[false,false,true,true,false,false,false,false,true,true],[true,false,false,false,true,true,false,false,false,true],[false,true,false,true,false,false,true,false,true,false],[false,true,false,false,true,false,true,false,false,true],[false,false,true,true,false,false,false,true,true,false],[false,false,true,false,true,false,false,true,false,true],[false,false,false,true,true,false,false,false,true,true],[false,true,false,false,true,true,false,false,true,false],[false,false,true,true,false,false,true,true,false,false],[false,false,true,false,true,true,false,true,false,false],[false,false,true,false,true,false,true,false,true,false],[false,false,true,false,false,true,true,false,false,true],[false,false,false,true,true,true,true,false,false,false],[false,false,false,true,true,false,true,true,false,false],[false,false,false,true,true,false,false,true,true,false],[false,false,false,true,false,true,false,true,false,true],[false,false,false,true,false,true,true,false,true,false]]
		,[[true,true,true,false,false,false,false,false,false,false],[true,false,true,true,false,false,false,false,false,false],[true,false,false,true,true,false,false,false,false,false],[true,false,false,false,true,true,false,false,false,false],[true,false,false,false,false,true,true,false,false,false],[true,false,false,false,false,false,true,true,false,false],[true,false,false,false,false,false,false,true,true,false],[false,true,true,false,true,false,false,false,false,false],[false,true,false,true,false,true,false,false,false,false],[false,true,false,false,true,false,true,false,false,false],[false,true,false,false,false,true,false,true,false,false],[false,true,false,false,false,false,true,false,true,false],[false,true,false,false,false,false,false,true,false,true],[false,false,true,true,false,false,true,false,false,false],[false,false,true,false,true,false,false,true,false,false],[false,false,true,false,false,true,false,false,true,false],[false,false,true,false,false,false,true,false,false,true]]
		,[[true,true,true,false,false,false,false,false,false,false],[true,false,true,true,false,false,false,false,false,false],[true,false,false,true,true,false,false,false,false,false],[true,false,false,false,true,true,false,false,false,false],[true,false,false,false,false,true,true,false,false,false],[true,false,false,false,false,false,true,true,false,false],[true,false,false,false,false,false,false,true,true,false],[false,true,true,false,true,false,false,false,false,false],[false,true,false,true,false,true,false,false,false,false],[false,true,false,false,true,false,true,false,false,false],[false,true,false,false,false,true,false,true,false,false],[false,true,false,false,false,false,true,false,true,false],[false,false,true,true,false,false,true,false,false,false],[false,false,true,false,true,false,false,true,false,false],[false,false,true,false,false,true,false,false,true,false]]
		,[[true,true,true,true,false,false,false,false,false,false],[true,true,false,true,true,false,false,false,false,false],[true,true,false,false,true,true,false,false,false,false],[true,true,false,false,false,true,true,false,false,false],[true,true,false,false,false,false,true,true,false,false],[true,true,false,false,false,false,false,true,true,false],[true,false,true,true,false,true,false,false,false,false],[true,false,true,false,true,false,true,false,false,false],[true,false,true,false,false,true,false,true,false,false],[true,false,true,false,false,false,true,false,true,false],[false,true,true,true,true,false,false,false,false,false],[false,true,true,false,true,true,false,false,false,false],[false,true,true,false,false,true,true,false,false,false],[false,true,true,false,false,false,false,true,true,false],[true,false,false,true,true,false,false,true,false,false],[true,false,false,true,false,true,false,false,true,false],[false,true,false,true,true,false,true,false,false,false],[false,true,true,false,false,false,true,true,false,false],[false,true,false,true,false,false,true,false,true,false],[false,false,true,true,true,true,false,false,false,false],[false,false,true,true,false,false,false,true,true,false],[false,true,false,true,false,true,false,true,false,false],[false,true,false,false,true,true,false,false,true,false],[false,false,true,true,false,true,true,false,false,false],[false,false,true,true,false,false,true,true,false,false],[false,false,true,false,true,false,true,false,true,false],[false,false,true,false,true,true,false,true,false,false]]
		,[[true,true,true,true,false,false,false,false,false,false],[true,true,false,true,true,false,false,false,false,false],[true,true,false,false,true,true,false,false,false,false],[true,true,false,false,false,true,true,false,false,false],[true,true,false,false,false,false,true,true,false,false],[true,false,true,true,false,true,false,false,false,false],[true,false,true,false,true,false,true,false,false,false],[true,false,true,false,false,true,false,true,false,false],[true,false,true,false,false,false,true,false,true,false],[true,false,false,true,true,false,false,true,false,false],[true,false,false,true,false,true,false,false,true,false],[false,true,true,true,true,false,false,false,false,false],[false,true,true,false,true,true,false,false,false,false],[false,true,false,true,true,false,true,false,false,false],[false,true,true,false,false,false,true,true,false,false],[false,true,false,true,false,false,true,false,true,false],[false,true,true,false,false,true,true,false,false,false],[false,true,false,true,false,true,false,true,false,false],[false,true,false,false,true,true,false,false,true,false],[false,false,true,true,false,false,true,true,false,false],[false,false,true,false,true,false,true,false,true,false],[false,false,true,true,false,true,true,false,false,false],[false,false,true,false,true,true,false,true,false,false],[false,false,false,true,true,false,true,true,false,false],[false,false,false,true,false,true,true,false,true,false],[false,false,true,true,true,true,false,false,false,false],[false,false,false,true,true,true,true,false,false,false]]
		];
		this.parties2 = [[false,false,false,false,false,true,false,true,true]
		,[false,false,true,false,false,false,false,true,true]
		,[false,false,false,false,false,true,true,true,false]
		,[false,true,true,false,false,true,false]
		,[false,true,false,true,false,false,true]
		,[false,false,true,true,true,false,false,false,false]
		,[false,false,false,false,true,false,true,true,false]
		,[false,false,true,false,false,true,true,false]
		,[false,false,false,true,false,false,true,true]
		,[false,false,true,false,false,true,false,true,false]
		];
		this.noyaux2 = [[[true,true,true,false,false,false,false,false,false],[true,false,true,true,false,false,false,false,false],[true,false,false,true,true,false,false,false,false],[true,false,false,false,true,true,false,false,false],[true,false,false,false,false,true,true,false,false],[true,false,false,false,false,false,true,true,false],[true,false,false,false,false,false,false,true,true],[false,true,true,false,true,false,false,false,false],[false,true,false,true,false,true,false,false,false],[false,true,false,false,true,false,true,false,false],[false,true,false,false,false,true,false,true,false],[false,true,false,false,false,false,true,false,true],[false,false,true,true,false,false,true,false,false],[false,false,true,false,true,false,false,true,false],[false,false,true,false,false,true,false,false,true],[false,false,false,true,true,false,false,false,true]]
		,[[true,true,true,false,false,false,false,false,false],[true,false,true,true,false,false,false,false,false],[true,false,false,true,true,false,false,false,false],[true,false,false,false,true,true,false,false,false],[true,false,false,false,false,true,true,false,false],[true,false,false,false,false,false,true,true,false],[true,false,false,false,false,false,false,true,true],[false,true,true,false,true,false,false,false,false],[false,true,false,true,false,true,false,false,false],[false,true,false,false,true,false,true,false,false],[false,true,false,false,false,true,false,true,false],[false,true,false,false,false,false,true,false,true],[false,false,true,true,false,false,true,false,false],[false,false,true,false,true,false,false,true,false],[false,false,true,false,false,true,false,false,true]]
		,[[true,true,true,false,false,false,false,false,false],[true,false,true,true,false,false,false,false,false],[true,false,false,true,true,false,false,false,false],[true,false,false,false,true,true,false,false,false],[true,false,false,false,false,true,true,false,false],[true,false,false,false,false,false,true,true,false],[false,true,true,false,true,false,false,false,false],[false,true,false,true,false,true,false,false,false],[false,true,false,false,true,false,true,false,false],[false,true,false,false,false,true,false,true,false],[false,false,true,true,false,false,true,false,false],[false,false,true,false,true,false,false,true,false]]
		,[[true,true,true,false,false,false,false],[true,false,true,true,false,false,false],[false,true,true,false,true,false,false]]
		,[[true,true,true,false,false,false,false],[true,false,true,true,false,false,false],[true,false,false,true,true,false,false],[false,true,true,false,true,false,false],[false,true,false,true,false,true,false]]
		,[[true,true,true,false,false,false,false,false,false],[true,false,true,true,false,false,false,false,false],[true,false,false,true,true,false,false,false,false],[false,true,true,false,true,false,false,false,false]]
		,[[true,true,true,false,false,false,false,false,false],[true,false,true,true,false,false,false,false,false],[true,false,false,true,true,false,false,false,false],[true,false,false,false,true,true,false,false,false],[true,false,false,false,false,true,true,false,false],[true,false,false,false,false,false,true,true,false],[false,true,true,false,true,false,false,false,false],[false,true,false,true,false,true,false,false,false],[false,true,false,false,true,false,true,false,false],[false,true,false,false,false,true,false,true,false],[false,false,true,true,false,false,true,false,false],[false,false,true,false,true,false,false,true,false]]
		,[[true,true,true,false,false,false,false,false],[true,false,true,true,false,false,false,false],[true,false,false,true,true,false,false,false],[true,false,false,false,true,true,false,false],[true,false,false,false,false,true,true,false],[false,true,true,false,true,false,false,false],[false,true,false,true,false,true,false,false],[false,true,false,false,true,false,true,false],[false,false,true,true,false,false,true,false]]
		,[[true,true,true,false,false,false,false,false],[true,false,true,true,false,false,false,false],[true,false,false,true,true,false,false,false],[true,false,false,false,true,true,false,false],[true,false,false,false,false,true,true,false],[true,false,false,false,false,false,true,true],[false,true,true,false,true,false,false,false],[false,true,false,true,false,true,false,false],[false,true,false,false,true,false,true,false],[false,true,false,false,false,true,false,true],[false,false,true,true,false,false,true,false],[false,false,true,false,true,false,false,true]]
		,[[true,true,true,false,false,false,false,false,false],[true,false,true,true,false,false,false,false,false],[true,false,false,true,true,false,false,false,false],[true,false,false,false,true,true,false,false,false],[true,false,false,false,false,true,true,false,false],[false,true,true,false,true,false,false,false,false],[false,true,false,true,false,true,false,false,false],[false,true,false,false,true,false,true,false,false],[false,true,false,false,false,true,false,true,false],[false,false,true,true,false,false,true,false,false],[false,false,true,false,true,false,false,true,false]]
		];
		
		score.effacer();
		document.getElementById("suivantP").style.display = "none";
		this.tabP = new Array(0);
		this.initPieces();
		this.nP = this.nPieces();
		this.nM = this.tabP.length;
		document.getElementById("tabMarbre").innerHTML = "";
		document.getElementById("tabPiece").innerHTML = "";
		var marbre = document.getElementById("tabMarbre").insertRow();
		var piece = document.getElementById("tabPiece").insertRow();
		for(var k=0;k<this.nM;k++){
			var cellmarbre = marbre.insertCell(k);
			var cellpiece = piece.insertCell(k);
			cellmarbre.id = "m-"+k;
			cellpiece.id = "p-"+k;
			cellpiece.width = Math.round(700/this.nM)+"px";
			cellmarbre.innerHTML = "<img id=\"im-"+k+"\" class=\"marbreimage\" src=\"images/pieces/marbre.gif\"/>";
			if(this.tabP[k]){
				cellpiece.innerHTML = "<img id=\"ip-"+k+"\" class=\"pieceimage\" src=\"images/pieces/piece1.gif\"/>";
			}else{
				cellpiece.innerHTML = "<img id=\"ip-"+k+"\" class=\"marbreimage\" src=\"images/pieces/marbre.gif\" onclick=\"currentGame.click(event);\"/>";
			}
		}
		adversaire.normal();
		adversaire.effacer();
		manager.dispJeu();
	}
	start(){
		this.joueur = last;
		this.status = "play";
		this.auSuivant();
		
	}
	rejouer(){
		currentGame = new Piece1();
		currentGame.start();
	}
	auSuivant(){
		if(this.finis()){
			score.end(this.joueur);
			document.getElementById("suivantP").style.display = "initial";
			if(commence == 0){
				if(last == 1){
					last = 2;
				}else{
					last = 1;
				}
			}
			return;
		}
		if(this.joueur==1){
			this.joueur = 2;
			adversaire.dire("MMmmmmm...");
			setTimeout(this.iaJoue, 1000);
		}else{
			this.joueur = 1;
			adversaire.dire("A vous de jouer!");
		}
	}
	initPieces(){
		switch(niveau){
			case 1:
				this.tabP = new Array(0);
				this.nP = randInt(2,3);
				this.nM = 7;
				for(var k=0;k<this.nM;k++){
					this.tabP.push(false);
				}
				for(var k=0;k<this.nP;k++){
					var r = randInt(1,this.nM-1);
					while(this.tabP[r]){
						r = randInt(1,this.nM-1);
					}
					this.tabP[r] = true;
				}
				break;
			case 2:
				var i = randInt(0,this.parties2.length-1);
				this.tabP = clone(this.parties2[i]);
				this.noyau = clone(this.noyaux2[i]);
				break;
			case 3:
				var i = randInt(0,this.parties3.length-1);
				this.tabP = clone(this.parties3[i]);
				this.noyau = clone(this.noyaux3[i]);
				break;
		}
		var i = randInt(0,this.parties3.length-1);
		this.tabP = clone(this.parties3[i]);
		this.noyau = clone(this.noyaux3[i]);
	}
	nPieces(){
		var count = 0;
		for(var i=0;i<this.tabP.length;i++){
			if(this.tabP[i]){
				count++;
			}
		}
		return count;
	}
	dansNoyau(v){
		for(var k=0;k<this.noyau.length;k++){
			if(equals(this.noyau[k],v)){return true;}
		}
		return false;
	}
	deplacer(k){
		if(!this.tabP[k]){
			var prochaine = this.prochainePiece(k);
			if(prochaine!=-1){
				this.tabP[k] = true;
				this.tabP[prochaine] = false;
				document.getElementById("p-"+k).innerHTML = "<img id=\"ip-"+k+"\" class=\"pieceimage\" src=\"images/pieces/piece1.gif\"/>";
				document.getElementById("p-"+prochaine).innerHTML = "<img id=\"ip-"+prochaine+"\" class=\"marbreimage\" src=\"images/pieces/marbre.gif\" onclick=\"currentGame.click(event);\"/>";;
				this.auSuivant();
			}
		}
	}
	prochainePiece(k){
		k++;
		for(var i=k;i<this.nM;i++){
			if(this.tabP[i]){
				return i;
			}
		}
		return -1;
	}
	iaJoue(){
		if(currentGame.finis()){return;}
		switch(niveau){
			case 1:
				currentGame.coupRandom();
				return;
				break;
			case 2:
				if(Math.random()>0.5){
					currentGame.coupRandom();
					return;
				}
				break;
		}
		if(currentGame.dansNoyau(currentGame.tabP)){
			currentGame.coupRandom();
			return;
		}
		for(var k=0;k<currentGame.nM;k++){
			var v = clone(currentGame.tabP);
			currentGame.deplacerT(k, v);
			if(currentGame.dansNoyau(v)){
				currentGame.deplacer(k);
				return;
			}
		}
		currentGame.coupRandom();
	}
	deplacerT(k, tab){
		if(!tab[k]){
			var prochaine = this.prochainePieceT(k, tab);
			if(prochaine!=-1){
				tab[k] = true;
				tab[prochaine] = false;
			}
		}
	}
	prochainePieceT(k, tab){
		k++;
		for(var i=k;i<tab.length;i++){
			if(tab[i]){
				return i;
			}
		}
		return -1;
	}
	coupRandom(){
		var k = randInt(0,this.nM-1);
		while(this.tabP[k]||this.prochainePiece(k)==-1){
			k = randInt(0,this.nM-1);
		}
		this.deplacer(k);
	}
	finis(){
		return this.prochainePiece(this.nP-1)==-1;
	}
	click(event){
		var source = event.target || event.srcElement;
		this.deplacer(source.id.substring(3));
	}
}

class Piece2{
	constructor(){
		score.effacer();
		document.getElementById("suivantP").style.display = "none";
		this.tabP = new Array(0);
		this.nP = randInt(2,4);
		this.nM = randInt(7,10);
		niveau = 1;
		for(var k=0;k<this.nM;k++){
			this.tabP.push(false);
		}
		this.initPieces();
		document.getElementById("tabMarbre").innerHTML = "";
		document.getElementById("tabPiece").innerHTML = "";
		var marbre = document.getElementById("tabMarbre").insertRow();
		var piece = document.getElementById("tabPiece").insertRow();
		for(var k=0;k<this.nM;k++){
			var cellmarbre = marbre.insertCell(k);
			var cellpiece = piece.insertCell(k);
			cellmarbre.id = "m-"+k;
			cellpiece.id = "p-"+k;
			cellpiece.width = Math.round(700/this.nM)+"px";
			cellmarbre.innerHTML = "<img id=\"im-"+k+"\" class=\"marbreimage\" src=\"images/pieces/marbre.gif\"/>";
			if(this.tabP[k]){
				cellpiece.innerHTML = "<img id=\"ip-"+k+"\" class=\"pieceimage\" src=\"images/pieces/piece1.gif\"/>";
			}else{
				cellpiece.innerHTML = "<img id=\"ip-"+k+"\" class=\"marbreimage\" src=\"images/pieces/marbre.gif\" onclick=\"currentGame.click(event);\"/>";
			}
		}
		adversaire.normal();
		adversaire.effacer();
		manager.dispJeu();
	}
	start(){
		this.joueur = 2;
		this.status = "play";
		this.auSuivant();
		
	}
	rejouer(){
		currentGame = new Piece2();
		currentGame.start();
	}
	auSuivant(){
		if(this.finis()){
			score.end(this.joueur);
			document.getElementById("suivantP").style.display = "initial";
			return;
		}
		if(this.joueur==1){
			this.joueur = 2;
			adversaire.dire("Au joueur 2 de jouer");
		}else{
			this.joueur = 1;
			adversaire.dire("Au joueur 1 de jouer");
		}
	}
	initPieces(){
		for(var k=0;k<this.nP;k++){
			var r = randInt(1,this.nM-1);
			while(this.tabP[r]){
				r = randInt(1,this.nM-1);
			}
			this.tabP[r] = true;
		}
	}
	deplacer(k){
		if(!this.tabP[k]){
			var prochaine = this.prochainePiece(k);
			console.log(prochaine);
			if(prochaine!=-1){
				this.tabP[k] = true;
				this.tabP[prochaine] = false;
				document.getElementById("p-"+k).innerHTML = "<img id=\"ip-"+k+"\" class=\"pieceimage\" src=\"images/pieces/piece1.gif\"/>";
				document.getElementById("p-"+prochaine).innerHTML = "<img id=\"ip-"+prochaine+"\" class=\"marbreimage\" src=\"images/pieces/marbre.gif\" onclick=\"currentGame.click(event);\"/>";;
				this.auSuivant();
			}
		}
	}
	prochainePiece(k){
		k++;
		for(var i=k;i<this.nM;i++){
			if(this.tabP[i]){
				return i;
			}
		}
		return -1;
	}
	finis(){
		return this.prochainePiece(this.nP-1)==-1;
	}
	click(event){
		var source = event.target || event.srcElement;
		this.deplacer(source.id.substring(3));
	}
}

class Morpion2{
	constructor(){
		score.effacer();
		niveau = 1;
		this.tab = [[false,false,false],[false,false,false],[false,false,false]];
		this.tabCoup = [[false,false,false],[false,false,false],[false,false,false]];
		adversaire.normal();
		adversaire.effacer();
		this.afficher();
		manager.dispJeu();
	}
	start(){
		this.joueur = 2;
		this.status = "play";
		this.auSuivant();
	}
	finis(){
		for(var k=0;k<3;k++){
			for(var i=0;i<3;i++){
				if(!this.tab[k][i]){return false;}
			}
		}
		return true;
	}
	
	auSuivant(){
		if(this.status == "ended"){
			currentGame = new Morpion2();
			currentGame.start();
			return;
		}
		this.marquerLeCoup();
		if(this.finis()){
			score.end(this.joueur);
			document.getElementById("suivantMo").style.display = "initial";
			return;
		}
		this.tabCoup = [[false,false,false],[false,false,false],[false,false,false]];
		if(this.joueur==1){
			this.joueur = 2;
			adversaire.dire("Au joueur 2 de jouer");
		}else{
			this.joueur = 1;
			adversaire.dire("Au joueur 1 de jouer");
		}
		document.getElementById("suivantMo").style.display = "none";
	}
	marquerLeCoup(){
		for(var k=0;k<3;k++){
			for(var i=0;i<3;i++){
				this.tab[k][i] = this.tab[k][i]||this.tabCoup[k][i];
			}
		}
	}
	remplir(i,j){
		document.getElementById("c-"+i+"-"+j).innerHTML = "<img id=\"d-"+i+"-"+j+"\" class=\"pion\" src=\"images/echiquier/pion.gif\" onclick=\"currentGame.click(event);\"/>";
	}
	effacer(i,j){
		document.getElementById("c-"+i+"-"+j).innerHTML = "<div id=\"d-"+i+"-"+j+"\" class=\"pion\" onclick=\"currentGame.click(event);\"/>";
	}
	afficher(){
		for(var k=0;k<3;k++){
			for(var i=0;i<3;i++){
				if(this.tab[k][i]||this.tabCoup[k][i]){this.remplir(k+1,i+1);}else{this.effacer(k+1,i+1);}
			}
		}
	}
	coupLegal(){
		var ncolonnes = 0;
		var nlignes = 0;
		for(var k=0;k<3;k++){
			for(var i=0;i<3;i++){
				if(this.tabCoup[k][i]){
					nlignes++;
					break;
				}
			}
		}
		for(var k=0;k<3;k++){
			for(var i=0;i<3;i++){
				if(this.tabCoup[i][k]){
					ncolonnes++;
					break;
				}
			}
		}
		if(ncolonnes==1||nlignes==1){
			return true;
		}
		return false;
	}
	poser(i,j){
		if(this.tabCoup[i-1][j-1]||this.tab[i-1][j-1]){
			this.tabCoup[i-1][j-1] = false;
		}else{
			this.tabCoup[i-1][j-1] = true;
			if(!this.coupLegal()){
				this.tabCoup[i-1][j-1] = false;
			}else{
				document.getElementById("suivantMo").style.display = "initial";
			}
		}
		this.afficher();
	}
	click(event){
		var source = event.target || event.srcElement;
		console.log(source.id);
		this.poser(source.id.substring(2,3),source.id.substring(4,5));
	}
}

class Morpion1{
	constructor(){
		score.effacer();
		this.noyal = [[false,false,false,false,false,false,false,false,false],[false,true,true,false,true,false,false,false,false],[false,false,false,false,true,true,false,false,true],[false,false,false,false,true,false,true,true,false],[true,false,false,true,true,false,false,false,false],[true,true,false,false,true,false,false,false,false],[false,false,false,true,true,false,true,false,false],[false,false,false,false,true,false,false,true,true],[false,false,true,false,true,true,false,false,false],[false,true,true,false,false,true,false,false,false],[true,true,false,true,false,false,false,false,false],[false,false,false,true,false,false,true,true,false],[false,false,false,false,false,true,false,true,true],[true,true,false,true,false,false,false,false,false],[false,false,false,true,false,false,true,true,false],[false,false,false,false,false,true,false,true,true],[false,false,true,false,false,true,false,false,true],[true,false,true,false,false,false,true,false,false],[true,false,true,false,false,false,false,false,true],[false,false,true,false,false,false,true,false,true],[true,false,false,false,false,false,true,false,true],[false,false,true,true,false,false,false,true,false],[false,true,false,true,false,false,false,false,true],[false,true,false,false,false,true,true,false,false],[true,false,false,false,false,true,false,true,false],[false,true,false,true,true,false,false,false,false],[false,true,false,false,true,true,false,false,false],[false,false,false,false,true,true,false,true,false],[false,false,false,true,true,false,false,true,false],[false,false,true,false,true,false,true,false,false],[true,false,false,false,true,false,false,false,true],[true,false,false,false,true,true,false,true,true],[false,false,true,true,true,false,true,true,false],[true,true,false,true,true,false,false,false,true],[false,true,true,false,true,true,true,false,false],[true,false,false,true,false,false,true,true,true],[true,true,true,true,false,false,true,false,false],[true,true,true,false,false,true,false,false,true],[false,false,true,false,false,true,true,true,true],[true,true,true,false,true,false,false,true,false],[false,false,true,true,true,true,false,false,true],[false,true,false,false,true,false,true,true,true],[true,false,false,true,true,true,true,false,false],[true,false,true,true,false,true,false,true,false],[false,true,true,true,false,false,false,true,true],[false,true,false,true,false,true,true,false,true],[true,true,false,false,false,true,true,true,false],[false,true,false,true,true,true,false,true,false],[true,false,true,false,true,false,true,false,true],[true,true,false,true,true,true,false,true,true],[false,true,true,true,true,true,true,true,false],[true,true,false,true,false,true,true,true,true],[true,true,true,true,false,true,true,true,false],[true,true,true,true,false,true,false,true,true],[false,true,true,true,false,true,true,true,true],[true,false,true,false,true,true,true,true,true],[true,false,true,true,true,false,true,true,true],[true,true,true,true,true,false,true,false,true],[true,true,true,false,true,true,true,false,true],[true,true,false,false,true,true,true,true,true],[true,false,true,true,true,true,true,true,false],[true,true,true,true,true,false,false,true,true],[false,true,true,true,true,true,true,false,true],[false,true,true,true,true,false,true,true,true],[true,false,true,true,true,true,false,true,true],[true,true,true,false,true,true,true,true,false],[true,true,false,true,true,true,true,false,true],[true,true,true,true,true,true,true,true,true]];
		this.tab = [[false,false,false],[false,false,false],[false,false,false]];
		this.tabCoup = [[false,false,false],[false,false,false],[false,false,false]];
		adversaire.normal();
		adversaire.effacer();
		this.afficher();
		manager.dispJeu();
	}
	start(){
		this.joueur = last;
		this.status = "play";
		this.auSuivant();
	}
	finis(){
		for(var k=0;k<3;k++){
			for(var i=0;i<3;i++){
				if(!this.tab[k][i]){return false;}
			}
		}
		return true;
	}
	
	auSuivant(){
		if(this.status == "ended"){
			currentGame = new Morpion1();
			currentGame.start();
			return;
		}
		this.marquerLeCoup();
		if(this.finis()){
			document.getElementById("suivantMo").style.display = "initial";
			score.end(this.joueur);
			if(commence == 0){
				if(last == 1){
					last = 2;
				}else{
					last = 1;
				}
			}
			return;
		}
		this.tabCoup = [[false,false,false],[false,false,false],[false,false,false]];
		if(this.joueur==1){
			this.joueur = 2;
			adversaire.dire("MMmmmmm...");
			setTimeout(this.iaJoue, 1000);
		}else{
			this.joueur = 1;
			adversaire.dire("A vous de jouer!");
		}
		document.getElementById("suivantMo").style.display = "none";
	}
	iaJoue(){
		switch(niveau){
			case 1:
				currentGame.coupRandom();
				currentGame.auSuivant();
				return;
				break;
			case 2:
				if(Math.random()>0.5){
					currentGame.coupRandom();
					currentGame.auSuivant();
					return;
				}
				break;
			}
		if(!currentGame.dansNoyal(currentGame.tab)){
			for(var dir=0;dir<=1;dir++){
				for(var li=0;li<3;li++){
					for(var dep=0;dep<3;dep++){
						for(var lo=3;lo>=1;lo--){
							var dirl;
							if(dir==0){
								dirl = "horizontal";
							}else{
								dirl = "vertical";
							}
							currentGame.tabCoup = [[false,false,false],[false,false,false],[false,false,false]];
							if(currentGame.jouer(dirl,li,dep,lo)!=0){
								if(currentGame.dansNoyal(currentGame.fusionner(currentGame.tab,currentGame.tabCoup))){
									currentGame.auSuivant();
									currentGame.afficher();
									return;
								}
							}
						}
					}
				}
			}
			currentGame.tabCoup = [[false,false,false],[false,false,false],[false,false,false]];
		}
		currentGame.coupRandom();
		currentGame.auSuivant();
	}
	dansNoyal(v){
		var u = new Array(0);
		for(var k=0;k<3;k++){
			for(var i=0;i<3;i++){
				u.push(v[k][i]);
			}
		}
		for(var k=0;k<this.noyal.length;k++){
			if(equals(this.noyal[k],u)){return true;}
		}
		return false;
	}
	coupRandom(){
		while(this.coupRandomT()==0){}
		this.afficher();
	}
	coupRandomT(){
		var direction;
		if(Math.random()>0.5){
			direction = "horizontal";
		}else{
			direction = "vertical";
		}
		var ligne = randInt(0,2);
		var depart = randInt(0,2);
		var longueur = randInt(1,3); 
		return this.jouer(direction, ligne, depart, longueur);
	}
	jouer(direction, ligne, depart, longueur){
		var nJetons=0;
		if(direction=="horizontal"){
			for(var i=0;i<longueur;i++){
				if(!this.tab[ligne][(depart+i)%3]){
					nJetons++;
				}
				this.tabCoup[ligne][(depart+i)%3] = true;
			}
		}else if(direction=="vertical"){
			for(var i=0;i<longueur;i++){
				if(!this.tab[(depart+i)%3][ligne]){
					nJetons++;
				}
				this.tabCoup[(depart+i)%3][ligne] = true;
			}
		}
		return nJetons;
	}
	marquerLeCoup(){
		this.tab = this.fusionner(this.tab,this.tabCoup);
	}
	fusionner(tab1,tab2){
		var r = new Array(3);
		for(var k=0;k<3;k++){
			r[k] = new Array(3);
			for(var i=0;i<3;i++){
				r[k][i] = tab1[k][i]||tab2[k][i];
			}
		}
		return r;
	}
	remplir(i,j){
		document.getElementById("c-"+i+"-"+j).innerHTML = "<img id=\"d-"+i+"-"+j+"\" class=\"pion\" src=\"images/echiquier/pion.gif\" onclick=\"currentGame.click(event);\"/>";
	}
	effacer(i,j){
		document.getElementById("c-"+i+"-"+j).innerHTML = "<div id=\"d-"+i+"-"+j+"\" class=\"pion\" onclick=\"currentGame.click(event);\"/>";
	}
	afficher(){
		for(var k=0;k<3;k++){
			for(var i=0;i<3;i++){
				if(this.tab[k][i]||this.tabCoup[k][i]){this.remplir(k+1,i+1);}else{this.effacer(k+1,i+1);}
			}
		}
	}
	coupLegal(){
		var ncolonnes = 0;
		var nlignes = 0;
		for(var k=0;k<3;k++){
			for(var i=0;i<3;i++){
				if(this.tabCoup[k][i]){
					nlignes++;
					break;
				}
			}
		}
		for(var k=0;k<3;k++){
			for(var i=0;i<3;i++){
				if(this.tabCoup[i][k]){
					ncolonnes++;
					break;
				}
			}
		}
		if(ncolonnes==1||nlignes==1){
			return true;
		}
		return false;
	}
	poser(i,j){
		if(this.tabCoup[i-1][j-1]||this.tab[i-1][j-1]){
			this.tabCoup[i-1][j-1] = false;
		}else{
			this.tabCoup[i-1][j-1] = true;
			if(!this.coupLegal()){
				this.tabCoup[i-1][j-1] = false;
			}else{
				document.getElementById("suivantMo").style.display = "initial";
			}
		}
		this.afficher();
	}
	click(event){
		if(currentGame.joueur==2){return;}
		var source = event.target || event.srcElement;
		console.log(source.id);
		this.poser(source.id.substring(2,3),source.id.substring(4,5));
	}
}

class Adversaire{
	constructor(){}
	normal(){
		document.getElementById("adversaire").src = "images/adversaire/niveauAdversaire"+niveau+"/3.gif";
	}
	triste(){
		document.getElementById("adversaire").src = "images/adversaire/niveauAdversaire"+niveau+"/1.gif";
	}
	content(){
		document.getElementById("adversaire").src = "images/adversaire/niveauAdversaire"+niveau+"/5.gif";
	}
	dire(text){
		document.getElementById("bulle").style.display = "initial";
		document.getElementById("bulle-text").style.display = "initial";
		document.getElementById("bulle-text").innerHTML = text;
	}
	effacer(){
		document.getElementById("bulle-text").style.display = "none";
		document.getElementById("bulle").style.display = "none";
	}
}

class Score1{
	constructor(){
		this.pj1 = 0;
		this.pj2 = 0;
		document.getElementById("j1").innerHTML = "<text>Joueur</text>";
		document.getElementById("j2").innerHTML = "<text>Ordi</text>";
		this.disp();
	}
	end(gagnant){
		currentGame.status = "ended";
		if(gagnant == 1){
			this.pj1++;
			document.getElementById("gagnant").innerHTML = "Gagné!";
			adversaire.triste();
		}else{
			this.pj2++;
			document.getElementById("gagnant").innerHTML = "Perdu!";
			adversaire.content();
		}
		adversaire.effacer();
		document.getElementById("gagnant").style.display = "initial";
		this.disp();
	}
	disp(){
		document.getElementById("s1").innerHTML = "<text>"+this.pj1+"</text>";
		document.getElementById("s2").innerHTML = "<text>"+this.pj2+"</text>";
	}
	effacer(){
		document.getElementById("gagnant").style.display = "none";
	}
}
class Score2{
	constructor(){
		this.pj1 = 0;
		this.pj2 = 0;
		document.getElementById("j1").innerHTML = "<text>Joueur 1</text>";
		document.getElementById("j2").innerHTML = "<text>Joueur 2</text>";
		this.disp();
	}
	end(gagnant){
		currentGame.status = "ended";
		if(gagnant == 1){
			this.pj1++;
			document.getElementById("gagnant").innerHTML = "Joueur 1 a gagné!";
		}else{
			this.pj2++;
			document.getElementById("gagnant").innerHTML = "Joueur 2 a gagné!";
		}
		adversaire.effacer();
		document.getElementById("gagnant").style.display = "initial";
		this.disp();
	}
	disp(){
		document.getElementById("s1").innerHTML = "<text>"+this.pj1+"</text>";
		document.getElementById("s2").innerHTML = "<text>"+this.pj2+"</text>";
	}
	effacer(){
		document.getElementById("gagnant").style.display = "none";
	}
}

function clone(t){
	var c = new Array(0);
	t.forEach(function(e){c.push(e);});
	return c;
}
function randInt(a,b){
	return Math.round((b-a)*Math.random())+a;
}
function equals(t1, t2){
	var eq = true;
	for(var k=0;k<t1.length;k++){
		eq = eq&&(t1[k]==t2[k]);
	}
	return eq;
}
