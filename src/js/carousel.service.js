let selectedComment = 0;

function commentSwitcher(move, carrousel, currentSelection) {
  const comments = carrousel.querySelectorAll(".comment");
  const arrowLeft = carrousel.querySelector(".arrow-crsl-left");
  const arrowRight = carrousel.querySelector(".arrow-crsl-right");
  const radioBtns = carrousel.querySelectorAll(
    '.comment-selector input[name="commment-selection"]'
  );
  const targetedComment = currentSelection + move;
  let hightestComment = 0;
  comments.forEach((comment) => {
    if (comment.offsetHeight > hightestComment) {
      hightestComment = comment.offsetHeight;
      carrousel.style.height = hightestComment + "px";
    }
    comment.classList.remove("comment-selected"); // Nettoie les commentaires (évite les doublons)
  });
  if (0 <= targetedComment && targetedComment < comments.length) {
    comments[targetedComment].classList.add("comment-selected");
    radioBtns[targetedComment].checked = true;
    selectedComment = targetedComment;
  }
  if (targetedComment < 0) {
    comments[comments.length - 1].classList.add("comment-selected");
    radioBtns[comments.length - 1].checked = true;
    selectedComment = comments.length - 1;
  }
  if (targetedComment > comments.length - 1) {
    comments[0].classList.add("comment-selected");
    radioBtns[0].checked = true;
    selectedComment = 0;
  }
  //  animation du grisage des flêches
  if (selectedComment <= 0) {
    arrowLeft.style.filter = "grayscale(1)";
  } else {
    arrowLeft.style.filter = "";
  }

  if (selectedComment >= comments.length - 1) {
    arrowRight.style.filter = "grayscale(1)";
  } else {
    arrowRight.style.filter = "";
  }
}
export { commentSwitcher, selectedComment };
