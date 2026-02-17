function renderPokeCards(index) {
    return `
            <div class="poke-card" onclick="showPokeDetails(${index})">
                <div class="poke-card-name">
                    ${pokes[index].name}
                </div>
                <div class="poke-card-img">
                    <img class="poke-img bg-${pokes[index].type[0]}" src="${pokes[index].img}" alt="${pokes[index].name}">
                </div>
                <div class="poke-card-art">
                    ${renderTypes(pokes[index].type)}
                </div>
            </div>
        `;
}

function showPokeDetailsHTML(index) {
    const pokemon = pokeDetails.find(poke => poke.id === pokes[index].id);

    return `
        <div class="dialog-header">
            <div class="dialog-header-left"></div>
            <div class="dialog-header-middle">
                <h2>${pokes[index].name}</h2>
            </div>
            <div class="dialog-header-right">
                <img src="./assets/img/close.png" id="closeButton" class="dialogButtonX" aria-label="Dialog schließen" onclick="closeDialog()">
            </div>
        </div>
        <div class="details-middle">
            <div class="next-prev-btns bg-${pokes[index].type[0]}">
            <img class="dialogButton bg-${pokes[index].type[0]}" src="./assets/img/left_left.png" aria-label="Vorheriges Pokémon anzeigen" onclick="changePokeDetails(${index}, -1)">
            </div>
            <img class="poke-img bg-${pokes[index].type[0]}" src="${pokes[index].img}" alt="${pokes[index].name}">
            <div class="next-prev-btns bg-${pokes[index].type[0]}">
            <img class="dialogButton bg-${pokes[index].type[0]}" src="./assets/img/right_right.png" aria-label="Nächstes Pokémon anzeigen" onclick="changePokeDetails(${index}, 1)">
            </div>
        </div>
        <div class="details-info">
            <div class="details-navbar">
                <button id="details-main-btn" onclick="loadPokeDetailsHTML(${pokes[index].id}, 1)" class="details-nav active">Main</button>
                <button id="details-stats-btn" onclick="loadPokeDetailsHTML(${pokes[index].id}, 2)" class="details-nav">Stats</button>
            </div>
            <div id="details-content" class="details-content">
                ${showDetailMainInHTML(pokemon)}
            </div>
        </div>
    `;
}

function returnTypesHTML(types, i) {
    return `
    <span class="poke-type-span bg-${types[i]}">${types[i]}</span>
    `;
}

function showDetailMainInHTML(pokemon) {
    return `
        <table>
            <tr>
                <td>Name:</td>
                <td>${pokemon.name}</td>
            </tr>
            <tr>
                <td>Height:</td>
                <td>${pokemon.height}</td>
            </tr>       
            <tr>
                <td>Weight:</td>
                <td>${pokemon.weight}</td>
            </tr>
            <tr>
                <td>Base Experience:</td>
                <td>${pokemon.base_experience}</td>
            </tr>
        </table>
        `;
}

function showDetailStatsInHTML(pokemon) {
    return `
        Height: ${pokemon.height}
        `
}