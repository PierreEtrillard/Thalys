// Déclarations des variables
const scrollUpBtn = document.querySelector("button.command-btn");
const messageBtn = document.querySelector("a.command-btn-bottom");
const menuTrigger = document.getElementById("menuTrigger");
let hideScrollUpBtnTimeout;
const menu = document.querySelector(".menu");
const menuStripes = document.querySelectorAll(".stripe");
// ciblage des éléments à traduire 
//HTML
const html_language = document.getElementById("html_language");
//HEAD
const head_title = document.getElementById("head_title");
const head_title_social_media1 = document.getElementById("head_title_social_media1"); //plusieurs éléments de cette classe
const head_title_social_media2 = document.getElementById("head_title_social_media2"); //plusieurs éléments de cette classe
const head_description = document.getElementById("head_description");
const head_description_social_media1 = document.getElementById("head_description_social_media1");
const head_description_social_media2 = document.getElementById("head_description_social_media2");
//CHEVRON
const chevron_label_up = document.getElementById("chevron_label_up");
const chevron_alt_img = document.getElementById("chevron_alt_img");
const chevron_label_contact = document.getElementById("chevron_label_contact");
//HEADER
const header_full_name = document.getElementById("header_full_name");
const header_alt_photo = document.getElementById("header_alt_photo");
const header_label_href_home = document.getElementById("header_label_href_home");
const header_label_href_offer = document.getElementById("header_label_href_offer");
const header_label_href_about = document.getElementById("header_label_href_about");
const header_label_href_contact = document.getElementById("header_label_href_contact");
const intro_title = document.getElementById("intro_title");
const intro_quote = document.getElementById("intro_quote");
const presentation_text = document.getElementById("presentation_text");
const presentation_picture = document.getElementById("presentation_picture");
//FOOTER
const footer_label_call_btn = document.getElementById("footer_label_call_btn");
const footer_label_href_legal = document.getElementById("footer_label_href_legal");
const footer_legal = document.getElementById("footer_legal");
const footer_label_href_about = document.getElementById("footer_label_href_about");
const footer_confidentiality = document.getElementById("footer_confidentiality");
const footer_copyrights = document.getElementById("footer_copyrights");
const footer_credits = document.getElementById("footer_credits");
const footer_label_href_credits = document.getElementById("footer_label_href_credits");
//--------------------------INITIALISATION--------------------------------//
//  injection du texte ds LANG/**.json
fetch("/LANG/text.json")
  .then((res) => res.json())
  .then((textObject) => {
    console.table(textObject);
    html_language.setAttribute("lang", textObject.html.langue);
    head_title.textContent = textObject.head.title; 
    head_title_social_media1.setAttribute("content", textObject.head.title_social_media1);
    head_title_social_media2.setAttribute("content", textObject.head.title_social_media2);
    head_description.setAttribute("content", textObject.head.description);
    head_description_social_media1.setAttribute("content", textObject.head.description_social_media1);
    head_description_social_media2.setAttribute("content", textObject.head.description_social_media2);
    chevron_label_up.setAttribute("aria-label", textObject.chevron.label_up);
    chevron_alt_img.setAttribute("alt", textObject.chevron.alt_img);
    chevron_label_contact.setAttribute("aria-label", textObject.chevron.label_contact);
    header_full_name.textContent = textObject.header.full_name; 
    intro_title.textContent = textObject.header.home.intro_title;
    intro_quote.textContent = textObject.header.home.intro_quote;
    presentation_text.textContent = textObject.header.home.presentation_text;
    presentation_picture.textContent = textObject.header.home.presentation_picture;
  });
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
