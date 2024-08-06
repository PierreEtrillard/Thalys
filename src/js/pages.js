import sendMessage from "./form.service.js";
// Déclarations des variables
let selectedPage = window.location.search.slice(1); // slice(1) extrait tout la string après le premier caractère (débarrase le ? du parmas)
const menulinks = document.querySelectorAll('nav.menu>ul>li>a');
const mainContenair = document.getElementById('content-eager');
//--------------------------INITIALISATION--------------------------------//
// Initialisation du DOMContentLoaded avant l'injection du main
document.addEventListener("DOMContentLoaded", () => {
switch (selectedPage) {
  case "offre":
    menulinks[1].classList.toggle('link-selected');
    injectHTML('/pages/offre.html');
    break;
  case "about":
    menulinks[2].classList.toggle('link-selected');
    injectHTML('/pages/about.html');
    break;
  case "contact":
    menulinks[3].classList.toggle('link-selected');
    injectHTML('/pages/contact.html');
    break;
  case "legal":
    injectHTML('/pages/legal.html');
    break;
  case "confidentiality":
    injectHTML('/pages/confidentiality.html');
    break;
  default:
    injectHTML('/pages/404.html')
}
});

//----------------------------FONCTIONS------------------------------//
// Fonction pour injecter le contenu HTML
function injectHTML(htmlFileUrl) {
  return fetch(htmlFileUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
            return response.text();
          })
          .then(html => {
            mainContenair.innerHTML= html;
          })
          .catch(error => {
            console.error('Erreur lors du chargement du fichier HTML:', error);
          });
        }
            // Fonction d'envoi du formulaire
    function formSubmit() {      
      const message = document.getElementById('message').value;
      const clientEmail = document.getElementById('client-email').value;
      
      console.log('Message:', message);
      console.log('Client Email:', clientEmail);

      // sendMessage(message, clientEmail);
    };