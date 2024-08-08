import sendMessage from "./form.service.js";
import commentSwitcher from "./carroussel.service.js";
// Déclarations des variables
let selectedPage = window.location.search.slice(1); // slice(1) extrait tout la string après le premier caractère (débarrase le ? du parmas)
const menulinks = document.querySelectorAll("nav.menu>ul>li>a");
const mainContenair = document.getElementById("content-eager");
//--------------------------INITIALISATION--------------------------------//
// Initialisation du DOMContentLoaded avant l'injection du main
document.addEventListener("DOMContentLoaded", async () => {
  switch (selectedPage) {
    case "offre":
      await injectHTML("/pages/offre.html").then(()=>{
        const comments = document.querySelectorAll(".comment");
        let currentCommentIndex = 0;
        const commentSelector = document.getElementById("comment-selector");
        const commentSelectorBtns = document.querySelectorAll(
          '#comment-selector input[name="commment-selection"]'
        );
        const previewComment = document.querySelector(".arrow-crsl-left");
        const nextComment = document.querySelector(".arrow-crsl-right");
        menulinks[1].classList.toggle("link-selected");
      });
      break;
    case "about":
      injectHTML("/pages/about.html");
      menulinks[2].classList.toggle("link-selected");
      break;
    case "contact":
      await injectHTML("/pages/contact.html").then(() => {
        const contactForm = document.getElementById("contact-form");
        contactForm.addEventListener("submit", (event) => formSubmit(event));
      });
      menulinks[3].classList.toggle("link-selected");
      break;
    case "legal":
      injectHTML("/pages/legal.html");
      break;
    case "confidentiality":
      injectHTML("/pages/confidentiality.html");
      break;
    default:
      injectHTML("/pages/404.html");
  }
});

//----------------------------FONCTIONS------------------------------//
// Fonction pour injecter le contenu HTML
// Fonction d'envoi du formulaire
function formSubmit(event) {
  event.preventDefault();
  const message = document.getElementById("message").value;
  const clientEmail = document.getElementById("client-email").value
sendMessage(message, clientEmail);
}
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
