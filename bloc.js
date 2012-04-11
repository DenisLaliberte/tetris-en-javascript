
/* ********** ********** ********** ********** ********** ********** ********** */
				//objet bloc et jeu
/* ********** ********** ********** ********** ********** ********** ********** */

var POSITION_DEPART =460;
var BLEU = 0;
var VERT = 1;
var ROUGE = 2;
var JAUNE = 3;
var tableauStyle = new Array();
tableauStyle[0] = "bleu";
tableauStyle[1] = "vert";
tableauStyle[2] = "rouge";
tableauStyle[3] = "jaune";
var DIMENSION_BLOC = 40; //dimension largeur et hauteur d'un bloc, en px 
var NOMBRE_BLOC_LIGNE = 3; //nombre de bloc pour faire une ligne valide
var LIMITTE_GAUCHE =100;
var LIMITTE_DROITE =900;
var NOMBRE_LIGNE_MAX = 14;
var PLANCHER = 580;
var NOMBRE_COLONNE = 10;

function Jeu(){
    var idBloc = 0;
    var blocActif;
    var tableauPlancher = new Array();
    var tableauBloc = new Array(10,10);
    // TODO: a tester plus tard, je ne suis pas sur s'il faut initialiser un array
    //mais ça bugais avant que je le fasse
    for (var i = 0;i<NOMBRE_LIGNE_MAX+1;i++){
        tableauBloc[i]=new Array();
    	for (var j = 0;j<NOMBRE_COLONNE;j++){
    		tableauBloc[i][j]=0;
	}
    }
    for (var i=0;i<NOMBRE_COLONNE;i++){
		tableauPlancher[i]=0;
	}
    function nouveauBloc{
        blocActif = new bloc(idBloc,tableauBloc);
        idBloc++;
        return bloc;
    }
    function ajoutBloc(){
        blocActif.ligne = tableauPlancher[blocActif.colonne];
        tableauBloc[blocActif.ligne][blocActif.colonne] = blocActif;
    }
    function verifierLigne(){
        for(var i=0;i<10;i++){
	    for(var j;j<10;j++){
	        var retour = tableauBloc[i][j].validerLigne(0);	
		//TODO : faire la même choses pour les colonnes
	    }
	}
}

function Bloc(id,tableau){
	//initialisation
	this.actif=true;
	this.id=id;
        this.tableau=tableau;
	this.idCSS="bloc"+id;
	this.y = 10;
	this.nouveauX = 0;
	this.vitesse = 1;
	this.couleur = Math.round((Math.random() * 3) );
        this.style = tableauStyle[this.couleur];
	this.colonne = NOMBRE_COLONNE/2;
        this.ligne = 0;
        this.direction=0;
        this.rotation = false;
        this.acceleration = false;
// debug :
        console.log("initialisation du bloc : "+id
			+"couleur : "+this.couleur
			+"style : " +this.style);
	//creer le div et en garder une référence
	$("#jeu").append( $("<div id='"+this.idCSS
				+"'class='bloc "
				+this.style+"' ></div>") );
	this.div = document.getElementById(this.idCSS);
        this.xCourant =parseInt(this.div.offsetLeft) + POSITION_DEPART;
//debug	
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
//debug :
                    console.log("bloc deplacement this.colonne"+this.colonne);
			}
		}
	//rotation du bloc
	    if(rotation){
		    //TODO : rotation
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
    function validerLigne(compteur){
    /*valide pour un bloc si les suivants sur la lignes sont de la même couleur
    s'il y en as plus de 3 en ligne ils sont tous retiré. la fonction retourne le
    nombre de bloc à retirer*/
	var suivante = this.colone+1;
	if(this.couleur == this.tableau[this.ligne][suivante].couleur) {
	//si le bloc suivant est de la même couleur on avance et on compte
	    compteur++;
            var nombreARetirer = this.tableau[this.ligne][suivante].validerLigne(compteur);
	}
	else if(compteur < NOMBRE_BLOC_LIGNE ){
	//si le bloc suivant n'est pas de la même couleur et qu'on en as compté
	//moins de 3 on retourne 0 bloc à retirer 
		return 0;
	}
	else{
	//si on as compté plus de trois bloc de même couleur on incrémente le compteur	
	//et on l'assigne aux blos à retirer
		nombreARetirer = compteur++;
	}
	if(nombreARetirer > 0){
		//on retire le div du html et l'objet du tableau
		$("#"+id).remove();
		tableauBloc[ligne].splice(colonne,1);
		nombreARetirer--;
		return nombreARetirer;
	}
	else{
	 return 0;
	}
}
}
