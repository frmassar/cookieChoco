window.onload = function(){
    

    // les objets
    let pokemon = {
        score : 0,
        multiplicateur  :1 ,
        autoclicker :0 ,
        boost : 1,
        button : {
            aff : document.getElementById('affichage'),
            cli : document.getElementById('clic'),
            buttonSide : document.getElementsByClassName('container')[0],
            multi : document.getElementById('multiActive'),
            affMul : document.getElementById('multiplication'),
            autoClic : document.getElementById('autoclicActive'),
            boost : document.getElementById('boostActive'),
            affautoClic: document.getElementById('autoClicker'),
            praffMul : document.getElementById('prMultiplication'),
            praffautoclic: document.getElementById('prAutoclicker'),
            affBoost: document.getElementById('booster'),
            prBoost: document.getElementById('prBooster'), 
            affQuote : document.getElementById('quoteDisplay'),
        },
        bonus : { 
            active : false,
            prixMulti : 5,
            prixAutoclic : 5,
            prixBoost : 5,
            boostCount: 1,
            tclic : Number.MAX_SAFE_INTEGER,
            tBoosterOn : 0,
        }
    }

   
    //les fonctions

    function affScore () {
        let txt = "Votre score est de " + pokemon.score + " pikachu !"
        pokemon.button.aff.innerText = txt
    };

    // francois affichage multiplicateur + aff autoclick+aff prix bonus:
    function affMulti() {
        let txt = "x" + pokemon.multiplicateur
        pokemon.button.praffMul.innerText = txt 
    }

    function affBooster() {
        let txt = "temps :" + ("//julien rajouter sa fonction temps!!!")
        pokemon.button.affBoost.innerText = txt 
    }

    function affautoClic() {
        let txt = "x" + pokemon.autoclicker    
        pokemon.button.affautoClic.innerText = txt
    } 

    // affichage quote
    function quoteDisplay () {
        txt = affQuote;
        pokemon.button.affQuote.innerText = txt
    }

    // Fonctions PRIX : 

    function prMultiplication() {
        txt = "prix = "+ pokemon.bonus.prixMulti
        pokemon.button.praffMul.innerText = txt
    }
    function prAutoclicker () {
        txt = "Buy: "+ pokemon.bonus.prixAutoclic + " ₽"
        pokemon.button.praffautoclic.innerText = txt
    }
    function prBooster (){
        txt = "prix = "+pokemon.bonus.prixBoost
        pokemon.button.prBoost.innerText = txt
    }

    prMultiplication();
    prBooster();

    // Emilie
    function clicking () {
        pokemon.bonus.tclic = new Date().getTime()
        if (pokemon.bonus.tclic - pokemon.bonus.tBoosterOn < 30000) {
            pokemon.boost = 2;
            } else if (pokemon.bonus.tclic - pokemon.bonus.tBoosterOn >= 30000) {
                pokemon.boost = 1;
            }
        pokemon.score = pokemon.score + (1 * pokemon.multiplicateur * pokemon.boost)
        activation()
        affScore()
    };


    // fonction pour activer, desactiver les bonus
    function activation () {
        if (pokemon.score >= pokemon.bonus.prixMulti) {
            document.getElementById('multiActive').style.display = 'initial';
            document.getElementById('multiplication').style.display = 'inline-block';
            document.getElementById('multiInactive').style.display = 'none';
        } else {
            document.getElementById('multiActive').style.display = 'none';
            document.getElementById('multiInactive').style.display = 'initial';
        }
        if (pokemon.score >= pokemon.bonus.prixAutoclic) {
            document.getElementById('autoclicActive').style.display = 'initial';
            document.getElementById('autoClicker').style.display = 'inline-block';
            document.getElementById('autoclicInactive').style.display = 'none';
        } else {
            document.getElementById('autoclicActive').style.display = 'none';
            document.getElementById('autoclicInactive').style.display = 'initial';
        }
        if (pokemon.score >= pokemon.bonus.prixBoost && pokemon.boost == 1) {
            document.getElementById('boostActive').style.display = 'initial';
            document.getElementById('booster').style.display = 'inline-block';
            document.getElementById('boostInactive').style.display = 'none';
        } else {
            document.getElementById('boostActive').style.display = 'none';
            document.getElementById('boostInactive').style.display = 'initial';
        }
    }

    function augmenterMultiplicateur () {
        pokemon.score -= pokemon.bonus.prixMulti
        pokemon.multiplicateur++
        pokemon.bonus.prixMulti = pokemon.bonus.prixMulti * 2
        affMulti() 
        affScore()
        activation() 
        prMultiplication()
    };
    // function boostTiming () {
    //     t0 = new Date()
    //     t0S = t0.getSeconds();
    //     boost(tOS)
    // };

    function boost() {
        pokemon.bonus.tBoosterOn = new Date().getTime()
        
        if (pokemon.boost == 1) {
            pokemon.score -= pokemon.bonus.prixBoost;
            pokemon.boost=2;
            affichageTempsBooster();
            affScore();
            pokemon.bonus.prixBoost = pokemon.bonus.prixBoost * 2;
            prBooster();
        } else {
            console.log("Booster déjà acheté!") // Mettre un beau message par après? // 
        }
        activation();
    }

    
  
 
    function affichageTempsBooster(){
        var timeleft = 30;
        var downloadTimer = setInterval(function(){
            timeleft--;
            document.getElementById("booster").innerHTML = timeleft;
            if(timeleft <= 0){
                clearInterval(downloadTimer);
                document.getElementById("booster").innerHTML = "0";
                pokemon.boost= 1;
                activation();
            }
        }, 1000);
    }

    
    /////////////////////////////////////////////////////////////////////
    // Partie "Autoclicker" qui fait qu'a chaque achat d'un autoclicker :
    // 1) le prix d'achat est deduit du score,
    // 2) le prix du autoclicker suivant augmente (wip)
    prAutoclicker(); // appel de la fonction affichage prix

    // Fonction qui permettra d'effectuer l'achat d'autoclic
    function achatAutoclicker () {
        if (pokemon.score >= pokemon.bonus.prixAutoclic) {
        pokemon.score = pokemon.score - pokemon.bonus.prixAutoclic;
        console.log("Achat d'Autoclicker");
        pokemon.bonus.prixAutoclic = pokemon.bonus.prixAutoclic * 2;
        } else {
        console.log("Vous n'avez pas assez de credit pour l'achat de l'Autoclicker");
        }
        callAutoclic (); // Appel de la fonction du lancement de l'autoclicker
        activation() // 
        prAutoclicker(); // maj du prix (+100% apres chaque achat)    
       } 
    // Fonction du lancement d'autocliker une fois celui-ci achete 
    function callAutoclic () { 
        if (pokemon.autoclicker >= 0) {
            pokemon.autoclicker++;
            setInterval(function autoclicker () {
            pokemon.score += 1;
            console.log(pokemon.score)
            pokemon.cli = pokemon.cli + 1;
            affScore();
            }, 1000);
            console.log("Lancement autoclic");
        } else {    
        console.log("pas d'autoclic a appeller");
        } 
        affautoClic(); // mettre a jour le nombre d'autoclics deja achetes 
        affScore(); // maj du score
    }

    /////////////////////////////////////////////////////////////////
    // Differentes phrases de narration du pika-clicker assignees a la variable quote, de 0 a 9 (10 niveaux)

    var affQuote = ""; // variable servant dans la fonction de "quoteDisplay" 

    // Fonction qui va afficher un message (BESOIN DE LE STYLER DANS SCSS !)
    function selectionQuote () {
        affScore();
        quoteDisplay();
        // Conditionnelles d'affichage du message, selon le score. 
        if (pokemon.score < 10) {
            affQuote = 'Level 0 : Ton Pikachu fout le bordel dans la cuisine !';
        } else if (pokemon.score < 50) {
            affQuote = 'Level 1 : Un gang de Pikachus sevit dans ton jardin !';
        } else if (pokemon.score < 100) {
            affQuote = 'Level 2 : Une foule de Pikachus enfilent leur gilets jaunes et cassent le quartier !';
        } else if (pokemon.score < 500) {
            affQuote = 'Level 3 : Les Pikachus creent un syndicat et bloquent toute la region !';
        } else if (pokemon.score < 1000) {
            affQuote = 'Level 5 : Invasion de Pikachu sur le continent, ils font concurrence aux lapins cretins !';
        } else if (pokemon.score < 20000) {
            affQuote = 'Level 6 : Les Pikachus envahissent le monde entier !';
        } else if (pokemon.score < 500000) {
            affQuote = 'Level 7 : Invasion de Pikachus dans tout le systeme solaire !'; 
        } else if (pokemon.score < 1000000) {
            affQuote = 'Level 8 : Invasion de Pikachus dans toute la Voie Lactee !';
        } else if (pokemon.score < 10000000) {
            affQuote = 'Level 9 : Les Pikachus explorent l\'Univers entier !';
        } else {
            affQuote = 'Level 10 : "Les Pikachus sont hors controle, ils soumettent des dimensions paralleles !';
        } 
    }


    // appel fonction affiche le score à chaque clic
    pokemon.button.cli.addEventListener('click', clicking)

    // appel fonction pour compter le nombre de multiplicateur utilisé
    pokemon.button.multi.addEventListener('click', augmenterMultiplicateur);

    // appel fonction pour lancer le boost
    pokemon.button.boost.addEventListener('click', boost);

    // appel fonction autoclic    
    pokemon.button.autoClic.addEventListener('click', achatAutoclicker);

    // appel fonction selectionQuote 
    window.addEventListener('click', selectionQuote); // DEBUG : appel de la fonction des le chargenement de la page ??? 
}
