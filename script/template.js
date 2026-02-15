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
        <img src="./assets/img/close.png" id="closeButton" class="dialogButton" aria-label="Dialog schließen" onclick="closeDialog()">
        </div>
        </div>
        <div class="details-img">
        <img class="poke-img bg-${pokes[index].type[0]}" src="${pokes[index].img}" alt="${pokes[index].name}">
        </div>
        <div class="details-info">
        </div>
    `;
}

function returnTypesHTML(types, i) {
    return `
    <span class="poke-type-span bg-${types[i]}">${types[i]}</span>
    `;
}