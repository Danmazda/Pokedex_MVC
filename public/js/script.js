const pokemons = document.querySelectorAll(".pokeDiv");
const title = document.querySelector(".imageHead");
const searchBt = document.querySelector(".fa-magnifying-glass");
const searchInput = document.querySelector("input");
const menuClose = document.querySelector(".fa-xmark");
const menu = document.querySelector(".collapsible");
const menuContent = document.querySelector(".content");
const updateBt = document.querySelector(".update");
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

updateBt.addEventListener("click", () => {
  location.href = `/update`;
});

menu.addEventListener("click", () => {
  if (!menuContent.classList.contains("active")) {
    menuContent.classList.add("active");
  }
});
menuClose.addEventListener("click", () => {
  if (menuContent.classList.contains("active")) {
    menuContent.classList.remove("active");
  }
});
