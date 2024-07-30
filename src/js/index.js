// Déclarations des variables
let isMenuOpened = false;
const scrollUpBtn = document.getElementById("scrollUp-btn");
const menu = document.querySelector(".menu");
const menuStripes = document.querySelectorAll(".stripe");
const feelingsTitles = document.querySelectorAll(".feelings");
const comments = document.querySelectorAll(".comment");
let currentCommentIndex = 0;
const commentSelector = document.getElementById("comment-selector");
const commentSelectorBtns = document.querySelectorAll('#comment-selector input[name="commment-selection"]');
const previewComment = document.querySelector(".arrow-crsl-left");
const nextComment = document.querySelector(".arrow-crsl-right");

let hideScrollUpBtnTimeout;

//--------------------------INITIALISATION--------------------------------//

// Ajout d'un écouteur d'événement pour le scroll
window.addEventListener("scroll", () => scrollUpBtnAppeared(0.2));

// Initialisation du DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  feelingsTitles.forEach((element) => {
    viewPortEntranceObserver.observe(element);
  });
});

// Gestion des événements pour les boutons de sélection de commentaire
commentSelector.addEventListener("change", (event) => {
  event.preventDefault();
  currentCommentIndex = parseInt(event.target.value, 10);
  switchComment(currentCommentIndex);
});

// Gestion des clics sur les boutons de navigation des commentaires
previewComment.addEventListener("click", () => {
  if (currentCommentIndex > 0) {
    currentCommentIndex -= 1;
    switchComment(currentCommentIndex);
  }
});
nextComment.addEventListener("click", () => {
  if (currentCommentIndex < comments.length - 1) {
    currentCommentIndex += 1;
    switchComment(currentCommentIndex);
  }
});

// Initialisation des états du commutateur de commentaire
commentSwitcherState();

// Démarrage du carrousel de commentaires
commentDisplayer(6); // Affiche le carrousel toutes les n secondes

//----------------------------FONCTIONS------------------------------//

// Fonction pour afficher le bouton de retour en haut de la page
function scrollUpBtnAppeared(minScrollHeight) {
  const scrollYposition = window.scrollY;
  const viewPortHeight = window.innerHeight;
  const triggerMinHeight = viewPortHeight * minScrollHeight; // Début du déclenchement à n% de scrollY

  if (scrollYposition >= triggerMinHeight) {
    scrollUpBtn.classList.remove("hidden");

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

// Fonction pour faire défiler la page vers le haut
function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Observeur d'entrée des éléments dans le viewport
const observerOptions = {
  threshold: 0.1, // Le seuil de 0.1 signifie que l'observer déclenchera une entrée lorsque 10% de l'élément sera visible dans le viewport.
};

const viewPortEntranceObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appeared");
        observer.unobserve(entry.target); // Désabonne pour éviter les fuites de mémoire
      }
    });
  },
  observerOptions
);

// Fonction pour basculer l'état du menu
function toggleMenu() {
  menu.classList.toggle("menu-hidden");
  menuStripes[0].classList.toggle("stripe-top-opened");
  menuStripes[1].classList.toggle("stripe-middle-opened");
  menuStripes[2].classList.toggle("stripe-bottom-opened");
}

// Fonction pour gérer l'état des flèches du carrousel
function commentSwitcherState() {
  if (currentCommentIndex <= 0) {
    previewComment.style.filter = "grayscale(1)";
  } else {
    previewComment.style.filter = "";
  }

  if (currentCommentIndex >= comments.length - 1) {
    nextComment.style.filter = "grayscale(1)";
  } else {
    nextComment.style.filter = "";
  }
}

// Fonction pour changer de commentaire
function switchComment(index) {
  commentSwitcherState();
  commentSelectorBtns[index].checked = true; // Check le bouton (utile dans l'utilisation des flèches de navigation du carrousel)
  comments.forEach((comment) => {
    comment.classList.remove("comment-selected"); // Nettoie les commentaires (évite les doublons)
  });
  comments[index].classList.add("comment-selected");
}

// Fonction pour faire défiler les commentaires automatiquement
async function commentDisplayer(delay){
  setInterval(() => {
    (currentCommentIndex < comments.length -1)?
     currentCommentIndex += 1 :
     currentCommentIndex = 0;
    switchComment(currentCommentIndex)
  }, delay * 1000);
  }

// Fonction de démonstration pour l'envoi du formulaire de contact (ajoute une action réelle ici)
function postToIframe(event) {
  alert("Envoi de " + event.target);
}
