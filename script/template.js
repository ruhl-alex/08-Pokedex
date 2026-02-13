function renderPokes() {
    const pokeContainer = document.getElementById("poke-container");
    pokeContainer.innerHTML = "";

    for (let index = 0; index < pokes.length; index++) {
        pokeContainer.innerHTML +=  `
            <div class="poke-card">
                <div id="id-poke-card-name" class="poke-card-name">
                    ${pokes[index].name}
                </div>
                <div id="id-poke-card-img" class="poke-card-img">
                    <img class="poke-img bg-${pokes[index].type[0]}" src="${pokes[index].img}" alt="${pokes[index].name}">
                </div>
                <div id="id-poke-card-art" class="poke-card-art">
                    ${renderTypes(pokes[index].type)}
                </div>
            </div>
        `
}}

