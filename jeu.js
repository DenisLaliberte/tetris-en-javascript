/* ********** ********** ********** ********** ********** ********** ********** */
                                //objet jeu
/* ********** ********** ********** ********** ********** ********** ********** */
var DEBUG = false;
var DEBUG1 =false ;
var DEBUG2 = true;
var LIMITTE_GAUCHE =-5;
var LIMITTE_DROITE =725;
//TODO : changer la validation pour remmetre 7
var NOMBRE_LIGNE_MAX = 10;
var PLANCHER = 520;
var NOMBRE_COLONNE = 10;
var NOMBRE_BLOC_LIGNE = 3 // pour qu'une ligne soit retirer elle doit être
//complete
function Jeu(){
    this.idBloc = 0;
    this.blocActif;
//todo : verifier les array a 2 dimension en js
    this.tableauBloc = new Array(10);
    // TODO: a tester plus tard, je ne suis pas sur s'il faut initialiser un array
    //mais ça bugais avant que je le fasse
    for (var i = 0;i<NOMBRE_LIGNE_MAX+1;i++){
        this.tableauBloc[i]=new Array(10);
    	for (var j = 0;j<NOMBRE_COLONNE+1;j++){
            //on ajoute 1 au nombre de colonne pour grader une colonne vide en
            //dehors du tableau qui sert à la validation des lignes
    		this.tableauBloc[i][j]=0;
	}
    }

    this.nouveauBloc = function() {
    //fonction pour ajouter un nouveau bloc au jeu, retourne une reference 
        this.blocActif = new Bloc(this.idBloc,this);
        this.idBloc++;
        return this.blocActif;
    }
    
    this.ajoutBloc = function() {
    //lorsqu'un bloc a fini sa desente, il est ajoute au tableau des blocs
    //affiche
        var ligne = this.calculerPlancher(this.blocActif.colonne) + 1;
if(DEBUG2) console.log("ajoute bloc L"+ligne+"C"+this.blocActif.colonne)
        this.tableauBloc[ligne][this.blocActif.colonne] =this.blocActif;
if(DEBUG2) console.log( this.tableauBloc[ligne][this.blocActif.colonne] );
    
    }

    this.verifierLigne = function() { 
        for(var i=0;i<10;i++){
//debug
            if(this.tableauBloc[i][0] != 0 ){	    
                var retour = this.tableauBloc[i][0].validerLigne(0);	
	        }
        }
    }

    this.calculerPlancher = function(colonne){
if(DEBUG2) console.log("calculerPlancher colone +C"+colonne)        
        var reponse=0;
        for(i=9;i>=0;i--) {
console.log(i);            
            if(this.tableauBloc[i][colonne] instanceof Bloc ){
if(DEBUG2)   console.log("claculerPlancher +i"+i)
          //todo : verifier pourquoi on ne rentre jamais dans le if  
                reponse=i;
                break;
            }
        }
        return reponse;
    }    
    this.finPartie = function(){
        //retire tout les blocs a la fin d'une partie
        for(var i=0;i<10;i++){
	    for(var j=0;j<10;j++){
                this.tableauBloc[i][j].retirer();	
	    }
        }
        $("#gameOver").remove();
        initialisation();
    }
}

