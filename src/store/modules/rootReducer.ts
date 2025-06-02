import { combineReducers } from "@reduxjs/toolkit";
import { pokemonReducer } from "./pokemons/pokemons.Slice";
import { pokedexReducer } from "./pokedex/pokedex.slice";
import { navigationReducer } from "./navigation/navigation.slice";

export const rootReducer = combineReducers({
  pokemons: pokemonReducer,
  pokedex: pokedexReducer,
  navigation: navigationReducer,
});