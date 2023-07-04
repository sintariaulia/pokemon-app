import { client } from "../axios";

export const getPokemon = (config) => client({
    method: "GET",
    url: "/pokemons",
    ...config,
});

export const getPokemonName = (name) => client({
    method: "GET",
    url: `/pokemons/${name}`,
});

export const getAllMyPokemons = (config) => client({
    method: "GET",
    url: "/pokemons/collection",
    ...config,
})