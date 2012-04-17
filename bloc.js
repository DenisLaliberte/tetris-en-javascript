
/* ********** ********** ********** ********** ********** ********** ********** */
                                //objet bloc
/* ********** ********** ********** ********** ********** ********** ********** */
var BLEU = 0;
var VERT = 1;
var ROUGE = 2;
var JAUNE = 3;
var COLONNE_DEPART = 4;
var tableauStyle = new Array();
tableauStyle[0] = "bleu";
tableauStyle[1] = "vert";
tableauStyle[2] = "rouge";
tableauStyle[3] = "jaune";
var DIMENSION_BLOC = 80; //dimension largeur et hauteur d'un bloc, en px 

function Bloc(id,jeu){
	//initialisation
	this.actif=true;

	this.id=id;
	this.idCSS="bloc"+id;
        this.jeu=jeu;

	this.y = 10;
	this.nouveauX = 0;
        this.colonne =  COLONNE_DEPART ;
        this.ligne = 0;
        
	this.vitesse = 1;
        this.direction=0;
        this.rotation = false;
        this.acceleration = false;
	
        this.couleur = Math.round((Math.random() * 3) );
        this.style = tableauStyle[this.couleur];
	
        
	//creer le div et en garder une référence
	$("#jeu").append( $("<div id='"+this.idCSS
				+"'class='bloc "
				+this.style+"' ></div>") );
	this.div = document.getElementById(this.idCSS);

    this.tic = function() {
    //fonction qui gere le rythme de l'annimation du bloc
		
    	if(this.direction!=0){		
    	//deplacement horizontal
	    this.xCourant = this.div.offsetLeft;
            this.nouveauX = this.xCourant +( DIMENSION_BLOC *this.direction);
			
	    if(this.nouveauX > LIMITTE_GAUCHE 
		&& this.nouveauX < LIMITTE_DROITE){
		
                this.div.style.left = this.nouveauX + "px";

if(DEBUG)       console.log("bloc || tic() colonne "+this.colonne)
                this.colonne +=this.direction;
	    }
	}
	//rotation du bloc
	if(this.rotation){
            //TODO : rotation
            console.log("rotation");
            rotation = false ;
	}

	//deplacement vertical
        if(!this.acceleration){
            this.vitesse=1;
	}
	else {
            this.vitesse=5;
	}
    	this.y+=this.vitesse;
	this.div.style.top = this.y + "px";	
    	
        //validation arret	
	//calcul du plancher de la colonne que le bloc descend
	var plancherColonne = PLANCHER -( this.jeu.tableauPlancher[this.colonne]*DIMENSION_BLOC);	
	if( this.y >plancherColonne ){
	    this.actif = false;
	    this.jeu.tableauPlancher[this.colonne]+=1;
	    if(this.jeu.tableauPlancher[this.colonne] > NOMBRE_LIGNE_MAX){
		console.log("Bloc() validationArret GAMEOVER")
		gameOver = true;
	    }
    	}
		
    }
    this.validerLigne = function(compteur){
    /*valide pour un bloc si les suivants sur la lignes sont de la même couleur
    s'il y en as plus de 3 en ligne ils sont tous retiré. la fonction retourne le
    nombre de bloc à retirer*/
        
        var suivante = this.colonne+1;
        var nombreARetirer
if(DEBUG){
        console.log("bloc ||valider compteur"+compteur);
        console.log("bloc || valider ligne" +this.ligne + this.colonne);
        console.log("bloc || objet suivant : "+suivante+ this.jeu.tableauBloc[this.ligne][suivante])
}
        if( this.jeu.tableauBloc[this.ligne][suivante]!= 0){
	        compteur++;
                nombreARetirer = this.jeu.tableauBloc[this.ligne][suivante].validerLigne(compteur);
        }
	else if(compteur < NOMBRE_BLOC_LIGNE ){
	//si le bloc suivant n'est pas de la même couleur et qu'on en as compté
	//moins de 3 on retourne 0 bloc à retirer 
		return 0;
	}
	else{
	//si on as compté plus de trois bloc de même couleur on incrémente le compteur	
	//et on l'assigne aux blos à retirer
		nombreARetirer = compteur+2;
	}
	if(nombreARetirer > 0){
		//on retire le div du html et l'objet du tableau
if(DEBUG)   console.log("bloc ||valider ligne nombreARetirer"+nombreARetirer)
                $("#"+this.idCSS).remove();
		this.jeu.tableauBloc[this.ligne][this.colonne]=0;
		nombreARetirer--;
		return nombreARetirer;
	}
	else{
	 return 0;
	}
    }
}



