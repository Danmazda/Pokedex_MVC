const pokemons = document.querySelectorAll(".pokeDiv");
const title = document.querySelector(".imageHead");
const searchBt = document.querySelector(".fa-magnifying-glass");
const searchInput = document.querySelector("input");
pokemons.forEach((poke) => {
  poke.addEventListener("click", () => {
    const key = poke.getAttribute("key");
    location.href = "/details/" + key;
  });
});

title.addEventListener("click", () => {
  location.href = "/";
});

searchBt.addEventListener("click", () => {
  location.href = `/search/${searchInput.value}`;
});
