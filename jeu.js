/* ********** ********** ********** ********** ********** ********** ********** */
                                //objet jeu
/* ********** ********** ********** ********** ********** ********** ********** */
var NOMBRE_BLOC_LIGNE = 4; //nombre de bloc pour faire une ligne valide
var LIMITTE_GAUCHE =-5;
var LIMITTE_DROITE =725;
var COLONNE_DEPART = 4;
//TODO : changer la validation pour remmetre 7
var NOMBRE_LIGNE_MAX = 3;
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

