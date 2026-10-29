// Variáveis para selecionar elementos

const pokemonName = document.querySelector('.Nome');
const pokemonNumber = document.querySelector('.Numero');
const pokemonImage = document.querySelector('.ImagemPokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.Pesquisar');
const buttonPrev = document.querySelector('.btn-Ant');
const buttonNext = document.querySelector('.btn-Prox');

// Variável para armazenar o número inical do Pokemon
let searchPokemon = 1;

// Função para buscar os dados do Pokemon na API
const BuscarPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const CarregarPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await BuscarPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  CarregarPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    CarregarPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  CarregarPokemon(searchPokemon);
});

CarregarPokemon(searchPokemon);
