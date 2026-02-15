let pokes = [];
let podeDetails = [];
let BASE_URL = "https://pokeapi.co/api/v2/";
let limit = 30;
let offSet = 0;

async function onload() {
    await loadPokes();
    await loadImgAndTypes();
    renderPokes();
}

function renderPokes() {
    const pokeContainer = document.getElementById("poke-container");
    pokeContainer.innerHTML = "";
    showLoadingSpinner();
    for (let index = 0; index < pokes.length; index++) {
        pokeContainer.innerHTML +=  renderPokeCards(index);
}
    hideLoadingSpinner();
}

async function loadPokes() {
    let pokesList = await loadDataFromApi(`pokemon?limit=${limit}&offset=${offSet}`);
    for (let index = 0; index < pokesList.results.length; index++) {

        pokes.push(
            {
                id: index + 1,
                name: pokesList.results[index].name.charAt(0).toUpperCase() + pokesList.results[index].name.slice(1),
                url: pokesList.results[index].url,
            }
        );
    }
}

async function loadImgAndTypes() {
    for (let index = 0; index < pokes.length; index++) {
        let pokesList2 = await loadDataFromApi("pokemon/" + (index + 1))
        let typesArray = [];

        pokes[index].img = pokesList2.sprites.other["official-artwork"].front_default;

        for (let i = 0; i < pokesList2.types.length; i++) {
            typesArray.push(pokesList2.types[i].type.name.charAt(0).toUpperCase() + pokesList2.types[i].type.name.slice(1));
        }
        pokes[index].type = typesArray;
    }
}

async function loadDataFromApi(path = "") {
    let response = await fetch(BASE_URL + path);
    return responseToJson = await response.json();
}

function renderTypes(types) {
    let typesHTML = "";
    for (let i = 0; i < types.length; i++) {
        typesHTML += returnTypesHTML(types, i);
    }
    return typesHTML;
}

async function loadMorePokes() {
    showLoadingSpinner();
    offSet += limit;
    await loadPokes();
    await loadImgAndTypes();
    renderPokes();
    hideLoadingSpinner();
}

function showLoadingSpinner() {
    document.getElementById("loader-overlay").classList.remove("d-none");
}

function hideLoadingSpinner() {
    document.getElementById("loader-overlay").classList.add("d-none");
}

function searchPoke() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const pokeContainer = document.getElementById("poke-container");
    pokeContainer.innerHTML = "";
    showLoadingSpinner();
    if (searchInput.length >= 3) {
    for (let index = 0; index < pokes.length; index++) {
        if (pokes[index].name.toLowerCase().includes(searchInput)) {
            pokeContainer.innerHTML += renderPokeCards(index);
        }   
    }
    } else {
        renderPokes();
    }
    hideLoadingSpinner();
}

function showPokeDetails(index) {
    const dialogRef = document.getElementById("poke-dialog");
    dialogRef.innerHTML = showPokeDetailsHTML(index);
    dialogRef.showModal();
    dialogRef.classList.add("opened");
}

function closeDialog() {
    const dialogRef = document.getElementById("poke-dialog");
    dialogRef.close();
    dialogRef.classList.remove("opened");
}

document.addEventListener("click", (event) => {

    const dialogRef = document.getElementById("poke-dialog");
    if (!dialogRef.open) {
        return;
    }
    if (event.target === dialogRef) {
        closeDialog();
    }
});