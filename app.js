const inputElement = document.getElementById("input");
const cardElement = document.querySelector(".card");
const formElement = document.getElementById("form");

const formatPokemonData = (response) => {
  const name =
    response.data.name[0].toUpperCase() + response.data.name.slice(1);
  const hp = response.data.stats[0].base_stat;
  const pokeImg = response.data.sprites.front_default;
  const pokeId = response.data.id;
  const statAttack = response.data.stats[1].base_stat;
  const statDefense = response.data.stats[2].base_stat;
  const statSpeed = response.data.stats[5].base_stat;
  const typesArray = response.data.types.map((type) => type.type.name);
  const types = typesArray.join(" ");

  return {
    name,
    hp,
    pokeImg,
    pokeId,
    statAttack,
    statDefense,
    statSpeed,
    types,
  };
};

const renderPokemonCard = (pokemonData) => {
  const html = `
    <div class="pokecard">
      <section class="header__card">
        <p class="types">${pokemonData.types}</p>
        <p class="hp">
          <span>HP</span>
          ${pokemonData.hp}
        </p>
      </section>
      <img src="${pokemonData.pokeImg}" alt="">
      <p class="id">
        <span>N°${pokemonData.pokeId}</span>
      </p>
      <h2>${pokemonData.name}</h2>
      <div class="stats">
        <div>
          <h3>${pokemonData.statAttack}</h3>
          <p>Attack</p>
        </div>
        <div>
          <h3>${pokemonData.statDefense}</h3>
          <p>Defense</p>
        </div>
        <div>
          <h3>${pokemonData.statSpeed}</h3>
          <p>Speed</p>
        </div>
      </div>
    </div>
  `;
  cardElement.innerHTML = html;
};

const searchPokemon = async () => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${inputElement.value.toLocaleLowerCase()}`
    );
    const pokemonData = formatPokemonData(response);
    renderPokemonCard(pokemonData);
  } catch (error) {
    if (error.response.status === 404) {
      cardElement.innerHTML = `
        <p class="error">The pokemon ${inputElement.value.toUpperCase()} was not found</p>
        <img class="error__img" src="./png-transparent-pokemon-go-gotcha-video-game-jynx-pokeball-orange-pokemon-technology.png" alt="" />
      `;
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPokemon();
  });
});
