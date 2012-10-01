/* ********** ********** ********** ********** ********** ********** ********** 
			imitation du jeu tetris en javascript
/* ********** ********** ********** ********** ********** ********** ********** */
/*
tetris.js est en charge de l'initialisation de la partie et de la boucle en
charge de régler le timming du jeu
*/

//variables
var jeu = 0;

		//fonction qui initialise le jeu lorsque la page est chargée 
window.onload = initialisation;
function initialisation(){
    //initialisation du jeu
    jeu = new Jeu();

    //initialisation du premier bloc
    structure =jeu.nouvelleStructure();
    
    //debut du jeu :
    tic();
}
			//boucle qui gere le timming du jeu 
function tic(){
//tic boucle evnementielle


    if(!structure.actif){
	/*lorsqu'un bloc as fini de descendre on l'ajoute au tableau
	 de bloc, on verifie s'il y a des lignes qui se sont complete
	et on ajoute un nouveau bloc 
	*/
            //ajouter la structure de bloc au tableau de bloc mort
	    jeu.ajouteStructure();
            
            // vérifier s'il y a des lignes qui se sont complété
            jeu.verifierLigne();
	    
            //créer une nouvelle structure de bloc 
            structure = jeu.nouvelleStructure();
	}
	if(!jeu.gameOver){
	    //déclenche le tic de la structure de bloc qui est entrain de
            //descendre
            structure.tic();

	    //rappel de la fonction a toutes les 30 milisecondes :
	    setTimeout(tic,30);
	}
	else{
            $("#jeu").append( $("<div id='gameOver' >GAME OVER</div>") );
//            setTimeout(jeu.finPartie,10000)
	}
}
