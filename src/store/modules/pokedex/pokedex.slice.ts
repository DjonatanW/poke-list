import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { type Pokemon } from "../../../config/interface/pokemon.interface"
export const pokedexAdapter = createEntityAdapter({
  selectId: (pokemon: Pokemon) => pokemon.id,
});

export const pokedexSlice = createSlice({
  name: "pokedex",
  initialState: pokedexAdapter.getInitialState(),
  reducers: {
    addPokemon: pokedexAdapter.addOne,
    removePokemon: pokedexAdapter.removeOne,
  },
});

export const { addPokemon, removePokemon } = pokedexSlice.actions;

export const pokedexReducer = pokedexSlice.reducer;

export const { selectAll: listPokedex, selectById: getPokemonPokedexById } =
  pokedexAdapter.getSelectors();