/* ********** ********** ********** ********** ********** ********** ********** */  
                        //objet structure
/* ********** ********** ********** ********** ********** ********** ********** */
function Structure1(id,jeu){
    //variables    
        //deplacement
    
    this.idCSS = "structure"+id;
    this.direction=0;
    this.actif=true;
    this.acceleration = false;
    this.rotation=false;
    
    this.jeu = jeu;
    this.blocs = new Array(4);
    
    this.x=0;
    this.y=0;
    this.yBloc=0;
    this.nouveauX = 0;
    this.indiceStyle =0;
    this.couleur =  Math.round((Math.random() * 2) );
   
    this.ligne=0
    this.colonne=this.jeu.COLONNE_DEPART;

    for(i=0;i<4;i++){
        this.blocs[i] = this.jeu.nouveauBloc(this);
    }
    $("#jeu").append( $("<div id='"+this.idCSS
                                    +"'class='bloc'></div>"));

    this.div = document.getElementById(this.idCSS)
    this.style = Math.round(Math.random()*3);
    this.tableauCoordonneX= new Array();
    this.tableauCoordonneY= new Array();

//todo : mettre ce code dans un objet factory 
    //ajout des coordonnés selon le style de structure choisit
    if(this.style ==0){
        this.tableauCoordonneX.push(new Array(0,0,1,1));
        this.tableauCoordonneY.push(new Array(0,1,0,1));
    }
    else if(this.style==1){
        this.tableauCoordonneX.push(new Array(0,0,0,1));
        this.tableauCoordonneY.push(new Array(0,1,2,1)); 
        this.tableauCoordonneX.push(new Array(0,1,2,1));
        this.tableauCoordonneY.push(new Array(1,1,1,0));
        this.tableauCoordonneX.push(new Array(0,1,1,1));
        this.tableauCoordonneY.push(new Array(1,0,1,2));
        this.tableauCoordonneX.push(new Array(0,1,2,1));
        this.tableauCoordonneY.push(new Array(0,0,0,1));
    }
    else if(this.style==2){
        this.tableauCoordonneX.push(new Array(0,0,0,1));
        this.tableauCoordonneY.push(new Array(0,1,2,2));
        this.tableauCoordonneX.push(new Array(0,1,2,2));
        this.tableauCoordonneY.push(new Array(1,1,1,0));
        this.tableauCoordonneX.push(new Array(0,1,1,1));
        this.tableauCoordonneY.push(new Array(0,0,1,2));
        this.tableauCoordonneX.push(new Array(0,1,2,0));
        this.tableauCoordonneY.push(new Array(0,0,0,1));
    }
    else if(this.style==3){
        this.tableauCoordonneX.push(new Array(0,0,0,0));
        this.tableauCoordonneY.push(new Array(0,1,2,3));
        this.tableauCoordonneX.push(new Array(0,1,2,3));
        this.tableauCoordonneY.push(new Array(0,0,0,0));
    }

    this.tic = function(){
        if(this.rotation){
        //todo : ajouter une validation pour s'assurer que la rotation ne rentre pas
        //en conflit avec les limittes ou les autres blocs
            this.rotationStructure();
            this.rotation = false;
        }
        this.deplacementHorizontal();
        this.deplacementVertical();
        this.positionnement();
    }
    this.rotationStructure=function (){
        nouvelIndice = this.indiceStyle +1 ;
        caseOccupee = false;
        
        if (nouvelIndice > this.tableauCoordonneX.length-1){
            nouvelIndice =0;
        }

        tableauX = this.tableauCoordonneX[nouvelIndice];
        tableauY =this.tableauCoordonneY[nouvelIndice];

        for(bloc in this.blocs){
            x = this.ligne + tableauX[bloc];
            y = this.colonne + tableauY[bloc];
            caseOccupee = this.jeu.verifierBloc(x,y);
            if(caseOccupee){
                break;
            }
        }
        if(!caseOccupee){
            this.indiceStyle = nouvelIndice
        } 

        
    }
    
    this.deplacementVertical = function(){
	//deplacement vertical
        if(!this.acceleration){
            this.vitesse=1;
	}
	else {
            this.vitesse=5;
	}
        
        this.valide=true
        for(i=0;i<this.vitesse;i++){
            //selon la vitesse on peux descendre de un ou de 4 pixel a chaque
            //tic 
            this.yBloc+=1;
            if(this.yBloc > this.jeu.DIMENSION_BLOC){
                //si la structure as descendu une grandeur de bloc 
                this.yBloc=0;
                for (bloc in this.blocs){
                    //verifier si tout les bloc de la structure n'ont pas
                    //d'obstacle pour descendre et ne sort pas du jeu
                    this.valide=this.blocs[bloc].validationVerticale();
                    if(!this.valide){
                        this.actif = false;
                        break;
                    }
                }
                if (this.valide){
                    //si le deplacement est valide on augmente la valeur de la
                    //ligne
                    this.ligne++
                }
            }
            if (this.valide){
                //si le deplacement est valide on change la position du div de la
                //structure et le positionnement des blocs vas se faire en fonction
                //de ce div 
                this.y =1 +this.div.offsetTop;
                this.div.style.top=this.y +"px";
            }
            else{
                //si il n'est pas valide on sort de la boucle        
                break;
            }
        }
    }
    
    
    this.deplacementHorizontal = function(){
	this.xCourant = this.div.offsetLeft;
        this.nouveauX = this.xCourant +( this.jeu.DIMENSION_BLOC *this.direction);
        this.valide = true;
        for (bloc in this.blocs){
            this.valide = this.blocs[bloc].validationHorizontale(this.direction);
            if(!this.valide) break;
        }

       if(this.valide){ 
            this.div.style.left = this.nouveauX + "px";
            this.colonne +=this.direction;

        }
        this.direction=0;
    }

    this.positionnement=function(){
        this.x=this.div.offsetLeft;
        this.y=this.div.offsetTop;
        tableauX = this.tableauCoordonneX[this.indiceStyle];
        tableauY = this.tableauCoordonneY[this.indiceStyle];
        for(bloc in this.blocs){ 
            this.blocs[bloc].positionnement(this.x,this.y,
                                    tableauX[bloc],tableauY[bloc],
                                    this.ligne,this.colonne)
        }
    }
    
    //positionnement lors de l'initialisation de l'objet
    this.positionnement();
}



