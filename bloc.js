/* ********** ********** ********** ********** ********** ********** ********** */
                                //objet bloc
/* ********** ********** ********** ********** ********** ********** ********** */



//constante
var BLEU = 0;
var VERT = 1;
var ROUGE = 2;
var JAUNE = 3;
var tableauStyle = new Array();
tableauStyle[0] = "bleu";
tableauStyle[1] = "vert";
tableauStyle[2] = "rouge";
tableauStyle[3] = "jaune";

function Bloc(id,structure){
	//initialisation
	this.id=id;
	this.idCSS="bloc"+id;
        this.structure = structure;
        this.jeu=this.structure.jeu;
	this.y = 10;
	this.nouveauX = 0;
        this.colonne =  this.jeu.COLONNE_DEPART ;
        this.ligne = 0;
        this.nbBlocPlancher = 0;
        
        this.couleur =structure.couleur; 
        this.style = tableauStyle[this.couleur];
	
	//creer le div et en garder une référence
	$("#jeu").append( $("<div id='"+this.idCSS
				+"'class='bloc "
				+this.style+"' ></div>") );
	this.div = document.getElementById(this.idCSS);
    
    
    
    this.positionnement=function(structureX,structureY,
                                positionX,positionY,
                                ligneStructure,colonneStructure){
        this.div.style.left =structureX+(positionX * this.jeu.DIMENSION_BLOC);  
        this.div.style.top =structureY+(positionY * this.jeu.DIMENSION_BLOC);
        
        //todo : verifier si le x y est bien ligne colonne
        this.ligne = ligneStructure + positionY;
        this.colonne = colonneStructure + positionX;
    
    }

    this.validationHorizontale = function(direction){
        valide =true
        nouvelleColonne = this.colonne+direction;	
	if(nouvelleColonne < 0 || nouvelleColonne > this.jeu.NOMBRE_COLONNE){
            //valider qu'on ne sort pas des limittes du jeu
            valide = false;
        }
        
        if(this.jeu.verifierBloc(this.ligne,nouvelleColonne)){
            valide = false;
        }
        
        return valide;
    }

    this.validationVerticale = function(){
            valide = true;
            if (this.jeu.verifierBloc(this.ligne+1,this.colonne)){
                //valider qu'on ne rentre pas dans un bloc
	        valide = false;
	        if(this.ligne==0){
                    jeu.gameOver = true;
                }
            }
            if(this.ligne+1 ==this.jeu.NOMBRE_LIGNE){
               //valider qu'on viens d'atteindre le plancher
                valide = false;
            
            }
            
        return valide;
    }
    
    this.validerLigne = function(compteur){
    /*valide pour un bloc si les suivants sur la lignes sont de la même couleur
    s'il y en as plus de 3 en ligne ils sont tous retiré. la fonction retourne le
    nombre de bloc à retirer*/
        console.log("valider",this.idCSS);
        var suivante = this.colonne+1;
        var nombreARetirer;
        if( this.jeu.tableauBloc[this.ligne][suivante] instanceof Bloc){
	        compteur++;
                nombreARetirer = this.jeu.tableauBloc[this.ligne][suivante].validerLigne(compteur);
                console.log(nombreARetirer);
        }
	else if(compteur < this.jeu.NOMBRE_BLOC_LIGNE ){
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
            if(this.jeu.tableauBloc[this.ligne-1][this.colonne] instanceof Bloc) {
		this.jeu.tableauBloc[this.ligne-1][this.colonne].descendreBloc();
            } 
            console.log("bloc.validerLigne, nombre a retirer",
                                nombreARetirer,"bloc x",
                                this.ligne,"y",this.colonne,"idCss",this.idCSS);
            nombreARetirer--;
            return nombreARetirer;
	}
	else{
	 return 0;
	}
    }
    this.descendreBloc=function(){
                console.log("bloc.descendreBloc()")
	//todo : a tester
        this.y =this.div.offsetTop + this.jeu.DIMENSION_BLOC;
        this.div.style.top = this.y + "px";	
        this.jeu.tableauBloc[this.ligne][this.colonne] = 0;
        this.ligne++;
        this.jeu.tableauBloc[this.ligne][this.colonne] = this;
        if(this.jeu.tableauBloc[this.ligne-2][this.colonne] instanceof Bloc){
            this.jeu.tableauBloc[this.ligne-2][this.colonne].descendreBloc();
        }
    }


}
