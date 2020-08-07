const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");

buttonSearch.addEventListener("click", () => {
    // Remove a classe hide, poderia tbm ter usado o toggle
    modal.classList.remove("hide");
});

close.addEventListener("click", () => {
    modal.classList.add("hide");
});