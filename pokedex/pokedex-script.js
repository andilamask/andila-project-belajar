async function fetchPokemon() {
  let id = document.getElementById('pokemonId').value; /* ambil dari data pokemonId */
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const response = await fetch(url);
  const data = await response.json();

/*   document.getElementById('pokemonName').textContent = capitalize(data.name); */
  document.getElementById('pokemonName').innerHTML = 
  `<h3 style="margin-bottom: 4px;">${capitalize(data.name)}</h3>
  <p style="margin: 2px 0;">Ability: ${capitalize(data.abilities[0].ability.name)}</p>
  <p style="margin: 2px 0;">Species: ${capitalize(data.species.name)}</p>
  <p style="margin: 2px 0;">Height: ${data.height / 10} m</p>
  <p style="margin: 2px 0;">Weight: ${data.weight / 10} kg</p>
  <p style="margin: 2px 0;">Base Experience: ${data.base_experience}</p>
  <p style="margin: 2px 0;">Types: ${data.types.map(type => capitalize(type.type.name)).join(', ')}</p>
  <p style="margin: 2px 0;">Stats:</p>
  <ul style="margin: 2px 0; padding-left: 20px;">
    ${data.stats.map(stat => `<li>${capitalize(stat.stat.name)}: ${stat.base_stat}</li>`).join('')}`
  document.getElementById('pokemonImage').src = data.sprites.front_default;
  console.log(data);
}

function randomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1;
  document.getElementById('pokemonId').value = randomId;
  fetchPokemon();
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
} /* word = data.name */
