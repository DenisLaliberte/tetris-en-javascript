/* ********** ********** ********** ********** ********** ********** ********** 
			imitation du jeu tetris en javascript
/* ********** ********** ********** ********** ********** ********** ********** */
/*
todo :
- faire un gros div game over
-position de départ
-tester la fonction qui fait les bloques arrêtes 
-tester la fonction qui retire les blocs lorsqu'il y a une ligne
-faire des forme complexe (l t o)
-valider les colonnes
-faire descendres les bloc s'il n'y en as plus en dessous
-ajuster les paramêtres
-clean up commentaire et console.log
*/

//variables
var gameOver = false ;
var blocActif = 0 ;
var jeu = 0;
window.onload = initialisation;

function initialisation(){
//initialisation du jeu et de ses variables
    
    //initialisation du jeu
    jeu = new Jeu();

    //initialisation du premier bloc
    blocActif =jeu.nouveauBloc();
    
    //debut du jeu :
    tic();
}

/* ********** ********** ********** ********** ********** ********** ********** */
			//boucle qui gere le timming du jeu 
/* ********** ********** ********** ********** ********** ********** ********** */
function tic(){
//tic boucle evnementielle
	if(!blocActif.actif && !gameOver){
	/*lorsqu'un bloc as fini de descendre on l'ajoute au tableau
	 de bloc, on verifie s'il y a des lignes qui se sont complete
	et on ajoute un nouveau bloc 
	*/
	
            //ajouter le bloc au tableau
	    jeu.ajoutBloc();
            
            // vérifier s'il y a des lignes qui se sont complété
            jeu.verifierLigne();
	    
            //créer un nouveau bloc
            blocActif = jeu.nouveauBloc();
	}
	if(!gameOver){
	    blocActif.tic();

	    //rappel de la fonction a toutes les 30 milisecondes :
	    setTimeout(tic,30);
	}
	else{
		console.log("gameover !!!!!")
		//faire une fonction qui affiche un div gameover pendand 
		//15 secondes puis qui rapelle initialisation
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
//debug
    console.log("touche");	
    this.code = evenement.which;
    if(this.code == TOUCHE_GAUCHE) blocActif.direction = GAUCHE ;
    else if(this.code == TOUCHE_DROITE) blocActif.direction = DROITE;
    else if(this.code == TOUCHE_HAUT) blocActif.rotation = true;
    else if(this.code == TOUCHE_BAS) blocActif.acceleration = true;
}
function relache(){
    blocActif.direction=0;
    if(blocActif.acceleration)blocActif.acceleration=false;
}
