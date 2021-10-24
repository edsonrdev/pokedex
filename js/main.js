const pokeContainer = document.querySelector('#poke-container');
const pokemonsNumber = 100;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const mainTypes = Object.keys(colors);
console.log(mainTypes);

// itera até de 1 até o número especificado, buscando, gerando e exibindos todos os pokemons neste intervalo
const fetchPokemons = async () => {
   for (let i = 1; i <= pokemonsNumber; i++) {
      await getPokemon(i);
   }
}

// faz uma requisição assíncrona para buscar os dados e monta o card do pokemon em questão
const getPokemon = async id => {
   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
   const response = await fetch(url);
   const pokemon = await response.json();
   createPokemonCard(pokemon);
}

// cria o card, com o pokemon passado por parâmetro
const createPokemonCard = pokemon => {
   const pokemonEl = document.createElement('div');
   pokemonEl.classList.add('pokemon');

   const pokeTypes = pokemon.types.map(item => item.type.name);

   // dados do pokemon
   const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
   const name = pokemon.name[0].toUpperCase() + pokemon.name.substr(1);
   const color = colors[type];
   pokemonEl.style.backgroundColor = color;
   let image = '';

   // passa o id do pokemon, para gerar a URL de imagem correta
   if (pokemon.id < 10) {
      image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${pokemon.id}.png`;
   } else if (pokemon.id < 100) {
      image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${pokemon.id}.png`;
   } else {
      image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png`;
   }

   // monta o HTML do card, contendo os dados do pokemon
   pokemonEl.innerHTML = `
      <div class="img-container">
         <img src="${image}">
      </div>
      <div class="info">
         <span class="number">#${pokemon.id.toString().padStart(3, 0)}</span>
         <h3 class="name">${name}</h3>
         <small class="type"><span>${type}</span></small>
      </div>
   `;

   // adiciona o card criado ao DOM
   pokeContainer.appendChild(pokemonEl);
}

fetchPokemons();
