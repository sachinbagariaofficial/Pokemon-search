import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PokemonData, PokemonDetailsProps } from "@/app/types/PokemonTypes";

async function getPokemonData(name: string): Promise<PokemonData> {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
}

export default async function PokemonDetails({ params }: PokemonDetailsProps) {
  const pokemon = await getPokemonData(params.name);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={"Pokemon Details"} />

      <Breadcrumbs pokemonName={pokemon.name} />

      <div className="flex justify-center mt-4 p-6">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-teal-100 p-6">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              width={256}
              height={256}
              className="mx-auto"
              loading="lazy"
            />
          </div>

          <div className="bg-yellow-200 p-6 text-gray-700">
            <p className="mb-2">
              <strong className="font-bold">Name:</strong> {pokemon.name}
            </p>
            <p className="mb-2">
              <strong className="font-bold">Type:</strong>{" "}
              {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
            <p className="mb-2">
              <strong className="font-bold">Stats:</strong>{" "}
              {pokemon.stats.map((stat) => stat.stat.name).join(", ")}
            </p>
            <p className="mb-2">
              <strong className="font-bold">Abilities:</strong>{" "}
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </p>
            <p className="mb-4">
              <strong className="font-bold">Moves:</strong>{" "}
              {pokemon.moves
                .slice(0, 5)
                .map((moveObj: any) => moveObj.move.name)
                .join(", ")}
              {pokemon.moves.length > 5 && " ..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
