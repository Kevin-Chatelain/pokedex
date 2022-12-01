
/* AFFICHER CHAQUE POKEMON DANS SON CONTAINER */

async function showPokemon(data, pokemonAmount, startingId) {
  for(let i=startingId; i<pokemonAmount; i++) {
      document.querySelector('.pokemon-list')
      .innerHTML += `<div class="pokemon-container" id="${data[i].id}">
                        <div class="bande"></div>

                        <div class="pokemon-image">
                           <img src="${data[i].sprite}" />
                        </div>
  
                        <div class="pokemon-name">
                          <p>${data[i].name}</p>
                        </div>

                        <div class="pokemon-id">
                          <p>${data[i].id}</p>
                        </div>

                        <div class="bande"></div>
                     </div>`;
     }
}

/* AFFICHER LA FICHE DETAILEE D'UN POKEMON */

async function printPokemonData(data, pokemonId) {
  document.querySelector('.fiche-infos-nom h1').innerText = data[pokemonId].name;
  document.querySelector('.fiche-infos-id p span').innerText = data[pokemonId].id;

  let typesArray = data[pokemonId].apiTypes;
  typesArray.forEach(types => {
    document.querySelector('.fiche-infos-types').innerHTML += `<img src="${types.image}" alt="type-${types.name}" />`;
  });
 
  Object.entries(data[pokemonId].stats).forEach(stat => {
    const [key, value] = stat;
    document.querySelector('.'+key+' .stat').innerText = value;
  });

  document.querySelectorAll('.barre-stat').forEach(barre => {
    let largeur = parseInt(barre.parentElement.nextElementSibling.innerText) / 1.8;
    barre.style.width = largeur+"%";
    
    
  })

  document.querySelector('.illustration-pokemon').innerHTML = `<img src="${data[pokemonId].image}" alt="image de ${data[pokemonId].name}"/>`;

  document.querySelector('.previous-pokemon h3').innerText = data[pokemonId - 1].name;
  document.querySelector('.previous-pokemon p span').innerText = data[pokemonId - 1].id;
  document.querySelector('.next-pokemon h3').innerText = data[pokemonId + 1].name;
  document.querySelector('.next-pokemon p span').innerText = data[pokemonId + 1].id;
}


/* APPEL VERS L'API */

fetch('https://pokebuildapi.fr/api/v1/pokemon')
.then(function(response) {  
    return response.json(); 
})
.then(function(json) {     
  console.log(json)  
  showPokemon(json, 10, 0);

  let showPokemonAmount = 100;


  /* AFFICHER PLUS DE POKEMONS */

  document.querySelector('.showmore-button').addEventListener('click', () => {
    let lastPokemon = document.querySelector('.pokemon-container:last-child').getAttribute('id');
    showPokemon(json, (parseInt(lastPokemon) + showPokemonAmount), lastPokemon);

    /* AFFICHER LES INFOS DU POKEMON AU CLIC SUR UN CONTAINER APRES AFFICHAGE */

    document.querySelectorAll('.pokemon-container').forEach(pokemonContainer => {
      pokemonContainer.addEventListener('click', function() {
        let pokemonId = parseInt(this.getAttribute('id')) - 1;
        document.querySelector('.fiche-infos-types').innerHTML = "";
        printPokemonData(json, pokemonId);
        document.querySelector('.fiche-pokemon').classList.toggle('show-fiche');
      })
    });
  });

  /* AFFICHER LES INFOS DU POKEMON AU CLIC SUR UN CONTAINER */

  document.querySelectorAll('.pokemon-container').forEach(pokemonContainer => {
    pokemonContainer.addEventListener('click', function() {
      let pokemonId = parseInt(this.getAttribute('id')) - 1;
      document.querySelector('.fiche-infos-types').innerHTML = "";
      printPokemonData(json, pokemonId);
      document.querySelector('.fiche-pokemon').classList.toggle('show-fiche');
    })
  });

  /* FERMER LA FICHE DU POKEMON  */

  document.querySelector('.croix').addEventListener('click', () => {
    document.querySelector('.fiche-pokemon').classList.toggle('show-fiche');
  });

  /* NAVIGUER ENTRE LES FICHES */

  document.querySelector('.left-arrow').addEventListener("click", function() {
    let pokemonId = parseInt(document.querySelector('.fiche-infos-id p span').innerText);
    document.querySelector('.fiche-infos-types').innerHTML = "";
    printPokemonData(json, pokemonId - 2);
  });

  document.querySelector('.right-arrow').addEventListener("click", function() {
    let pokemonId = parseInt(document.querySelector('.fiche-infos-id p span').innerText);
    document.querySelector('.fiche-infos-types').innerHTML = "";
    printPokemonData(json, pokemonId);
  });



});


