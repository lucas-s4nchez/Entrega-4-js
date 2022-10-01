import { getPokemons } from "./request.js";

const form = document.getElementById("form");
const inputSearch = document.getElementById("search");
const container = document.getElementById("container");

form.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  const pokemonId = inputSearch.value.trim();
  if (!pokemonId) return;
  if (pokemonId <= 0 || pokemonId > 905) return;
  const pokemon = await getPokemons(pokemonId);
  container.innerHTML = renderCard(pokemon);
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
  return `
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
                  `<span class="info__tipo" style="background-color:${bgColor(
                    type.type.name
                  )}">${type.type.name}</span>`
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
const bgColor = (tipo) => {
  switch (tipo) {
    case "bug":
      return "#9EAC1A";
      break;
    case "dark":
      return "#2C221B";
      break;
    case "dragon":
      return "#705FC6";
      break;
    case "electric":
      return "#E2A926";
      break;
    case "fairy":
      return "#EAABE5";
      break;
    case "fighting":
      return "#6B3020";
      break;
    case "fire":
      return "#D5471C";
      break;
    case "flying":
      return "#798BD7";
      break;
    case "ghost":
      return "#474388";
      break;
    case "grass":
      return "#409211";
      break;
    case "ground":
      return "#877754";
      break;
    case "ice":
      return "#81DBF0";
      break;
    case "normal":
      return "#908E7E";
      break;
    case "poison":
      return "#854784";
      break;
    case "psychic":
      return "#D1547E";
      break;
    case "rock":
      return "#9E8340";
      break;
    case "steel":
      return "#B0B0BC";
      break;
    case "water":
      return "#2F7ECE";
      break;

    default:
      break;
  }
};
