const pokemons = document.querySelectorAll(".pokeDiv");
const title = document.querySelector(".titleHead");
pokemons.forEach((poke) => {
  poke.addEventListener("click", () => {
    const key = poke.getAttribute("key");
    location.href = "/details/" + key;
  });
});

title.addEventListener("click", () => {
  location.href = "/";
});
