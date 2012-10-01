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
    if(this.code == TOUCHE_GAUCHE) structure.direction = GAUCHE ;
    else if(this.code == TOUCHE_DROITE) structure.direction = DROITE;
    else if(this.code == TOUCHE_HAUT) structure.rotation = true;
    else if(this.code == TOUCHE_BAS) structure.acceleration = true;
}
function relache(){
    if(structure.acceleration)structure.acceleration=false;
}
