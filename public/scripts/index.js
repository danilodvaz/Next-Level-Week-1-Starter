const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");
const inputSearch = document.querySelector("#modal form input[name=search]");

buttonSearch.addEventListener("click", () => {
    // Remove a classe hide, poderia tbm ter usado o toggle
    modal.classList.remove("hide");
    // Seta o foco para o input, sem precisar do usuário clicar nele.
    inputSearch.focus();
});

close.addEventListener("click", () => {
    modal.classList.add("hide");
});