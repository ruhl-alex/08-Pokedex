let pokes = [];
let pokeDetails = [];
let statsName = [];
let statsBaseStat = [];
let BASE_URL = "https://pokeapi.co/api/v2/";
let limit = 30;
let offSet = 0;
let currentIndex = 0;

async function onload() {
    showLoadingSpinner();
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

function renderPokes() {
    const pokeContainer = document.getElementById("poke-container");
    const searchInput = document.getElementById("search-input");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const showAllBtn = document.getElementById("show-all-btn");

    searchInput.value = "";
    pokeContainer.innerHTML = "";

    for (let index = 0; index < pokes.length; index++) {
        pokeContainer.innerHTML += renderPokeCards(index);
    }
    loadMoreBtn.classList.remove("d-none");
    showAllBtn.classList.add("d-none");
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
    console.log(pokes);
}

async function loadMorePokes() {
    showLoadingSpinner();
    offSet += limit;
    await loadPokes();
    await loadImgAndTypes();
    renderPokes();
    hideLoadingSpinner();
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

async function loadPokeDetailsHTML(index, button) {
    const detailsContent = document.getElementById("details-content");
    const detailsMainBtn = document.getElementById("details-main-btn");
    const detailsStatsBtn = document.getElementById("details-stats-btn");
    await loadPokeDetailsToArray(index);

    const pokemon = pokeDetails.find(poke => poke.id === index);
    detailsContent.innerHTML = "";

    if (button === 1) {
        detailsContent.innerHTML = showDetailMainInHTML(pokemon);
        detailsStatsBtn.classList.remove("active");
        detailsMainBtn.classList.add("active");
    } else if (button === 2) {
        detailsContent.innerHTML = showDetailStatsInHTML(pokemon);
        detailsStatsBtn.classList.add("active");
        detailsMainBtn.classList.remove("active");
    }
}

async function loadPokeDetailsToArray(index) {
    pokeListDetails = await loadDataFromApi("pokemon/" + (index + 1));

    if (pokeDetails.find(poke => poke.id === index)) {
        return;}

    for (let i = 0; i < pokeListDetails.stats.length; i++) {
        statsName.push(pokeListDetails.stats[i].stat.name.charAt(0).toUpperCase() + pokeListDetails.stats[i].stat.name.slice(1));
        statsBaseStat.push(pokeListDetails.stats[i].base_stat);}

    pokeDetails.push(
        {
            id: pokes[index - 1].id,
            name: pokes[index - 1].name,
            height: pokeListDetails.height,
            weight: pokeListDetails.weight,
            base_experience: pokeListDetails.base_experience,
            statsBaseStat: statsBaseStat,
            statsName: statsName,
        });
}

async function loadDataFromApi(path = "") {
    const pokeContainer = document.getElementById("poke-container");

    try {
        let response = await fetch(BASE_URL + path);
        const data = await response.json();
        return data;
    } catch (error) {
        pokeContainer.innerHTML = "";
        pokeContainer.innerHTML = loadApiError();
        return null;
    }
}

function renderTypes(types) {
    let typesHTML = "";
    for (let i = 0; i < types.length; i++) {
        typesHTML += returnTypesHTML(types, i);
    }
    return typesHTML;
}

function searchPoke() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const pokeContainer = document.getElementById("poke-container");
    const showAllBtn = document.getElementById("show-all-btn");
    const loadMoreBtn = document.getElementById("load-more-btn");

    if (searchInput.length < 3) { return; }
    pokeContainer.innerHTML = "";
    showLoadingSpinner();

    let found = false;
    for (let index = 0; index < pokes.length; index++) {
        if (pokes[index].name.toLowerCase().includes(searchInput)) {
            pokeContainer.innerHTML += renderPokeCards(index);
            found = true;
        }
    }
    if (found) {
        showAllBtn.classList.remove("d-none");
        loadMoreBtn.classList.add("d-none");
    } else {
        pokeContainer.innerHTML = showNoPokeFound(searchInput);
        loadMoreBtn.classList.add("d-none");
        showAllBtn.classList.add("d-none");
    }
    hideLoadingSpinner();
}

async function showPokeDetails(index) {
    const dialogRef = document.getElementById("poke-dialog");
    await loadPokeDetailsToArray(index + 1);
    dialogRef.innerHTML = showPokeDetailsHTML(index);

    currentIndex = index;
    dialogRef.showModal();
    dialogRef.classList.add("opened");
}

function changePokeDetails(index, direction) {
    let newIndex = index + direction;

    if (newIndex < 0) {
        newIndex = pokes.length - 1;
    } else if (newIndex >= pokes.length) {
        newIndex = 0;
    }
    showPokeDetails(newIndex);
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

document.addEventListener("keydown", (event) => {
    const dialogRef = document.getElementById("poke-dialog");
    if (!dialogRef.open) {
        return;
    }
    if (event.key === "ArrowRight") {
        showPokeDetails(currentIndex + 1);
    }
    if (event.key === "ArrowLeft") {
        showPokeDetails(currentIndex - 1);
    }
    if (event.key === "Escape") {
        closeDialog();
    }
});