
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

/* TABLEAU DE CORRESPONDANCE TYPES => COULEUR */

let typeToColor = {
  "normal": "#8d8d8d",
  "feu": "#8f564b",
  "eau": "#515a7a",
  "plante": "#698b69",
  "vol": "#748588",
  "insecte": "#7d9941",
  "psy": "#8b697e",
  "tenebres": "#424242",
  "spectre": "#392440",
  "combat": "#442c25",
  "electrik": "#adad5a",
  "poison": "#837488",
  "acier": "#8691a9",
  "sol": "#a99986",
  "roche": "#a19779",
  "glace": "#6aa6a9",
  "dragon": "#646797",
  "fee": "#b598a9"
}

/* AFFICHER LA FICHE DETAILEE D'UN POKEMON */

async function printPokemonData(data, pokemonId) {

  document.querySelector('.fiche-infos-types').innerHTML = "";
  document.querySelector('.pre-container').innerHTML = "";
  document.querySelector('.evo-container').innerHTML = "";

  // Nom et numéro
  document.querySelector('.fiche-infos-nom h1').innerText = data[pokemonId].name;
  document.querySelector('.fiche-infos-id p span').innerText = data[pokemonId].id;

  // Types 
  let typesArray = data[pokemonId].apiTypes;
  typesArray.forEach(types => {
    let typeImgPath = '../assets/img/pokemon-types/'+types.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")+'.png';
    document.querySelector('.fiche-infos-types').innerHTML += `<img src="${typeImgPath}" alt="type-${types.name}" />`;
  });

  document.querySelector('.fiche-pokemon .fiche-bg').style.backgroundColor = typeToColor[data[pokemonId].apiTypes[0].name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")];
 
  //Pré-évolution 
  if(data[pokemonId].apiPreEvolution == "none") 
    document.querySelector('.fiche-evolutions .pre-container').innerHTML = "<p>Aucune</p>";

  else {
    document.querySelector('.fiche-evolutions .pre-container')
      .innerHTML += `<div class="pre-${data[pokemonId].apiPreEvolution.name}"> 
                        <div class="pre-image">
                          <img src="${data[data[pokemonId].apiPreEvolution.pokedexIdd - 1].sprite}" alt="${data[data[pokemonId].apiPreEvolution.pokedexIdd - 1].name}">
                        </div>

                        <div class="pre-infos">
                          <p>${data[pokemonId].apiPreEvolution.name}</p>
                          <p>No. ${data[pokemonId].apiPreEvolution.pokedexIdd}</p>
                        </div>
                     </div>`;
  }

  // Evolution
  if(data[pokemonId].apiEvolutions.length > 0) {
    for (const [key] of Object.entries(data[pokemonId].apiEvolutions)) {
      document.querySelector('.fiche-evolutions .evo-container')
        .innerHTML += `<div class="evo-${data[pokemonId].apiEvolutions.name}"> 
                          <div class="evo-image">
                            <img src="${data[data[pokemonId].apiEvolutions[key].pokedexId - 1].sprite}" alt="${data[data[pokemonId].apiEvolutions[key].pokedexId - 1].name}">
                          </div>

                          <div class="evo-infos">
                            <p>${data[pokemonId].apiEvolutions[key].name}</p>
                            <p>No. ${data[pokemonId].apiEvolutions[key].pokedexId}</p>
                          </div>
                      </div>`;
      }
  }

  else {
    document.querySelector('.fiche-evolutions .evo-container').innerHTML = "<p>Aucune</p>";
  }


  // Stats
  Object.entries(data[pokemonId].stats).forEach(stat => {
    const [key, value] = stat;
    document.querySelector('.'+key+' .stat').innerText = value;
  });

  document.querySelectorAll('.barre-stat').forEach(barre => {
    let largeur = parseInt(barre.parentElement.nextElementSibling.innerText) / 1.8;
    barre.style.width = largeur+"%";
  });

  //Image
  document.querySelector('.illustration-pokemon').innerHTML = `<img src="${data[pokemonId].image}" alt="image de ${data[pokemonId].name}"/>`;

  //Navigation
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
        printPokemonData(json, pokemonId);
        document.querySelector('.fiche-pokemon').classList.toggle('show-fiche');
      })
    });
  });

  /* AFFICHER LES INFOS DU POKEMON AU CLIC SUR UN CONTAINER */

  document.querySelectorAll('.pokemon-container').forEach(pokemonContainer => {
    pokemonContainer.addEventListener('click', function() {
      let pokemonId = parseInt(this.getAttribute('id')) - 1;
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


