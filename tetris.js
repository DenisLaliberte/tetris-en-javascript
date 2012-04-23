/* ********** ********** ********** ********** ********** ********** ********** 
			imitation du jeu tetris en javascript
/* ********** ********** ********** ********** ********** ********** ********** */
/*
todo :

-gérer l'arret des bloc
-valider les blocs qui se retirent
-descendre les blocs après en avoir retiré

-faire des formes complexe
-faire la rotation
-debuger la fonction qui commence une nouvelle partie

-branche drMario
*/

//variables
var gameOver = false ;
var blocActifA = 0 ;
var jeu = 0;
window.onload = initialisation;

function initialisation(){
//initialisation du jeu et de ses variables
    gameOver = false;    
//debug :
        console.log("initialisation")
    //initialisation du jeu
    jeu = new Jeu();

    //initialisation du premier bloc
    blocActifA =jeu.nouveauBloc();
    
    //debut du jeu :
    tic();
}

/* ********** ********** ********** ********** ********** ********** ********** */
			//boucle qui gere le timming du jeu 
/* ********** ********** ********** ********** ********** ********** ********** */
function tic(){
//tic boucle evnementielle
	if(!blocActifA.actif && !gameOver){
	/*lorsqu'un bloc as fini de descendre on l'ajoute au tableau
	 de bloc, on verifie s'il y a des lignes qui se sont complete
	et on ajoute un nouveau bloc 
	*/
	
            //ajouter le bloc au tableau
	    jeu.ajoutBloc();
            
            // vérifier s'il y a des lignes qui se sont complété
            jeu.verifierLigne();
	    
            //créer un nouveau bloc
            blocActifA = jeu.nouveauBloc();
	}
	if(!gameOver){
	    blocActifA.tic();

	    //rappel de la fonction a toutes les 30 milisecondes :
	    setTimeout(tic,30);
	}
	else{
	    console.log("tic() game over")
            $("#jeu").append( $("<div id='gameOver' >GAME OVER</div>") );
            setTimeout(jeu.finPartie,10000)
	}
}
/* ********** ********** ********** ********** ********** ********** ********** */
				//gestion des evenements
/* ********** ********** ********** ********** ********** ********** ********** */
window.onkeyup = relache;
window.onkeydown = touche;
//constantes
var GAUCHE = -1;
var DROITE = 1;
var TOUCHE_GAUCHE = 37;
var TOUCHE_DROITE = 39;
var TOUCHE_HAUT = 38;
var TOUCHE_BAS = 40; 
function touche(evenement){
    this.code = evenement.which;
    if(this.code == TOUCHE_GAUCHE) blocActifA.direction = GAUCHE ;
    else if(this.code == TOUCHE_DROITE) blocActifA.direction = DROITE;
    else if(this.code == TOUCHE_HAUT) blocActifA.rotation = true;
    else if(this.code == TOUCHE_BAS) blocActifA.acceleration = true;
}
function relache(){
    blocActifA.direction=0;
    if(blocActifA.acceleration)blocActifA.acceleration=false;
}
