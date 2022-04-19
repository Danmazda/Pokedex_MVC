const pokemons = document.querySelectorAll(".pokeDiv");
pokemons.forEach((poke) => {
  poke.addEventListener("click", () => {
    console.log(`clicked in ${poke.getAttribute("key")}`);
  });
});
