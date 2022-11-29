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

async function printPokemonData(data, pokemonId) {
  document.querySelector('.fiche-infos-nom h1').innerText = data[pokemonId].name;
  document.querySelector('.fiche-infos-id p').innerText = data[pokemonId].id;

  let typesArray = data[pokemonId].apiTypes;
  typesArray.forEach(types => {
    document.querySelector('.fiche-infos-types').innerHTML += `<img src="${types.image}" alt="type-${types.name}" />`;
  });
}


fetch('https://pokebuildapi.fr/api/v1/pokemon')
.then(function(response) {  
    return response.json(); 
})
.then(function(json) {     
  console.log(json)  
  showPokemon(json, 10, 0);

  let showPokemonAmount = 100;

  document.querySelector('.showmore-button').addEventListener('click', () => {
    let lastPokemon = document.querySelector('.pokemon-container:last-child').getAttribute('id');
    showPokemon(json, (parseInt(lastPokemon) + showPokemonAmount), lastPokemon);
  });

  document.querySelectorAll('.pokemon-container').forEach(pokemonContainer => {
    pokemonContainer.addEventListener('click', function() {
      let pokemonId = parseInt(this.getAttribute('id')) - 1;
      document.querySelector('.fiche-infos-types').innerHTML = "";
      printPokemonData(json, pokemonId)
    })
  });

});


