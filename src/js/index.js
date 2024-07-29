let isMenuOpened = false;
const menuBtn = document.getElementById("menuTrigger");
const menu = document.querySelector(".menu");
const menuStripes = document.querySelectorAll(".stripe");
const comments = document.querySelectorAll(".comment");
let currentCommentIndex = 0;
const commentSelector = document.getElementById("comment-selector");
const commentSelectorBtns = document.querySelectorAll(
  '#comment-selector input[name="commment-selection"]'
);
const previewComment = document.querySelector(".arrow-crsl-left");
const nextComment = document.querySelector(".arrow-crsl-right");

//--------------------------INITIALISATION--------------------------------//
menuBtn.addEventListener("click", (event) => {
  event.preventDefault();
  toggleMenu();
});

commentSelector.addEventListener("change", (event) => {
  event.preventDefault();
  currentCommentIndex = parseInt(event.target.value, 10);
  switchComment(currentCommentIndex);
});

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

commentSwitcherState();
commentDisplayer(6); // joue le carrousel toutes les n seconde
//----------------------------FONCTIONS------------------------------//
// animation de l'icone menu (version mobile exclusivement)
function toggleMenu() {
  menu.classList.toggle("menu-hidden");
  menuStripes[0].classList.toggle("stripe-top-opened");
  menuStripes[1].classList.toggle("stripe-middle-opened");
  menuStripes[2].classList.toggle("stripe-bottom-opened");
}

// grise les fléches du carrousel
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

// ajout/suppression de la class 'comment-selected' (affiche le commentaire)
function switchComment(index) {
  commentSwitcherState();
  commentSelectorBtns[index].checked = true;// check le bouton (utile dans l'utilisation des fléches de navigation du carrousel)
  comments.forEach((comment) => {
    comment.classList.remove("comment-selected");// nettoie les comments (evite les doublons)
  });
  comments[index].classList.add("comment-selected");
}

async function commentDisplayer(delay){
setInterval(() => {
  (currentCommentIndex < comments.length -1)?
   currentCommentIndex += 1 :
   currentCommentIndex = 0;
  console.log('switch comment to ' + currentCommentIndex);
  switchComment(currentCommentIndex)
}, delay * 1000);
}
// envoi du formulaire de contact
function postToIframe(event) {
  alert("envoi de " + event.target);
}
