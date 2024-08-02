// Déclarations des variables
const feelingsTitles = document.querySelectorAll(".feelings");
const targetsTitles = document.querySelectorAll(".targets");
const comments = document.querySelectorAll(".comment");
let currentCommentIndex = 0;
const commentSelector = document.getElementById("comment-selector");
const commentSelectorBtns = document.querySelectorAll('#comment-selector input[name="commment-selection"]');
const previewComment = document.querySelector(".arrow-crsl-left");
const nextComment = document.querySelector(".arrow-crsl-right");
// import * as mailService from "./form.service.js";
//--------------------------INITIALISATION--------------------------------//
/* Initialisation du DOMContentLoaded avant le declenchement du listener sur les titre de la 
section 'feeling' et 'target*/
document.addEventListener("DOMContentLoaded", () => {
  feelingsTitles.forEach((element) => {
    viewPortEntranceObserver.observe(element);
  });
  targetsTitles.forEach((element) => {
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
commentDisplayer(8); // Affiche un commentaire dans le carrousel toutes les n secondes

//----------------------------FONCTIONS------------------------------//
// Observeur d'entrée des éléments dans le viewport
const observerOptions = {
  threshold: 1, // Le seuil de 1.4 signifie que l'observer déclenchera une entrée lorsque 100% de l'élément sera visible dans le viewport.
};
const viewPortEntranceObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(entry.target.textContent +"apparait dans le viewPort");
        entry.target.classList.remove(...["hidden","hidden-smooth"]);
        observer.unobserve(entry.target); // Désabonne pour éviter les fuites de mémoire
      }
    });
  },
  observerOptions
);
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

// Fonction d'envoi vers mail_sender.php
function postToMailer(event) {
  event.preventDefault();
  console.log('sended');        
  // const message = document.getElementById('message').value;
  // const email = document.getElementById('client-email').value;
  // mailService.sendMessage(message,email)
}
