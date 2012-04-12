/* ********** ********** ********** ********** ********** ********** ********** */
				//objet bloc et jeu
/* ********** ********** ********** ********** ********** ********** ********** */
var BLEU = 0;
var VERT = 1;
var ROUGE = 2;
var JAUNE = 3;
var tableauStyle = new Array();
tableauStyle[0] = "bleu";
tableauStyle[1] = "vert";
tableauStyle[2] = "rouge";
tableauStyle[3] = "jaune";
var DIMENSION_BLOC = 80; //dimension largeur et hauteur d'un bloc, en px 
var NOMBRE_BLOC_LIGNE = 4; //nombre de bloc pour faire une ligne valide
var LIMITTE_GAUCHE =-5;
var LIMITTE_DROITE =725;
var COLONNE_DEPART = 4;
var NOMBRE_LIGNE_MAX = 7;
var PLANCHER = 520;
var NOMBRE_COLONNE = 10;
function Jeu(){
    var idBloc = 0;
    var blocActif;
    this.tableauPlancher = new Array();
    this.tableauBloc = new Array(10,10);
    // TODO: a tester plus tard, je ne suis pas sur s'il faut initialiser un array
    //mais ça bugais avant que je le fasse
    for (var i = 0;i<NOMBRE_LIGNE_MAX+1;i++){
        this.tableauBloc[i]=new Array();
    	for (var j = 0;j<NOMBRE_COLONNE;j++){
    		this.tableauBloc[i][j]=0;
	}
    }
    for (var i=0;i<NOMBRE_COLONNE;i++){
	this.tableauPlancher[i]=0;
    }
    this.nouveauBloc = function() {
        blocActif = new Bloc(idBloc,this);
        idBloc++;
        return blocActif;
    }
    this.ajoutBloc = function() {
        blocActif.ligne =this.tableauPlancher[blocActif.colonne];
        this.tableauBloc[blocActif.ligne][blocActif.colonne] = blocActif;
    }
    this.verifierLigne = function() {
        for(var i=0;i<10;i++){
	    for(var j=0;j<10;j++){
                //if(this.tableauBloc[i][j] != 0 ){
	        // todo fonction à debuger var retour = this.tableauBloc[i][j].validerLigne(0);	
		//TODO : faire la même choses pour les colonnes
	    }
        }
    }
    
    this.finPartie = function(){
//debug :
        console.log("finpartie");
        //retire tout les blocs a la fin d'une partie
        for(var i=0;i<10;i++){
	    for(var j=0;j<10;j++){
                console.log("retirer"+i+j)
                this.tableauBloc[i][j].retirer();	
	    }
        }
        $("#gameOver").remove();
        initialisation();
    }
}

function Bloc(id,jeu){
	//initialisation
	this.actif=true;

	this.id=id;
	this.idCSS="bloc"+id;
        this.jeu=jeu;

	this.y = 10;
	this.nouveauX = 0;
        this.colonne = COLONNE_DEPART;
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
	var suivante = this.colone+1;
	
        if(this.jeu.tableauBloc[this.ligne][suivante] != 0){
            if(this.couleur == this.jeu.tableauBloc[this.ligne][suivante].couleur) {
	//si le bloc suivant est de la même couleur on avance et on compte
	        compteur++;
                var nombreARetirer = this.jeu.tableauBloc[this.ligne][suivante].validerLigne(compteur);
	    }
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
		this.tableauBloc[ligne].splice(colonne,1);
		nombreARetirer--;
		return nombreARetirer;
	}
	else{
	 return 0;
	}
    }
    this.retirer = function(){
        console.log("retire"+this.idCSS)
        this.div.remove();
    }
}
