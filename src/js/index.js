isMenuOpened = false;
menuBtn = document.getElementById("menuTrigger");
menu = document.querySelector('.menu')
menuStripes = document.querySelectorAll('.stripe')

menuBtn.addEventListener("click", (event) => {
  event.preventDefault();
  toggleMenu();
});
function toggleMenu() {
  menu.classList.toggle('menu-hidden') 
  menuStripes[0].classList.toggle('stripe-top-opened')
  menuStripes[1].classList.toggle('stripe-middle-opened')
  menuStripes[2].classList.toggle('stripe-bottom-opened')

}
function postToIframe(event){alert('envoie de'+ event.target)}