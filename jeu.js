/* ********** ********** ********** ********** ********** ********** ********** */
                                //objet jeu
/* ********** ********** ********** ********** ********** ********** ********** */
var DEBUG = true;
var LIMITTE_GAUCHE =-5;
var LIMITTE_DROITE =725;
//TODO : changer la validation pour remmetre 7
var NOMBRE_LIGNE_MAX = 10;
var PLANCHER = 520;
var NOMBRE_COLONNE = 10;
var NOMBRE_BLOC_LIGNE = 3 // pour qu'une ligne soit retirer elle doit être
//complete
function Jeu(){
    var idBloc = 0;
    var blocActif;
    this.tableauPlancher = new Array();
    this.tableauBloc = new Array(10,10);
    // TODO: a tester plus tard, je ne suis pas sur s'il faut initialiser un array
    //mais ça bugais avant que je le fasse
    for (var i = 0;i<NOMBRE_LIGNE_MAX+1;i++){
        this.tableauBloc[i]=new Array();
    	for (var j = 0;j<NOMBRE_COLONNE+1;j++){
            //on ajoute 1 au nombre de colonne pour grader une colonne vide en
            //dehors du tableau qui sert à la validation des lignes
    		this.tableauBloc[i][j]=0;
	}
    }
    for (var i=0;i<NOMBRE_COLONNE;i++){
	this.tableauPlancher[i]=0;
    }

    this.nouveauBloc = function() {
    //fonction pour ajouter un nouveau bloc au jeu, retourne une reference 
        blocActif = new Bloc(idBloc,this);
        idBloc++;
        return blocActif;
    }
    this.ajoutBloc = function() {
    //lorsqu'un bloc a fini sa desente, il est ajoute au tableau des blocs
    //affiche
//DEBUG :
        console.log("insertion du bloc " + blocActif.id + " ligne :" +
        blocActif.ligne +"colonne"+blocActif.colonne)
        blocActif.ligne =this.tableauPlancher[blocActif.colonne];
        this.tableauBloc[blocActif.ligne][blocActif.colonne] = blocActif;
    }
    this.verifierLigne = function() {
 
        for(var i=0;i<10;i++){
//debug
                console.log("jeu verifier ligne "+i+this.tableauBloc[i][0] )
    
            if(this.tableauBloc[i][0] != 0 ){
	    
                var retour = this.tableauBloc[i][0].validerLigne(0);	
	        }
        }
    }
    this.calculerPlancher = function(colonne){
        for(i=10;i<0;i--) {
            if(this.tableauBloc[i][colonne]){
                return i ;
            }
        }
        return 0;
    }    
    this.finPartie = function(){
//debug :
        console.log("jeu.finpartie()");
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

