const pokemons = document.querySelectorAll(".pokeDiv");
const title = document.querySelector(".imageHead");
const searchBt = document.querySelector(".fa-magnifying-glass");
const searchInput = document.querySelector("input");
const menuClose = document.querySelector(".fa-xmark");
const menu = document.querySelector(".collapsible");
const menuContent = document.querySelector(".content");
const updateBt = document.querySelector(".update");
const dialog = document.querySelector("dialog");
const descriptionUpdate = document.querySelector(".updateDesc");
const description = document.querySelector(".description");
const btCloseModal = document.querySelector(".modalClose");

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

if (btCloseModal) {
  btCloseModal.addEventListener("click", () => {
    dialog.close();
  });
}

if (updateBt) {
  updateBt.addEventListener("click", () => {
    descriptionUpdate.value = description.innerText;
    dialog.showModal();
  });
}
