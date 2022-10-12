export const getPokemon = async (id) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPokemons = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    //hacer un fetch por cada pokemon en el array
    const pokemons = data.results.map((pokemon) =>
      fetch(pokemon.url).then((res) => res.json())
    );
    //obtener las respuestas de fetch
    const results = await Promise.all(pokemons);
    return {
      pokemons: results,
      next: data.next,
      previous: data.previous,
    };
  } catch (error) {
    console.log(error);
  }
};
