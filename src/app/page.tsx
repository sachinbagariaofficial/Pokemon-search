"use client";

import SearchForm from "./components/SearchForm";
import PokemonList from "./components/PokemonList";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import { POKEMON_LIST_ENDPOINT } from "./api";
import { Filter } from "./types/PokemonTypes";

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [filter, setFilter] = useState({ type: "", name: "" });

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(POKEMON_LIST_ENDPOINT(0, 20));
        setPokemons(response.data.results);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchPokemons();
  }, []);

  // This function is for handling the search input result //
  const handleSearch = (searchFilter: Filter) => {
    setFilter(searchFilter);
  };

  return (
    <div>
      <Header title={"Pokemon"} />
      <SearchForm onSearch={handleSearch} pokemons={pokemons} />
      <PokemonList filter={filter} pokemons={pokemons} />
    </div>
  );
}
