import Link from "next/link";
import { BreadcrumbsType } from "../types/PokemonTypes";

const Breadcrumbs = ({ pokemonName }: BreadcrumbsType) => {
  return (
    <nav className="p-4">
      <ul className="flex space-x-2 text-gray-600">
        <li>
          <Link href="/" className="hover:underline text-green-500 ">
            Home
          </Link>
        </li>
        <li>→</li>
        <li className="text-gray-800 font-semibold capitalize">
          {pokemonName}
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
