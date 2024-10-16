import axios from "axios";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component

async function getPokemonData(name) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
}

export default async function PokemonDetails({ params }) {
  const pokemon = await getPokemonData(params.name);

  console.log("params", pokemon);
  return (
    <div className="p-8">
      <div className="mt-2 text-gray-500">
        <Link href="/" className="text-green-500">
          Home &gt; {pokemon.name}
        </Link>
      </div>

      <div className="mt-4 flex flex-col items-center">
        {/* Use Next.js Image component for better performance */}
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} // Use Pokemon ID for image source
          alt={pokemon.name}
          width={256} // Updated width to maintain aspect ratio
          height={256} // Updated height to maintain aspect ratio
          className="w-64 h-64 object-contain" // Added object-contain for uniformity
        />
        <h1 className="text-2xl font-bold">{pokemon.name}</h1>

        <div className="mt-4">
          <p>
            <strong>Type:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>
          <p>
            <strong>Stats:</strong>
          </p>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
