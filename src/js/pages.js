import sendMessage from "./message.service.js";
import { commentSwitcher, selectedComment } from "./carousel.service.js";
// Déclarations des variables
let selectedPage = window.location.search.slice(1); // slice(1) extrait tout la string après le premier caractère (débarrase le ? du parmas)
const menulinks = document.querySelectorAll("nav.menu>ul>li>a");
const mainContenair = document.getElementById("content-eager");
const customersAlertWrapper = document.querySelector(
  "#customers-alert-wrapper"
);
const customersAlert = document.querySelector("#customers-alert-wrapper>p");
// ciblage des éléments à traduire spécifiques à chaque page
//HEAD
const head_title = document.getElementById("head_title");

let comment1Selected = 0;
let comment2Selected = 0;
//--------------------------INITIALISATION--------------------------------//
// Initialisation du DOMContentLoaded avant l'injection du main
document.addEventListener("DOMContentLoaded", async () => {
  switch (selectedPage) {

    case "offre":
      //          ***INJECTION DE LA PAGE OFFRE***
      await injectHTML("/pages/offre.html").then(() => {
       //Le elements de la page ne sont accessibles que lorsque la page est injectée dans le html 
        //HEADER 
        const presentation_text = document.getElementById("presentation_text");
        const presentation_picture = document.getElementById("presentation_picture");
        //OFFER
        const title_special = document.getElementById("title_special");
        const title_special_1 = document.getElementById("title_special_1");
        const text_special_1 = document.getElementById("text_special_1");
        const title_special_2 = document.getElementById("title_special_2");
        const text_special_2 = document.getElementById("text_special_2");
        const title_special_3 = document.getElementById("title_special_3");
        const text_special_3 = document.getElementById("text_special_3");
        const title_special_quote = document.getElementById("title_special_quote");
        const special_quote_1 = document.getElementById("special_quote_1");
        const special_quote_2 = document.getElementById("special_quote_2");
        const special_quote_3 = document.getElementById("special_quote_3");
        const call_to_action_1 = document.getElementById("call_to_action_1");
        const title_individual = document.getElementById("title_individual");
        const text_individual = document.getElementById("text_individual");
        const title_individual_quote = document.getElementById("title_individual_quote");
        const individual_quote_1 = document.getElementById("individual_quote_1");
        const individual_quote_2 = document.getElementById("individual_quote_2");
        const individual_quote_3 = document.getElementById("individual_quote_3"); 
        const call_to_action_2 = document.getElementById("call_to_action_2");
        const title_group = document.getElementById("title_group");
        const text_group_1 = document.getElementById("text_group_1");
        
        const call_to_action_3 = document.getElementById("call_to_action_3");
        const call_to_action_4 = document.getElementById("call_to_action_4");

      fetch("/LANG/text.json")
        .then((res) => res.json())
        .then((textObject) => {
          head_title.textContent = textObject.head.title_offer; 
          intro_title.textContent = textObject.offer.intro_title;
          intro_quote.textContent = textObject.offer.intro_quote;
          presentation_text.textContent = textObject.offer.presentation_text;
          presentation_picture.setAttribute("src", textObject.offer.presentation_picture_src);
          presentation_picture.setAttribute("alt", textObject.offer.presentation_picture_alt);
          title_special.textContent = textObject.offer.title_special;
          title_special_1.textContent = textObject.offer.title_special_1;
          text_special_1.textContent = textObject.offer.text_special_1;
          title_special_2.textContent = textObject.offer.title_special_2;
          text_special_2.textContent = textObject.offer.text_special_2;
          title_special_3.textContent = textObject.offer.title_special_3;
          text_special_3.textContent = textObject.offer.text_special_3;
          title_special_quote.textContent = textObject.offer.title_special_quote;
          special_quote_1.textContent = textObject.offer.special_quote_1; 
          special_quote_2.textContent = textObject.offer.special_quote_2;
          special_quote_3.textContent = textObject.offer.special_quote_3;
          call_to_action_1.textContent = textObject.offer.call_to_action_1;    
          title_individual.textContent = textObject.offer.title_individual;
          text_individual.textContent = textObject.offer.text_individual;
          title_individual_quote.textContent = textObject.offer.title_individual_quote;
          individual_quote_1.textContent = textObject.offer.individual_quote_1;
          individual_quote_2.textContent = textObject.offer.individual_quote_2;
          individual_quote_3.textContent = textObject.offer.individual_quote_3;
          call_to_action_2.textContent = textObject.offer.call_to_action_2;        
          title_group.textContent = textObject.offer.title_group;
          text_group_1.textContent = textObject.offer.text_group_1;
          call_to_action_3.textContent = textObject.offer.call_to_action_3; 
          call_to_action_3.setAttribute("alt", textObject.offer.alt_cta3);
          call_to_action_4.textContent = textObject.offer.call_to_action_4; 
          call_to_action_4.setAttribute("alt", textObject.offer.alt_cta4);

        });
        menulinks[1].classList.toggle("link-selected");
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
      await injectHTML("/pages/about.html").then(() => {
        //HEADER
        const presentation_text = document.getElementById("presentation_text");
        const presentation_video = document.getElementById("presentation_video");
             
        const title = document.getElementById("title");
        const text_1 = document.getElementById("text_1");
        const text_2 = document.getElementById("text_2");
        const text_3 = document.getElementById("text_3");  
        
        const call_to_action_3 = document.getElementById("call_to_action_3");
        const call_to_action_4 = document.getElementById("call_to_action_4");
       
        //ABOUT
        fetch("/LANG/text.json")
        .then((res) => res.json())
        .then((textObject) => {
          head_title.textContent = textObject.head.title_about; 
          intro_title.textContent = textObject.about.intro_title;
          intro_quote.textContent = textObject.about.intro_quote;
          presentation_text.textContent = textObject.about.presentation_text;
          presentation_video.setAttribute("src", textObject.about.presentation_video_src);
          presentation_video.setAttribute("title", textObject.about.presentation_video_title);
          
          title.textContent = textObject.about.title;
          text_1.textContent = textObject.about.text_1;
          text_2.textContent = textObject.about.text_2;
          text_3.textContent = textObject.about.text_3;

          call_to_action_3.textContent = textObject.about.call_to_action_3; 
          call_to_action_3.setAttribute("alt", textObject.about.alt_cta3);
          call_to_action_4.textContent = textObject.about.call_to_action_4; 
          call_to_action_4.setAttribute("alt", textObject.about.alt_cta4);

        });
      });
      menulinks[2].classList.toggle("link-selected");
      break;
    case "contact":
      //          ***INJECTION DE LA PAGE CONTACT***
      await injectHTML("/pages/contact.html").then(() => {
        const presentation_text = document.getElementById("presentation_text");
        const presentation_picture = document.getElementById("presentation_picture");
        const title = document.getElementById("title"); 
        const text_1 = document.getElementById("text_1"); 
        const text_2 = document.getElementById("text_2"); 
        const message = document.getElementById("message"); 
        const mail = document.getElementById("client-email");
        const button = document.getElementById("sender-btn");
        const text_3 = document.getElementById("text_3"); 
        const call_to_action_3 = document.getElementById("call_to_action_3");
        const call_to_action_4 = document.getElementById("call_to_action_4");
      
        fetch("/LANG/text.json")
        .then((res) => res.json())
        .then((textObject) => {
          //HEADER
          head_title.textContent = textObject.head.title_contact; 
          intro_title.textContent = textObject.contact.intro_title;
          intro_quote.textContent = textObject.contact.intro_quote;
          //CONTACT
          presentation_text.textContent = textObject.contact.presentation_text;
          presentation_picture.setAttribute("src", textObject.contact.presentation_picture_src);
          presentation_picture.setAttribute("alt", textObject.contact.presentation_picture_alt);
          title.textContent = textObject.contact.title;
          text_1.textContent = textObject.contact.text_1;
          text_2.textContent = textObject.contact.text_2;
          message.setAttribute("placeholder", textObject.contact.text_message);
          mail.setAttribute("placeholder", textObject.contact.text_email);
          button.textContent = textObject.contact.text_button;
          text_3.textContent = textObject.contact.text_3;
          call_to_action_3.textContent = textObject.contact.call_to_action_3; 
          call_to_action_3.setAttribute("alt", textObject.contact.alt_cta3);
          call_to_action_4.textContent = textObject.contact.call_to_action_4; 
          call_to_action_4.setAttribute("alt", textObject.contact.alt_cta4);

        });
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
      //          ***INJECTION DE LA PAGE MENTIONS LEGALES***
      await injectHTML("/pages/legal.html").then(() => {
        const presentation_text = document.getElementById("presentation_text");
        const presentation_picture = document.getElementById("presentation_picture");
        const title = document.getElementById("title"); 
        const title_1 = document.getElementById("title_1"); 
        const identification_1 = document.getElementById("identification_1"); 
        const identification_2 = document.getElementById("identification_2"); 
        const identification_3 = document.getElementById("identification_3"); 
        const identification_4 = document.getElementById("identification_4"); 
        const identification_5 = document.getElementById("identification_5"); 
        const identification_6 = document.getElementById("identification_6"); 
        const title_2 = document.getElementById("title_2"); 
        const sub_title_1 = document.getElementById("sub_title_1"); 
        const text_1 = document.getElementById("text_1"); 
        const sub_title_2 = document.getElementById("sub_title_2"); 
        const text_2 = document.getElementById("text_2"); 
        const sub_title_3 = document.getElementById("sub_title_3"); 
        const text_3 = document.getElementById("text_3"); 
        const sub_title_4 = document.getElementById("sub_title_4"); 
        const text_4 = document.getElementById("text_4"); 
        const sub_title_5 = document.getElementById("sub_title_5"); 
        const text_5 = document.getElementById("text_5"); 
        const sub_title_6 = document.getElementById("sub_title_6"); 
        const text_6 = document.getElementById("text_6"); 

        fetch("/LANG/text.json")
        .then((res) => res.json())
        .then((textObject) => {
        //HEADER
        head_title.textContent = textObject.head.title_contact; 
        intro_title.textContent = textObject.legal.intro_title;
        intro_quote.textContent = textObject.legal.intro_quote;
        //CONFIDENTIALITY
        presentation_text.textContent = textObject.legal.presentation_text;
        presentation_picture.setAttribute("src", textObject.legal.presentation_picture_src);
        presentation_picture.setAttribute("alt", textObject.legal.presentation_picture_alt);
        
        title.textContent = textObject.legal.title;        
        title_1.textContent = textObject.legal.title_1;       
        identification_1.textContent = textObject.legal.identification_1;   
        identification_2.textContent = textObject.legal.identification_2;
        identification_3.textContent = textObject.legal.identification_3;
        identification_4.textContent = textObject.legal.identification_4;
        identification_5.textContent = textObject.legal.identification_5;
        identification_6.textContent = textObject.legal.identification_6;
        title_2.textContent = textObject.legal.title_2;
        sub_title_1.textContent = textObject.legal.sub_title_1;
        text_1.textContent = textObject.legal.text_1;
        sub_title_2.textContent = textObject.legal.sub_title_2;
        text_2.textContent = textObject.legal.text_2;
        sub_title_3.textContent = textObject.legal.sub_title_3;
        text_3.textContent = textObject.legal.text_3;        
        sub_title_4.textContent = textObject.legal.sub_title_4;
        text_4.textContent = textObject.legal.text_4;
        sub_title_5.textContent = textObject.legal.sub_title_5;
        text_5.textContent = textObject.legal.text_5;
        sub_title_6.textContent = textObject.legal.sub_title_6;
        text_6.textContent = textObject.legal.text_6;
        });
      });
      break;
    case "confidentiality":
      //          ***INJECTION DE LA PAGE DECLARATION DE CONFIDENTIALITE***
      await injectHTML("/pages/confidentiality.html").then(() => {
        const presentation_text = document.getElementById("presentation_text");
        const presentation_picture = document.getElementById("presentation_picture");
        const title = document.getElementById("title"); 
        const text_1 = document.getElementById("text_1"); 
        const link_text = document.getElementById("link_text"); 
        const text_2 = document.getElementById("text_2"); 
        fetch("/LANG/text.json")
        .then((res) => res.json())
        .then((textObject) => {
          head_title.textContent = textObject.head.title_confidentiality; 
          intro_title.textContent = textObject.confidentiality.intro_title;
          intro_quote.textContent = textObject.confidentiality.intro_quote;
          presentation_text.textContent = textObject.header.confidentiality.presentation_text;
          presentation_picture.setAttribute("src", textObject.confidentiality.presentation_picture_src);
          presentation_picture.setAttribute("alt", textObject.confidentiality.presentation_picture_alt);
          text_1.textContent = textObject.confidentiality.text_1;
          link_text.textContent = textObject.confidentiality.link_text;
          text_2.textContent = textObject.confidentiality.text_2;
        });
      });
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
  const language = document.getElementById("html_language").getAttribute("lang");
  sendMessage(message, clientEmail,language).then((res) => {
    customersAlert.textContent = res;
    customersAlertWrapper.classList.remove("hidden");
    customersAlert.classList.remove("hidden");
    //setTimeout(() => {
    //  customersAlert.classList.add("hidden");
    //  customersAlertWrapper.classList.add("hidden");
    //}, 5000);
  });
}