function showPokemon(data, pokemonAmount, startingId) {
  for(let i=startingId; i<pokemonAmount; i++) {
      document.querySelector('.pokemon-list')
      .innerHTML += `<div class="pokemon-container" id="${data[i].id}">
                        <div class="pokemon-image">
                           <img src="${data[i].sprite}" />
                        </div>
  
                        <div class="pokemon-name">
                          <p>${data[i].name}</p>
                        </div>
                     </div>`;
     }
}


fetch('https://pokebuildapi.fr/api/v1/pokemon')
.then(function(response) {  
    return response.json(); 
})
.then(function(json) {     
  console.log(json)  
  showPokemon(json, 50, 0);

  let showPokemonAmount = 100;

  document.querySelector('button').addEventListener('click', () => {
    let lastPokemon = document.querySelector('.pokemon-container:last-child').getAttribute('id');
    showPokemon(json, (parseInt(lastPokemon) + showPokemonAmount), lastPokemon);
  })
});

