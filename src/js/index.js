// Déclarations des variables
const scrollUpBtn = document.querySelector("button.command-btn");
const messageBtn = document.querySelector("a.command-btn-bottom");
const menuTrigger = document.getElementById("menuTrigger");
let hideScrollUpBtnTimeout;
const menu = document.querySelector(".menu");
const menuStripes = document.querySelectorAll(".stripe");

//--------------------------INITIALISATION--------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  // Ajout d'un écouteur d'événement pour le scroll
  window.addEventListener("scroll", () => btnAppeared(0.2));
  // Retour haut de page
  scrollUpBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  // Ouverture du menu
  menuTrigger.addEventListener("click", () => {
    menu.classList.toggle("menu-hidden");
    menuStripes[0].classList.toggle("stripe-top-opened");
    menuStripes[1].classList.toggle("stripe-middle-opened");
    menuStripes[2].classList.toggle("stripe-bottom-opened");
  });
});
//----------------------------FONCTIONS------------------------------//

// Fonction pour afficher le bouton de retour en haut de la page
function btnAppeared(minScrollHeight) {
  const scrollYposition = window.scrollY;
  const viewPortHeight = window.innerHeight;
  const triggerMinHeight = viewPortHeight * minScrollHeight; // Début du déclenchement à n% de scrollY

  if (scrollYposition >= triggerMinHeight) {
    scrollUpBtn.classList.remove("hidden");
    messageBtn.classList.remove("hidden");
    // Annuler tout délai précédent
    if (hideScrollUpBtnTimeout) {
      clearTimeout(hideScrollUpBtnTimeout);
    }

    // Planifier la suppression de la classe après 2 secondes
    hideScrollUpBtnTimeout = setTimeout(() => {
      scrollUpBtn.classList.add("hidden");
    }, 2000);
  } else {
    // Si le défilement est en dessous du seuil, masquer immédiatement
    scrollUpBtn.classList.add("hidden");

    // Annuler tout délai précédent
    if (hideScrollUpBtnTimeout) {
      clearTimeout(hideScrollUpBtnTimeout);
    }
  }
}
