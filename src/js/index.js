isMenuOpened = false;
menuBtn = document.getElementById("menuTrigger");
menuBtn.addEventListener("click", (event) => {
  event.preventDefault();
  toggleMenu();
});
function toggleMenu() {
  isMenuOpened ? (isMenuOpened = false) : (isMenuOpened = true);
  alert("isMenuOpened ?: " + isMenuOpened);
}
