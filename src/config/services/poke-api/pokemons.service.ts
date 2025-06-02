import axios, { isAxiosError } from "axios";
import { pokemonApi } from "./client-http";
import type { ResponseAPI } from "./response-api.interface";
import type { Pokemon } from "../../interface/pokemon.interface";

type APIAbility = {
  ability: {
    name: string;
    url: string;
  };
};

type APIStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export async function getAllPokemonsServices(
  page: number,
  limit: number
): Promise<ResponseAPI<Array<Pokemon>>> {
  try {
    const pokemons: Pokemon[] = [];

    const response = await pokemonApi.get(`/pokemon/`, {
      params: {
        offset: page,
        limit: limit,
      },
    });

    for (const pokemon of response.data.results) {
      const resultDetail = await axios.get(pokemon.url);

      const habilities = resultDetail.data.abilities.map((hability: APIAbility) => {
        return { habilitiName: hability.ability.name };
      });

      const stats = resultDetail.data.stats.map((stat: APIStat) => {
        return {
          strength: stat.base_stat,
          statName: stat.stat.name,
          effort: stat.effort,
          urlStat: stat.stat.url,
          typeStats: "",
        };
      });

      pokemons.push({
        id: resultDetail.data.id,
        name: resultDetail.data.name,
        size: Number(resultDetail.data.weight),
        height: Number(resultDetail.data.height),
        image: resultDetail.data.sprites.other.dream_world.front_default,
        habilitis: habilities,
        stats: stats,
        isFavorite: false,
      });
    }

    const totalPages = Math.ceil(response.data.count / (limit || 20));

    return {
      ok: true,
      message: "Listado com sucesso",
      pagination: {
        limit: limit || 20,
        count: response.data.count,
        totalPages: totalPages,
      },
      pokemon: pokemons,
    };
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        ok: false,
        message: "API indisponível!",
      };
    }

    return {
      ok: false,
      message: "Aconteceu um erro inesperado!",
    };
  }
}
