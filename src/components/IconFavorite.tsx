import { useDispatch } from "react-redux";
import { type Pokemon } from "../config/interface/pokemon.interface";
import {
  addPokemon,
  listPokedex,
  removePokemon,
} from "../store/modules/pokedex/pokedex.slice";
import { useAppSelector } from "../store/hooks";
import favorite from "../assets/images/favorite.svg";
import favoriteSelected from "../assets/images/favoriteSelected.svg";

interface IconFavoriteProps {
  pokemon: Pokemon;
}

export function IconFavorite(props: IconFavoriteProps) {
  const pokedex = useAppSelector((state) => listPokedex(state.pokedex));

  const dispatch = useDispatch();
  const handleFavorite = (pokemonSelected: Pokemon) => {
    const isFavorite = pokedex.some((a) => a.id === pokemonSelected.id);

    if (isFavorite) {
      dispatch(removePokemon(pokemonSelected.id));
    } else {
      dispatch(addPokemon(pokemonSelected));
    }
  };
  return (
    <img
      onClick={() => handleFavorite(props.pokemon)}
      src={
        pokedex.some((a) => a.id == props.pokemon.id)
          ? favoriteSelected
          : favorite
      }
      alt="favorite icon"
      style={{
        marginLeft: "1rem",
        marginBottom: "0.3rem",
        cursor: "pointer",
      }}
    />
  );
}
