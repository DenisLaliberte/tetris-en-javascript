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
var NOMBRE_BLOC_LIGNE = 3 // pour qu'une ligne soit retirer elle doit être
function Bloc(id,structure){
	//initialisation
console.log("Bloc.js initialisation "+id)
	this.id=id;
	this.idCSS="bloc"+id;
        this.structure = structure;
        this.jeu=this.structure.jeu;
	this.y = 10;
	this.nouveauX = 0;
        this.colonne =  COLONNE_DEPART ;
        this.ligne = 0;
        this.nbBlocPlancher = 0;
        this.yPlancher = 0;
        
	this.vitesse = 1;
        this.couleur =structure.couleur; 
        this.style = tableauStyle[this.couleur];
	
	//creer le div et en garder une référence
	$("#jeu").append( $("<div id='"+this.idCSS
				+"'class='bloc "
				+this.style+"' ></div>") );
	this.div = document.getElementById(this.idCSS);
    this.tic = function() {
    //fonction qui gere le rythme de l'annimation du bloc
        
    	if(this.structure.direction!=0){		
            this.deplacementHorizontal();
        }
        this.deplacementVerical();	
    }

    this.deplacementHorizontal = function(){
	this.xCourant = this.div.offsetLeft;
        this.nouveauX = this.xCourant +( DIMENSION_BLOC *this.direction);
			
	if(this.nouveauX > LIMITTE_GAUCHE 
		&& this.nouveauX < LIMITTE_DROITE){
	    //si le bloc ne sort pas des limites du cadre, modifier la
            //valeur du x 
            this.div.style.left = this.nouveauX + "px";
            this.colonne +=this.direction;
	    this.calculerPlancher();
        }
    }

    this.rotationBloc = function(){
    
            //TODO : rotation
            console.log("rotation");
            rotation = false ;
    
    }
    this.deplacementVerical = function(){
    
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
	if( this.y >this.yPlancher ){
	    this.structure.actif = false;
	    if((this.nbBlocPlancher +1) > NOMBRE_LIGNE_MAX){
		gameOver = true;
	    }
        } 
    }

    this.calculerPlancher=function(){
        this.nbBlocPlancher = this.jeu.calculerPlancher(this.colonne);
        this.yPlancher =PLANCHER-(this.nbBlocPlancher*DIMENSION_BLOC);  
    }
    //calculer le plancher une premiere fois lors de l'initialisation de
    //l'objet :
    this.calculerPlancher();
    

    this.validerLigne = function(compteur){
    /*valide pour un bloc si les suivants sur la lignes sont de la même couleur
    s'il y en as plus de 3 en ligne ils sont tous retiré. la fonction retourne le
    nombre de bloc à retirer*/
        
        var suivante = this.colonne+1;
        var nombreARetirer;
        if( this.jeu.tableauBloc[this.ligne][suivante] instanceof Bloc){
	        compteur++;
                nombreARetirer = this.jeu.tableauBloc[this.ligne][suivante].validerLigne(compteur);
        }
	else if(compteur < NOMBRE_BLOC_LIGNE ){
	//si le bloc suivant n'est pas de la même couleur et qu'on en as compté
	//moins de 3 on retourne 0 bloc à retirer 
		return 0;
	}
	else{
	//si on as compté un ligne complète on incrémente le compteur	
	//et on l'assigne aux blos à retirer
		nombreARetirer = compteur+2;
	}
	if(nombreARetirer > 0){
	    //on retire le div du html et l'objet du tableau
            $("#"+this.idCSS).remove();
		
            this.jeu.tableauBloc[this.ligne][this.colonne]=0;
            if(this.jeu.tableauBloc[this.ligne+1][this.colonne] instanceof Bloc) {
		this.jeu.tableauBloc[this.ligne+1][this.colonne].descendreBloc();
            }
            nombreARetirer--;
	    return nombreARetirer;
	}
	else{
	 return 0;
	}
    }
    this.descendreBloc=function(){
                
	this.div.style.top = this.y +DIMENSION_BLOC+ "px";	
        this.jeu.tableauBloc[this.ligne-1][this.colonne] = this;
        this.jeu.tableauBloc[this.ligne][this.colonne] = 0;
        if(this.jeu.tableauBloc[this.ligne+1][this.colonne] instanceof Bloc){
            this.jeu.talbeauBloc[this.ligne+1][this.colonne].descendreBloc();
        }
    }

}
