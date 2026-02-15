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
        <h2>${pokes[index].name}</h2>
        <img class="poke-img bg-${pokes[index].type[0]}" src="${pokes[index].img}" alt="${pokes[index].name}">
        <button onclick="closeDialog()">Close</button>
    `;
}

function returnTypesHTML(types, i) {
    return `
    <span class="poke-type-span bg-${types[i]}">${types[i]}</span>
    `;
}