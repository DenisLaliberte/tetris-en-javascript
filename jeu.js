/* ********** ********** ********** ********** ********** ********** ********** 
                                objet jeu

Objet qui contient tout les éléments du jeu
 ********** ********** ********** ********** ********** ********** ********** */

//constantes : 
var DEBUG = true;

function Jeu(){
    this.LIMITTE_GAUCHE =0;
    this.NOMBRE_LIGNE =15 ;
    this.PLANCHER = 520;
    this.NOMBRE_COLONNE = 12;
    this.COLONNE_DEPART = 4;
    this.DIMENSION_BLOC = 40; //dimension largeur et hauteur d'un bloc, en px 
    //todo verifier NOMBRE_BLOC_LIGNE
    this.NOMBRE_BLOC_LIGNE = this.NOMBRE_COLONNE-1; // pour qu'une ligne soit retirer elle doit être
    this.idBloc = 0;
    this.idStructure = 0;
    this.structureActive;
    this.tableauBloc = new Array(10);
    this.gameOver = false
    for (var i = 0;i<this.NOMBRE_LIGNE+1;i++){
        this.tableauBloc[i]=new Array(10);
    	for (var j = 0;j<this.NOMBRE_COLONNE+1;j++){
            //on ajoute 1 au nombre de colonne pour grader une colonne vide en
            //dehors du tableau qui sert à la validation des lignes
    		this.tableauBloc[i][j]=0;
	}
    }
    
    

    this.nouveauBloc = function(structure) {
    //fonction pour ajouter un nouveau bloc au jeu, retourne une reference 
        blocActif = new Bloc(this.idBloc,structure);
        this.idBloc++;
        return blocActif;
    }
    this.nouvelleStructure = function(){
    //fonction pour ajouter une nouvelle structure
        this.structureActive = new Structure1(this.idStructure,this);
        this.idStructure++;
        return this.structureActive; 
    }
    this.ajouteStructure=function (){
    //fonction qui ajoute les bloc d'une structure au tableau de bloc mort
        for (bloc in this.structureActive.blocs){
            this.ajoutBloc(this.structureActive.blocs[bloc]);
        }
    }
    this.ajoutBloc = function(bloc) {
    //lorsqu'un bloc a fini sa desente, il est ajoute au tableau des blocs
    //mort
        this.tableauBloc[bloc.ligne][bloc.colonne] =bloc;
        
    }
    this.verifierLigne = function() { 
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("jeu.verifierLigne")
    for(var i=0;i<this.NOMBRE_LIGNE;i++){
            if(this.tableauBloc[i][0] instanceof Bloc ){
            console.log("jeu.verifierLigne",i," : valider le bloc",
                        this.tableauBloc[i][0] )
                var retour = this.tableauBloc[i][0].validerLigne(0);	
            }
        }
    }
    this.verifierBloc = function(x,y){
        reponse = false;
        if(this.tableauBloc[x][y]instanceof Bloc){
                reponse = true;
        }
        
        return reponse;
    
    }

    this.descendreBloc = function (){
        console.log("jeu.descendreBloc")
    
    }

    this.finPartie = function(){
        //retire tout les blocs a la fin d'une partie
        for(var i=0;i<this.NOMBRE_LIGNE;i++){
	    for(var j=0;j<10;j++){
                this.tableauBloc[i][j].retirer();	
	    }
        }
        $("#gameOver").remove();
        initialisation();
    }
}

