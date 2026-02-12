let pokes = [];

let BASE_URL = "https://pokeapi.co/api/v2/";

async function onload() {
    let pokesList = await loadDataFromApi("pokemon?limit=25&offset=0");
    
    for (let index = 0; index < pokesList.results.length; index++) {
        let pokesList2 = await loadDataFromApi2("pokemon/" + (index + 1))
        pokes.push(
            {
                id: index + 1,
                name: pokesList.results[index].name,
                url: pokesList.results[index].url,
                // img: pokesList2.results[index].spirites.other.official-artwork
            }
        );}
    console.log(pokes);
}

async function loadDataFromApi(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    return responseToJson = await response.json();
}

async function loadDataFromApi2(path = "") {
    let response = await fetch(BASE_URL + path);
    return responseToJson = await response.json();
}
