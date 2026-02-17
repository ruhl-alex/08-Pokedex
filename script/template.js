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
            <img class="dialogButton bg-${pokes[index].type[0]}" src="./assets/img/left_left.png" aria-label="Vorheriges Pokémon anzeigen" onclick="showPokeDetails(${index - 1})">
            </div>
            <img class="poke-img bg-${pokes[index].type[0]}" src="${pokes[index].img}" alt="${pokes[index].name}">
            <div class="next-prev-btns bg-${pokes[index].type[0]}">
            <img class="dialogButton bg-${pokes[index].type[0]}" src="./assets/img/right_right.png" aria-label="Vorheriges Pokémon anzeigen" onclick="showPokeDetails(${index + 1})">
            </div>
        </div>
        <div class="details-info">
            <div class="details-navbar">
                <button class="details-nav active">Main</button>
                <button class="details-nav">Stats</button>
            </div>
        </div>
    `;
}

function returnTypesHTML(types, i) {
    return `
    <span class="poke-type-span bg-${types[i]}">${types[i]}</span>
    `;
}