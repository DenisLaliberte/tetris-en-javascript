
/* ********** ********** ********** ********** ********** ********** ********** */
				//objet bloc
/* ********** ********** ********** ********** ********** ********** ********** */

var POSITION_DEPART =Math.round( (NOMBRE_COLONNE/2)*DIMENSION_BLOC);

var BLEU = 0;
var VERT = 1;
var ROUGE = 2;
var JAUNE = 3;
var tableauStyle = new Array();
tableauStyle[0] = "bleu";
tableauStyle[1] = "vert";
tableauStyle[2] = "rouge";
tableauStyle[3] = "jaune";
function Bloc(id){
	//initialisation
	this.actif=true;
	this.id=id;
	this.idCSS="bloc"+id;
	this.y = 10;
	this.nouveauX = 0;
	this.vitesse = 1;
	this.couleur = Math.round((Math.random() * 3) );
        this.style = tableauStyle[this.couleur];
	this.colonne = NOMBRE_COLONNE/2;
	console.log("initialisation du bloc : "+id
			+"couleur : "+this.couleur
			+"style : " +this.style);
	//creer le div et en garder une référence
	$("#jeu").append( $("<div id='"+this.idCSS
				+"'class='bloc "
				+this.style+"' ></div>") );
	this.div = document.getElementById(this.idCSS);
        this.xCourant =parseInt(this.div.offsetLeft) + POSITION_DEPART;
	console.log("Bloc()initialisation POSITION_DEPART"+POSITION_DEPART);
	console.log("Bloc() initialisation this.div.offsetLeft"+parseInt(this.div.offsetLeft));
	console.log("Bloc() initialisation this.xCourant : " + this.xCourant );
	this.div.style.left = this.xCourant + "px";

	console.log("Bloc() initialisation this.div.offsetLeft"+parseInt(this.div.offsetLeft));

	this.tic = function() {
	//fonction qui gere le rythme de l'annimation du bloc
		
		if(direction!=0){		
		//deplacement horizontal
			this.xCourant = this.div.offsetLeft;
			this.nouveauX = this.xCourant +( DIMENSION_BLOC * direction);
			
			if(this.nouveauX > LIMITTE_GAUCHE 
				&& this.nouveauX < LIMITTE_DROITE){
				this.div.style.left = this.nouveauX + "px";
				this.colonne +=direction;
				console.log("bloc deplacement this.colonne"+this.colonne);
			}
		}
		//rotation du bloc
		if(rotation){
			console.log("rotation");
			rotation = false ;
		}
		if(!acceleration){
			this.vitesse=1;
		}
		else {
			this.vitesse=5;
		}
		
		//deplacement vertical
		this.y+=this.vitesse;
		this.div.style.top = this.y + "px";	
		
		//validation arret
		
		//calcul du plancher de la colonne que le bloc descend
		var plancherColonne = PLANCHER -( tableauPlancher[this.colonne]*DIMENSION_BLOC);	
		if( this.y >plancherColonne ){
			console.log("Bloc() plancherClonne atteint"+tableauPlancher[this.colonne]);
			this.actif = false;
			tableauPlancher[this.colonne]+=1;
			if(tableauPlancher[this.colonne] > NOMBRE_LIGNE_MAX){
				console.log("Bloc() validationArret GAMEOVER")
				gameOver = true;
			}
		}
		
	}
}
