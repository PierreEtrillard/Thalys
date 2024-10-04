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

//HOME
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

//FOOTER
const call_btn = document.getElementById("call_btn");
const href_legal = document.getElementById("href_legal");
const href_confidentiality = document.getElementById("href_confidentiality");
const copyrights = document.getElementById("copyrights");
const credits = document.getElementById("credits");
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
    //HOME 
    intro_title.textContent = textObject.home.intro_title;
    intro_quote.textContent = textObject.home.intro_quote;
    console.log(textObject.home.presentation_text);
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
    title_2.textContent = textObject.home.title_2;
    title_2_1.textContent = textObject.home.title_2_1;  
    alt_2_1.setAttribute("alt", textObject.home.alt_2_1);
    text_2_1.textContent = textObject.home.text_2_1; 
    title_2_2.textContent = textObject.home.title_2_2; 
    alt_2_2.setAttribute("alt", textObject.home.alt_2_2);
    title_2_3.textContent = textObject.home.title_2_3; 
    alt_2_3.setAttribute("alt", textObject.home.alt_2_3);
    text_2_3.textContent = textObject.home.text_2_3; 
    title_3.textContent = textObject.home.title_3; 
    call_to_action_2.textContent = textObject.home.call_to_action_2; 
    call_to_action_2.setAttribute("alt", textObject.home.alt_cta2);
    title_3_3.textContent = textObject.home.title_3_3; 
    quote_1.textContent = textObject.home.quote_1; 
    quote_2.textContent = textObject.home.quote_2; 
    quote_3.textContent = textObject.home.quote_3; 
    //FOOTER
    call_btn.setAttribute("aria-label", textObject.footer.label_call_btn);
    href_legal.setAttribute("aria-label", textObject.footer.label_href_legal);
    href_legal.textContent = textObject.footer.text_href_legal;
    href_confidentiality.setAttribute("aria-label", textObject.footer.label_href_confidentiality);
    href_confidentiality.textContent = textObject.footer.text_href_confidentiality;
    copyrights.setAttribute("aria-label", textObject.footer.label_copyrights);
    copyrights.textContent = textObject.footer.text_copyrights;
    credits.setAttribute("aria-label", textObject.footer.label_href_credits);
    credits.textContent = textObject.footer.text_href_credits;
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
