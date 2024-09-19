import sendMessage from "./message.service.js";
import { commentSwitcher, selectedComment } from "./carousel.service.js";
// Déclarations des variables
let selectedPage = window.location.search.slice(1); // slice(1) extrait tout la string après le premier caractère (débarrase le ? du parmas)
const menulinks = document.querySelectorAll("nav.menu>ul>li>a");
const mainContenair = document.getElementById("content-eager");
//Ajout NG: aller chercher les éléments du header pour en changer les valeurs

//const HEAD_title = document.getElementById("HEAD_title");

const customersAlertWrapper = document.querySelector(
  "#customers-alert-wrapper"
);
const customersAlert = document.querySelector("#customers-alert-wrapper>p");
let comment1Selected = 0;
let comment2Selected = 0;
//--------------------------INITIALISATION--------------------------------//
// Initialisation du DOMContentLoaded avant l'injection du main
document.addEventListener("DOMContentLoaded", async () => {
  switch (selectedPage) {
    case "offre":
      //          ***INJECTION DE LA PAGE OFFRE***
      await injectHTML("/pages/offre.html").then(() => {
        menulinks[1].classList.toggle("link-selected");
        //injecter les valeurs des div introduction et presentation

        //carrousel 1
        const shortSupportComments = document.getElementById("short-support");
        const previewComment1 =
          shortSupportComments.querySelector(".arrow-crsl-left");
        const nextComment1 =
          shortSupportComments.querySelector(".arrow-crsl-right");
        const selectorBtn1 =
          shortSupportComments.querySelector(".comment-selector");
        let touchStartX1 = 0;
        let touchEndX1 = 0;
        // init
        commentSwitcher(0, shortSupportComments, comment1Selected);
        previewComment1.addEventListener("click", () => {
          commentSwitcher(-1, shortSupportComments, comment1Selected);
          comment1Selected = selectedComment;
        });
        nextComment1.addEventListener("click", () => {
          commentSwitcher(+1, shortSupportComments, comment1Selected);
          comment1Selected = selectedComment;
        });
        selectorBtn1.addEventListener("change", (event) => {
          event.preventDefault();
          commentSwitcher(
            event.target.value - comment1Selected,
            shortSupportComments,
            comment1Selected
          );
          comment1Selected = selectedComment;
        });
        //glissement tactile sur le carrousel
        shortSupportComments.addEventListener("touchstart", (event) => {
          touchStartX1 = event.changedTouches[0].screenX; // capture le premier point de contact
        });

        shortSupportComments.addEventListener("touchend", (event) => {
          touchEndX1 = event.changedTouches[0].screenX; // capture le dernier point de contact
          handleSwipe(
            touchStartX1,
            touchEndX1,
            shortSupportComments,
            comment1Selected
          );
          comment1Selected = selectedComment;
        });
        //carrousel 2
        const individualSupportComments =
          document.getElementById("individual-support");
        const previewComment2 =
          individualSupportComments.querySelector(".arrow-crsl-left");
        const nextComment2 =
          individualSupportComments.querySelector(".arrow-crsl-right");
        const selectorBtn2 =
          individualSupportComments.querySelector(".comment-selector");
        let touchStartX2 = 0;
        let touchEndX2 = 0;
        // init
        commentSwitcher(0, individualSupportComments, comment2Selected);
        previewComment2.addEventListener("click", () => {
          commentSwitcher(-1, individualSupportComments, comment2Selected);
          comment2Selected = selectedComment;
        });
        nextComment2.addEventListener("click", () => {
          commentSwitcher(+1, individualSupportComments, comment2Selected);
          comment2Selected = selectedComment;
        });
        selectorBtn2.addEventListener("change", (event) => {
          event.preventDefault();
          commentSwitcher(
            event.target.value - comment2Selected,
            individualSupportComments,
            comment2Selected
          );
          comment2Selected = selectedComment;
        });
        //glissement tactile sur le carrousel
        individualSupportComments.addEventListener("touchstart", (event) => {
          touchStartX2 = event.changedTouches[0].screenX; // capture le premier point de contact
        });

        individualSupportComments.addEventListener("touchend", (event) => {
          touchEndX2 = event.changedTouches[0].screenX; // capture le dernier point de contact
          handleSwipe(
            touchStartX2,
            touchEndX2,
            individualSupportComments,
            comment2Selected
          );
          comment2Selected = selectedComment;
        });
      });
      break;
    case "about":
      //          ***INJECTION DE LA PAGE PROPOS***
      injectHTML("/pages/about.html");
      menulinks[2].classList.toggle("link-selected");
      break;
    case "contact":
      //          ***INJECTION DE LA PAGE CONTACT***
      await injectHTML("/pages/contact.html").then(() => {
        const contactForm = document.getElementById("contact-form");
        const messageField = document.getElementById("message");
        const emailField = document.getElementById("client-email");
        const senderBtn = document.getElementById("sender-btn");

        contactForm.addEventListener("change", () => {
          messageField.validity.valid && emailField.validity.valid
            ? senderBtn.classList.remove("sender-btn-disabled")
            : senderBtn.classList.add("sender-btn-disabled");
        });
        contactForm.addEventListener("submit", (event) => {
          formSubmit(event);
          contactForm.reset();
          senderBtn.classList.add("sender-btn-disabled");
        });
      });
      menulinks[3].classList.toggle("link-selected");
      break;
    case "legal":
      //          ***INJECTION DE LA PAGE MENTIONS LEGAL***
      injectHTML("/pages/legal.html");
      break;
    case "confidentiality":
      //          ***INJECTION DE LA PAGE DECLARATION DE CONFIDENTIALITEE***
      injectHTML("/pages/confidentiality.html");
      break;
    default:
      injectHTML("/pages/404.html");
  }
});

//----------------------------FONCTIONS------------------------------//
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

// Fonction pour injecter le contenu HTML
function injectHTML(htmlFileUrl) {
  return fetch(htmlFileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      mainContenair.innerHTML = html;
    })
    .catch((error) => {
      console.error("Erreur lors du chargement du fichier HTML:", error);
      return "<section><h1>Désolé, une erreur s'est produite, si le problême persiste, merci de m'en informer</h1><p>Nathalie.</p></section>";
    });
}
// Fonction d'envoi du formulaire
function formSubmit(event) {
  event.preventDefault();
  const message = document.getElementById("message").value;
  const clientEmail = document.getElementById("client-email").value;
  sendMessage(message, clientEmail).then((res) => {
    customersAlert.textContent = res;
    customersAlertWrapper.classList.remove("hidden");
    customersAlert.classList.remove("hidden");
    setTimeout(() => {
      customersAlert.classList.add("hidden");
      customersAlertWrapper.classList.add("hidden");
    }, 5000);
  });
}