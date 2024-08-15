import { commentSwitcher, selectedComment } from "./carousel.service.js";
import sendMessage from "./form.service.js";

//-------------------------DECLARATIONS DES VARIABLES--------------------------------//
const feelingsTitles = document.querySelectorAll(".feelings");
const targetsTitles = document.querySelectorAll(".targets");

// Carrousel:
const carrousel = document.getElementById("accueil-carousel");
const commentSelector = carrousel.querySelector(".comment-selector");
const previewComment = carrousel.querySelector(".arrow-crsl-left");
const nextComment = carrousel.querySelector(".arrow-crsl-right");
let commentSelected = 0;
const delay = 8; // Temps en seconde entre chaque affichage de commentaire
let commentDisplayer; // Cible l'afficheur pour le démarrer ou le réinitialiser
let touchStartX = 0;
let touchEndX = 0;
// Formulaire de contact
const mailSender = document.getElementById("mail-sender");

//--------------------------INITIALISATION DES LISTENERS--------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  feelingsTitles.forEach((element) => {
    viewPortEntranceObserver.observe(element);
  });
  targetsTitles.forEach((element) => {
    viewPortEntranceObserver.observe(element);
  });

  // Gestion des événements pour les boutons de sélection de commentaire
  commentSelector.addEventListener("change", (event) => {
    event.preventDefault();
    commentSwitcher(
      event.target.value - commentSelected,
      carrousel,
      commentSelected
    );
    commentSelected = selectedComment;
    commentRunner();
  });

  // Gestion des clics sur les boutons de navigation des commentaires
  previewComment.addEventListener("click", () => {
    commentSwitcher(-1, carrousel, commentSelected);
    commentSelected = selectedComment;
    commentRunner();
  });

  nextComment.addEventListener("click", () => {
    commentSwitcher(+1, carrousel, commentSelected);
    commentSelected = selectedComment;
    commentRunner();
  });
  //glissement tactile sur le carrousel
  carrousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX; // capture le premier point de contact
  });

  carrousel.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX; // capture le dernier point de contact
    handleSwipe(touchStartX, touchEndX, carrousel, commentSelected);
    commentSelected = selectedComment;
    commentRunner();
  });
  // Démarrage du carrousel de commentaires
  commentSwitcher(0, carrousel, commentSelected); // Démarre l'afficheur de commentaires dès le chargement
  commentRunner(); // puis démarre le minuteur pour switcher l'affichage tous les n secondes (cf: const delay)
 
  // Envoi du formulaire de contact au back-end
  mailSender.addEventListener("submit", (event) => {
    postToMailer(event);
  });
});

//----------------------------FONCTIONS------------------------------//

// Observeur d'entrée des éléments dans le viewport
const observerOptions = {
  threshold: 1, // Le seuil de 1 signifie que l'observer déclenchera une entrée lorsque 100% de l'élément sera visible dans le viewport.
};

const viewPortEntranceObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(...["hidden", "hidden-smooth"]);
        observer.unobserve(entry.target); // Désabonne pour éviter les fuites de mémoire
      }
    });
  },
  observerOptions
);
// Fonstion pour changer les commentaires au balayage tactile du carrousel
function handleSwipe(
  touchStart,
  touchEnd,
  carrouselRef,
  currentCommentselected
) {
  if (touchStart > touchEnd ) {
    console.log("Swipe gauche détecté!");
    // Action pour un swipe vers la gauche
    commentSwitcher(-1, carrouselRef, currentCommentselected);
  }
  if (touchStart < touchEnd) {
    console.log("Swipe droite détecté!");
    // Action pour un swipe vers la droite
    commentSwitcher(+1, carrouselRef, currentCommentselected);
  }
}

// Fonction pour faire défiler les commentaires automatiquement
function commentRunner() {
  // Remet le compteur de l'afficheur à zéro s'il est lancé
  if (commentDisplayer) {
    clearInterval(commentDisplayer);
  }

  // Démarre un nouvel intervalle
  commentDisplayer = setInterval(() => {
    commentSwitcher(+1, carrousel, commentSelected);
    commentSelected = selectedComment;
  }, delay * 1000);
}

// Fonction d'envoi vers mail_sender.php
function postToMailer(event) {
  event.preventDefault();
  const message = document.getElementById("message").value;
  const email = document.getElementById("client-email").value;
  sendMessage(message, email);
}
