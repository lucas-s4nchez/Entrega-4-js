import { getPokemons } from "./request.js";

const form = document.getElementById("form");
const inputSearch = document.getElementById("search");
const container = document.getElementById("container");

form.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  const pokemonId = inputSearch.value.trim();
  if (!pokemonId) {
    showAlert("Ingresa un número");
    return;
  }
  showSpinner();
  const pokemon = await getPokemons(pokemonId);
  if (pokemon) {
    renderCard(pokemon);
    inputSearch.value = "";
    return;
  }
  showAlert("El pokemon no existe, intenta con otro número");
  inputSearch.value = "";
}
function renderCard(pokemon) {
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
      <div class="card">
        <div class="card__image">
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
            <div class="info__stats"> <span class="info__stats-title">Stats:</span>
            ${stats
              .map(
                (item) =>
                  `<p class="info__stats-name">${item.stat.name}: 
                    <span class="info__stats-value">${item.base_stat}</span>
                  </p>`
              )
              .join("")}</div>
          </div>
        </div>

      </div>

  `;
}
const showAlert = (mensaje) => {
  container.innerHTML = `
  <div class="alerta">
  <i class="fa-solid fa-triangle-exclamation"></i>
    <p> ${mensaje}</p>
  </div>
  `;
};
const showSpinner = () => {
  container.innerHTML = `
<div class="spinner">
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
</div>
  `;
};
