const buttonOpenSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");
const inputSearch = document.querySelector("#modal form input[name=search]");
const buttonSearch = document.querySelector("#modal form button");

buttonOpenSearch.addEventListener("click", () => {
    // Remove a classe hide, poderia tbm ter usado o toggle
    modal.classList.remove("hide");
    // Seta o foco para o input, sem precisar do usuário clicar nele.
    inputSearch.focus();
});

close.addEventListener("click", () => {
    closeModal();
});

// Adicionado evento ao pressionar teclas
// Foi utilizado o keydown e não o keypress, pois durante as pesquisa,
// foi constatado maior compatibilidade do keydown.
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "Escape":
            closeModal();
            break;
        
        case "Enter":
            buttonSearch.click();
            break;
    }
});

function closeModal() {
    modal.classList.add("hide");
    inputSearch.value = "";
}