function renderPokes() {
    const pokeContainer = document.getElementById("poke-container");
    pokeContainer.innerHTML = "";
    showLoadingSpinner();
    for (let index = 0; index < pokes.length; index++) {
        pokeContainer.innerHTML +=  `
            <div class="poke-card">
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
        `
}
    hideLoadingSpinner();
}

