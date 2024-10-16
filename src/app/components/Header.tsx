import Link from "next/link";
import { HeaderType } from "../types/PokemonTypes";

export default function Header({ title }: HeaderType) {
  return (
    <header className="py-6 text-center bg-white shadow">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
    </header>
  );
}
