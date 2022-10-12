const container = document.getElementById("container");

import { getPokemon } from "./request.js";

window.addEventListener("load", async () => {
  const url = new URLSearchParams(window.location.search);
  const pokemon = parseInt(url.get("id"));
  const currentPokemon = await getPokemon(pokemon);
  renderPokemon(currentPokemon);
  console.log(currentPokemon);
});

function renderPokemon(pokemon) {
  const {
    name,
    abilities,
    id,
    stats,
    height,
    types,
    weight,
    sprites: {
      other: {
        "official-artwork": { front_default },
      },
    },
  } = pokemon;
  container.innerHTML = `
  <div class="bg-${types[0].type.name} pt-5">
      <div class="card card--big">
        <a href="./index.html"class="btn btn--fixed link "><i class="fa-solid fa-arrow-left"></i> Volver</a>
        <div class="card__image card-image--big">
          <img
            src="${front_default}"
            alt="${name}">
        </div>
        <div class="info">
          <h3 class="info__title">#${id} ${name}</h3>
          <div class="info__items">
            <span class="info__tipos">${types
              .map(
                (type) =>
                  `<span class="tipo tipo--${type.type.name}">
                    ${type.type.name}
                  </span>`
              )
              .join(" ")}</span>
            <div class="info__attributes">
              <p class="font-bold">Weight: 
                <span class="font-normal">${weight / 10}kg</span>
              </p>
              <p class="font-bold">Height: 
                <span class="font-normal">${height / 10}m</span>
              </p>
            </div>
            <div class="info__abilities"> Abilities:
            ${abilities
              .map(
                (ability) =>
                  `<span class="info__ability"> ${ability.ability.name}</span>`
              )
              .join("")}
            </div>
            <table class="table"> 
              <thead class="thead">
              ${stats
                .map(
                  (item) =>
                    `<th class="thead__th">${item.stat.name} 
                    </th>`
                )
                .join("")}
              </thead>
              <tbody class="tbody">
                <tr>
                ${stats
                  .map(
                    (item) =>
                      `<td class="tbody__td">
                        <span>${item.base_stat}</span>
                      </td>`
                  )
                  .join("")}
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>
  `;
}
