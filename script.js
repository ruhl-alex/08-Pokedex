let pokes = [];
let BASE_URL = "https://pokeapi.co/api/v2/";
let limit = 20;
let offSet = 0;

async function onload() {
    await loadPokes();
    await loadImgAndTypes();
    renderPokes();
    console.log(pokes);
}

async function loadPokes() {
    let pokesList = await loadDataFromApi("pokemon?limit=${limit}&offset=${offSet}");
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
        typesHTML += `<span class="poke-type-span">${types[i]}</span>`;
    }
    return typesHTML;
}

async function loadMorePokes() {
    offSet += limit;
    await loadPokes();
    await loadImgAndTypes();
    renderPokes();
}