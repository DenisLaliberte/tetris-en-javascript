/* ********** ********** ********** ********** ********** ********** ********** */
                                //objet jeu
/* ********** ********** ********** ********** ********** ********** ********** */
var DEBUG = true;
var LIMITTE_GAUCHE =-5;
var LIMITTE_DROITE =725;
//TODO : changer la validation pour remmetre 7
var NOMBRE_LIGNE_MAX = 7;
var PLANCHER = 520;
var NOMBRE_COLONNE = 10;
//complete
function Jeu(){
    this.idBloc = 0;
    this.blocActif;
    this.structureActive;
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

    this.nouveauBloc = function(structure) {
    //fonction pour ajouter un nouveau bloc au jeu, retourne une reference 
        this.blocActif = new Bloc(this.idBloc,structure);
        this.idBloc++;
        return this.blocActif;
    }
    this.nouvelleStructure = function(){
    //donction pour ajouter une nouvelle structure
    //todo : choisir au hasard le style de la structure
        this.structureActive = new Structure1(this);
        return this.structureActive; 
    
    }
    
    this.ajouteStructure=function (){
        console.log("jeu.js ajouteStructure")
        for (bloc in this.structureActive.blocs){
            this.ajoutBloc(this.structureActive.blocs[bloc]);
        }

    }

    this.ajoutBloc = function(bloc) {
    //lorsqu'un bloc a fini sa desente, il est ajoute au tableau des blocs
    //affiche
        var ligne = this.calculerPlancher(bloc.colonne) + 1;
        bloc.ligne = ligne;
        this.tableauBloc[ligne][bloc.colonne] =bloc;
        
    }

    this.verifierLigne = function() { 
        for(var i=0;i<NOMBRE_LIGNE_MAX;i++){
            if(this.tableauBloc[i][0] instanceof Bloc ){	    
                var retour = this.tableauBloc[i][0].validerLigne(0);	
	    }
        }
    }

    this.calculerPlancher = function(colonne){
        var reponse=0;
        for(i=NOMBRE_LIGNE_MAX ;i>=0;i--) {
            if(this.tableauBloc[i][colonne] instanceof Bloc ){
                reponse=i;
                break;
            }
        }
        return reponse;
    }    
    this.finPartie = function(){
        //retire tout les blocs a la fin d'une partie
        for(var i=0;i<NOMBRE_LIGNE_MAX;i++){
	    for(var j=0;j<10;j++){
                this.tableauBloc[i][j].retirer();	
	    }
        }
        $("#gameOver").remove();
        initialisation();
    }
}

