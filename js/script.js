window.onload = function(){


    // les objets
    let pokemon = {
        score : 0,
        multiplicateur  :1 ,
        autoclicker : 0 ,
        button : {
            aff : document.getElementById('affichage'),
            cli : document.getElementById('clic'),
            buttonSide : document.getElementsByClassName('container')[0],
            multi : document.getElementById('multiplier'),
            affmul : document.getElementById('multiplication'),
            autoclic : document.getElementById('autoclic'),
>>>>>>> 7c1412f215c9e8e3f75f53dc1335f8ed65166c00
            boost : document.getElementById('boost'),
        },
        bonus : false,
        boost : 1,
        tclicS : 0,
        t0S : 0,
    }

   
    //les fonctions

    function affScore () {
        let txt = "Votre score est de " + pokemon.score + " pikachu !"
        pokemon.button.aff.innerText = txt
    };

    // francois affichage multiplicateur :
    function affMulti() {
        txt = "x" + pokemon.multiplicateur
        pokemon.button.affMul.innerText = txt 
        txt = "x " + pokemon.multiplicateur
        pokemon.button.affMul.innerText = txt 
    }


    function clicking () {
        tclic = new Date();
        tclicS = tclic.getSeconds();

        pokemon.score = pokemon.score + (1 * pokemon.multiplicateur * pokemon.boost)

        console.log(pokemon.boost);
        console.log(tclicS);
        affScore()
    };

    function activate () {
        if (bonus.active === false) {
            console.log(false)
            buttonSide.style.pointerEvents = 'none';
        } else {
            console.log(true)
            buttonSide.style.pointerEvents = 'auto';

            // ca ne marche pas, mais je me demande si cette fonction doit etre appelée à l'user event ou être toujours active... Mais comment faire ?
        }
    };

    function augmenterMultiplicateur () {
        score -= 50
        pokemon.multiplicateur++
        console.log(pokemon.multiplicateur);
    };

    function boostTiming () {
        t0 = new Date()
        t0S = t0.getSeconds();
        boost(tOS)
    };

    function boost(T) {
        if (T - tclicS < 30) {
            pokemon.boost = 2;
        } else if (T - tclicS > 30) {
            pokemon.boost = 1;
        }
    }

    // autoclickerLabo, qui fait qu'a chaque achat, il augmente 
    // un clic auto est fait chaque 
 

    function autoclickerLabo () {
        pokemon.score++
        console.log(pokemon.score++)
    }

    // appel fonction affiche le score à chaque clic
    pokemon.button.cli.addEventListener('click', clicking)

    // appel fonction pour compter le nombre de multiplicateur utilisé
    pokemon.button.multi.addEventListener('click', augmenterMultiplicateur);

    // appel fonction pour lancer le boost
    pokemon.button.boost.addEventListener('click', boost);

    // appel fonction autoclic    
    pokemon.button.autoclic.addEventListener('click', autoclicker);

}