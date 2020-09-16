populateUFs();

//Documento em que o js foi injetado
document
    //Retorna o elemento do html. O primeiro 'select' com o nome 'uf'
    .querySelector("select[name=uf]")
    //Sempre que o evento change for atividade, ele vai executar a função getCities.
    .addEventListener("change", getCities);


function populateUFs() {
    //Retorna o elemento do html. O primeiro 'select' com o nome 'uf'
    const ufSelect = document.querySelector("select[name=uf]");

    // Faz uma consulta na url e retorna uma promisse
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // .then((res) => { return res.json() });
    .then(res => res.json())
    .then(states => {
        for(const state of states) {
            // Adiciona elementos html em um elemento html
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    });
}

// Função está sendo passada como referência no EventListener.
// Ela recebe essa variável event do EventListener.
function getCities(event) {
    // Retorna o elemento html. O primeiro 'select' com nome 'city'
    const citySelect = document.querySelector("select[name=city]");
    // Funciona da mesma forma que o de cima
    const stateInput = document.querySelector("[name=state]");
    // Retorna o valor do elemento que disparou o evento
    const ufValue = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    const indexOfSelectedState = event.target.selectedIndex;

    stateInput.value = event.target.options[indexOfSelectedState].text;

    // Acessa a propriedade disabled do elemento
    citySelect.disabled = true;
    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`;

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citySelect.disabled = false;
    });
}

//Pega todos os elementos 'li' dentro da classe 'items-grid'
const itemsToCollect = document.querySelectorAll(".items-grid li");

//Adiciona um listener para cada 'li' retornado acima.
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;
    // Retorna o atributo 'data-id' adicionado no html
    const itemId = itemLi.dataset.id;
    const alreadySelected = selectedItems.findIndex(item => item == itemId);

    // Acessa as classes do elemento. Permite remover e adicionar classes.
    // O toggle verifica se existe a classe, se existir, ele remove. Se não existir a classe, ele adiciona.
    itemLi.classList.toggle("selected");

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => item != itemId);

        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems.join(", ");
}

function validateItems() {
    if (!collectedItems.value) {
        const legendItemsToCollect = document.querySelectorAll('#page-create-point form legend h2')[1];
        const moreThanOneItem = document.querySelector('#page-create-point form legend div');
        
        // Move o scroll da tela para o elemento. O parâmetro smooth deixa mais suave a transição.
        legendItemsToCollect.scrollIntoView({ behavior: 'smooth' });

        // Adicionar um esquema para destacar a mensagem q deve ser adicionado um ou mais
        moreThanOneItem.style.color = "red";
        moreThanOneItem.animate([
            { transform: "translateX(5px)" },
            { transform: "translateX(-5px)" },
            { transform: "translateX(5px)" }
        ], {
            duration: 400,
            iterations: 5
        });

        return false;
    }

    return true;
}