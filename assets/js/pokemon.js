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
  })
});


