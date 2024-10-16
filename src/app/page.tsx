"use client";

import SearchForm from "./components/SearchForm";
import PokemonList from "./components/PokemonList";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [filter, setFilter] = useState({ type: "", name: "" });

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        setPokemons(response.data.results);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = (searchFilter) => {
    setFilter(searchFilter);
  };

  return (
    <div className="p-8 ">
      <SearchForm onSearch={handleSearch} pokemons={pokemons} />
      <PokemonList filter={filter} pokemons={pokemons} />
    </div>
  );
}
