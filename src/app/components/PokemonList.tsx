"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Filter, Pokemon } from "../types/PokemonTypes";

interface PokemonListProps {
  filter: Filter;
  pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ filter, pokemons }) => {
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const matchesType = (pokemon: Pokemon) => {
    return (
      !filter.type ||
      pokemon.types?.some((type: any) => type.name === filter.type)
    );
  };

  const matchesName = (pokemon: Pokemon) => {
    return pokemon.name.toLowerCase().includes(filter.name.toLowerCase());
  };

  const fetchPokemons = () => {
    setIsLoading(true);
    const filtered = pokemons.filter(
      (pokemon) => matchesType(pokemon) && matchesName(pokemon)
    );
    setFilteredPokemons(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, [filter, pokemons]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mt-12">
      {isLoading ? (
        <div className="col-span-full text-center p-4">
          <p className="text-blue-500">Loading...</p>
        </div>
      ) : filteredPokemons.length > 0 ? (
        filteredPokemons.map((pokemon) => {
          const pokemonId = pokemon.url.split("/").slice(-2)[0];
          return (
            <div
              key={pokemon.name}
              className="bg-white shadow-md rounded-2xl overflow-hidden transform transition-all duration-200 hover:scale-105"
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="bg-[#fafafa] flex flex-col gap-6 text-start capitalize p-8">
                  <h3 className="text-xl font-semibold">{pokemon.name}</h3>
                  <Link
                    href={`/pokemon/${pokemon.name}`}
                    className="text-[#408ab6] block hover:text-blue-600"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center p-4">
          <p className="text-red-500">No results found. Please try again!</p>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
