import { commentSwitcher, selectedComment } from "./carousel.service.js";
import sendMessage from "./message.service.js";

//-------------------------DECLARATIONS DES VARIABLES--------------------------------//
const feelingsTitles = document.querySelectorAll(".feelings");
const targetsTitles = document.querySelectorAll(".targets");
const customersAlertWrapper = document.querySelector(
  "#customers-alert-wrapper"
);
const customersAlert = document.querySelector("#customers-alert-wrapper>p");
// ciblage des éléments à traduire 
//HOME
const presentation_text = document.getElementById("presentation_text");
const presentation_picture = document.getElementById("presentation_picture");
const title_1 = document.getElementById("title_1");
const title_1_1 = document.getElementById("title_1_1");
const alt_1_1 = document.getElementById("alt_1_1");
const text_1_1 = document.getElementById("text_1_1");

const title_1_2 = document.getElementById("title_1_2");
const alt_1_2 = document.getElementById("alt_1_2");
const text_1_2 = document.getElementById("text_1_2");
const title_1_3 = document.getElementById("title_1_3");
const alt_1_3 = document.getElementById("alt_1_3");
const text_1_3 = document.getElementById("text_1_3");

const title_Listening = document.getElementById("title_Listening");
const text_Listening = document.getElementById("text_Listening");

const call_to_action_1 = document.getElementById("call_to_action_1");

const title_2 = document.getElementById("title_2");
const title_2_1 = document.getElementById("title_2_1");
const alt_2_1 = document.getElementById("alt_2_1");
const text_2_1 = document.getElementById("text_2_1");
const title_2_2 = document.getElementById("title_2_2");
const alt_2_2 = document.getElementById("alt_2_2");
const text_2_2 = document.getElementById("text_2_2");
const title_2_3 = document.getElementById("title_2_3");
const alt_2_3 = document.getElementById("alt_2_3");
const text_2_3 = document.getElementById("text_2_3");
const title_3 = document.getElementById("title_3");
const call_to_action_2 = document.getElementById("call_to_action_2");
const title_3_3 = document.getElementById("title_3_3");
const quote_1 = document.getElementById("quote_1");
const quote_2 = document.getElementById("quote_2");
const quote_3 = document.getElementById("quote_3");
const call_to_action_3 = document.getElementById("call_to_action_3");
const call_to_action_4 = document.getElementById("call_to_action_4");

// Carrousel:
const carrousel = document.getElementById("accueil-carousel");
const commentSelector = carrousel.querySelector(".comment-selector");
const previewComment = carrousel.querySelector(".arrow-crsl-left");
const nextComment = carrousel.querySelector(".arrow-crsl-right");
let commentSelected = 0;
const delay = 10; // Temps en seconde entre chaque affichage de commentaire
let commentDisplayer; // Cible l'afficheur pour le démarrer ou le réinitialiser
let touchStartX = 0;
let touchEndX = 0;
// Formulaire de contact
/*Formulaire enlevé par NG le 01/10/2024
const mailSender = document.getElementById("mail-sender");
const messageField = document.getElementById("message");
const emailField = document.getElementById("client-email");
const senderBtn = document.querySelector(".sender-btn");*/

//--------------------------INITIALISATION--------------------------------//
//  injection du texte ds LANG/**.json
fetch("/LANG/text.json")
  .then((res) => res.json())
  .then((textObject) => {
    //HOME 
    intro_title.textContent = textObject.home.intro_title;
    intro_quote.textContent = textObject.home.intro_quote;
    presentation_text.textContent = textObject.home.presentation_text;
    presentation_picture.textContent = textObject.home.presentation_picture;
    title_1.textContent = textObject.home.title_1; 
    title_1_1.textContent = textObject.home.title_1_1; 
    alt_1_1.setAttribute("alt", textObject.home.alt_1_1);
    text_1_1.textContent = textObject.home.text_1_1; 
    title_1_2.textContent = textObject.home.title_1_2; 
    alt_1_2.setAttribute("alt", textObject.home.alt_1_2);
    text_1_2.textContent = textObject.home.text_1_2; 
    title_1_3.textContent = textObject.home.title_1_3; 
    alt_1_3.setAttribute("alt", textObject.home.alt_1_3);
    text_1_3.textContent = textObject.home.text_1_3; 
    call_to_action_1.textContent = textObject.home.call_to_action_1;
    call_to_action_1.setAttribute("aria-label", textObject.home.alt_cta1);
    title_Listening.textContent = textObject.home.title_Listening; 
    text_Listening.textContent = textObject.home.text_Listening; 
    title_2.textContent = textObject.home.title_2;
    title_2_1.textContent = textObject.home.title_2_1;  
    alt_2_1.setAttribute("alt", textObject.home.alt_2_1);
    text_2_1.textContent = textObject.home.text_2_1; 
    title_2_2.textContent = textObject.home.title_2_2; 
    alt_2_2.setAttribute("alt", textObject.home.alt_2_2);
    text_2_2.textContent = textObject.home.text_2_2; 
    title_2_3.textContent = textObject.home.title_2_3; 
    alt_2_3.setAttribute("alt", textObject.home.alt_2_3);
    text_2_3.textContent = textObject.home.text_2_3; 
    title_3.textContent = textObject.home.title_3; 
    call_to_action_2.textContent = textObject.home.call_to_action_2; 
    call_to_action_2.setAttribute("aria-label", textObject.home.alt_cta2);
    title_3_3.textContent = textObject.home.title_3_3; 
    quote_1.textContent = textObject.home.quote_1; 
    quote_2.textContent = textObject.home.quote_2; 
    quote_3.textContent = textObject.home.quote_3; 
    call_to_action_3.textContent = textObject.home.call_to_action_3; 
    call_to_action_3.setAttribute("aria-label", textObject.home.alt_cta3);
    call_to_action_4.textContent = textObject.home.call_to_action_4; 
    call_to_action_4.setAttribute("aria-label", textObject.home.alt_cta4);
    
   });


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

  /*Formulaire enlevé par NG le 01/10/2024
  mailSender.addEventListener("change", () => {
    messageField.validity.valid && emailField.validity.valid
      ? senderBtn.classList.remove("sender-btn-disabled")
      : senderBtn.classList.add("sender-btn-disabled");
  });
  // Envoi du formulaire de contact au back-end
  mailSender.addEventListener("submit", async (event) => {
    {
      await postToMailer(event);
      mailSender.reset();
      senderBtn.classList.add(sender - btn - disabled);
    }
  });*/
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
  if (touchStart > touchEnd) {
    // Action pour un swipe vers la gauche
    commentSwitcher(-1, carrouselRef, currentCommentselected);
  }
  if (touchStart < touchEnd) {
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
async function postToMailer(event) {
  event.preventDefault();

  sendMessage(messageField.value, emailField.value).then((res) => {
    customersAlert.textContent = res;
    customersAlertWrapper.classList.remove("hidden");
    customersAlert.classList.remove("hidden");
    setTimeout(() => {
      customersAlert.classList.add("hidden");
      customersAlertWrapper.classList.add("hidden");
    }, 5000);
  });
}
