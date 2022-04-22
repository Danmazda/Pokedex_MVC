const pokemons = document.querySelectorAll(".pokeDiv");
const title = document.querySelector(".imageHead");
// partials/header.ejs
// Search functionality
const searchBt = document.querySelector(".fa-magnifying-glass");
const searchInput = document.querySelector("input");
//Menu On mobile
const menuClose = document.querySelector(".fa-xmark");
const menu = document.querySelector(".collapsible");
const menuContent = document.querySelector(".content");

//Details.ejs
const updateBt = document.querySelector(".update");
const dialog = document.querySelector("dialog");
//Description value in the form (details.ejs)
const descriptionUpdate = document.querySelector(".updateDesc");
const description = document.querySelector(".description");
const btModalClose = document.querySelector(".modalClose");

//Confirmation modal functionality
const openConfirmationModal = document.querySelector(".openConfirmation");
const confirmationModal = document.querySelector(".confirmation");
const closeConfirmationModal = document.querySelector(".closeConfirmation");

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

// if statements so that script does not break
if (btModalClose) {
  btModalClose.addEventListener("click", () => {
    dialog.close();
  });
}

if (updateBt) {
  updateBt.addEventListener("click", () => {
    descriptionUpdate.value = description.innerText;
    dialog.showModal();
  });
}

if (openConfirmationModal) {
  openConfirmationModal.addEventListener("click", () => {
    confirmationModal.showModal();
  });
  closeConfirmationModal.addEventListener("click", () => {
    confirmationModal.close();
  });
}
