import { getPokemon, getPokemons } from "./request.js";

const form = document.getElementById("form");
const inputSearch = document.getElementById("search");
const container = document.getElementById("container");
const btnContainer = document.getElementById("btn-container");

const url = `https://pokeapi.co/api/v2/pokemon`;

document.addEventListener("DOMContentLoaded", loadPokemons(url));
btnContainer.addEventListener("click", async (e) => {
  const newUrl = e.target.getAttribute("data-url");
  if (e.target.getAttribute("data-url")) {
    loadPokemons(newUrl);
  }
});
form.addEventListener("submit", onSubmit);

//New section
async function loadPokemons(url) {
  const data = await getPokemons(url);
  renderAllPokemons(data.pokemons);
  renderBtn(data);
}

function renderAllPokemons(pokemons) {
  const cards = pokemons.map((pokemon) => renderCard(pokemon)).join("");
  container.innerHTML = cards;
}
function renderBtn(data) {
  const { next, previous } = data;
  btnContainer.innerHTML = `
  ${
    previous
      ? `<button class='btn' data-url='${previous}'>Anterior</button>`
      : ""
  }
  ${next ? `<button class='btn' data-url='${next}'>Siguiente</button>` : ""}
  `;
}
async function onSubmit(e) {
  e.preventDefault();
  const pokemonId = inputSearch.value.trim();
  if (!pokemonId) {
    showAlert("Ingresa un número");
    return;
  }
  loadSpinner();
  const pokemon = await getPokemon(pokemonId);
  if (!pokemon) {
    showAlert("El pokemon no existe, intenta con otro número");
    inputSearch.value = "";
    return;
  }
  renderCard(pokemon);
  inputSearch.value = "";
}
function renderCard(pokemon) {
  const {
    name,
    id,
    types,
    sprites: {
      other: {
        "official-artwork": { front_default },
      },
    },
  } = pokemon;
  return `
      <div class="card bg-${types[0].type.name}">
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
const loadSpinner = () => {
  container.innerHTML = `
<div class="spinner">
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
</div>
  `;
};
