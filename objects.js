// validação de dados antes da entrada

// Rotas
// Objeto:
class Pokemon {
  constructor(
    num,
    name,
    type,
    image,
    description,
    height,
    weight,
    category,
    ability
  ) {
    this.id = num;
    this.name = name;
    this.type = type;
    this.image = image;
    this.desc = description;
    this.height = height;
    this.weight = weight;
    this.category = category;
    this.ability = ability;
  }
}
const bulbasaur = new Pokemon(
  1,
  "Bulbasaur",
  "grass",
  " https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
  0.7,
  6.9,
  "seed",
  "overgrow"
);
const charmander = new Pokemon(
  4,
  "charmander",
  "fire",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
  "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
  0.6,
  8.5,
  "lizard",
  "blaze"
);
const squirtle = new Pokemon(
  7,
  "squirtle",
  "water",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
  "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
  0.5,
  9,
  "tiny turtle",
  "torrent"
);

export const pokedex = [bulbasaur, charmander, squirtle];
