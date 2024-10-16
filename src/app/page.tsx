"use client";

import SearchForm from "./components/SearchForm";
import PokemonList from "./components/PokemonList";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./components/Header";
import { POKEMON_LIST_ENDPOINT } from "./api";
import { Filter, Pokemon } from "./types/PokemonTypes";

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filter, setFilter] = useState<Filter>({ type: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const limit = 20;

  const fetchPokemons = async (offset: number) => {
    setLoading(true);
    try {
      const response = await axios.get(POKEMON_LIST_ENDPOINT(offset, limit));
      setPokemons((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial Pokémon
  useEffect(() => {
    if (!isSearching) {
      fetchPokemons(offset);
    }
  }, [offset, isSearching]);

  // This function is for handling the search input result
  const handleSearch = (searchFilter: Filter) => {
    setFilter(searchFilter);
    setOffset(0);
    setPokemons([]);
    setIsSearching(true);
    fetchPokemons(0);
  };

  // This is for Scroll event
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading &&
      !isSearching
    ) {
      setOffset((prev) => prev + limit);
    }
  }, [loading, isSearching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Filter pokemons based on the search input
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filter.name.toLowerCase())
  );

  // Handle search input cleared
  useEffect(() => {
    if (filter.name === "") {
      setIsSearching(false);
    }
  }, [filter.name]);

  return (
    <div>
      <Header title={"Pokemon"} />
      <SearchForm onSearch={handleSearch} pokemons={pokemons} />
      <PokemonList filter={filter} pokemons={filteredPokemons} />
      {loading && <p className="mt-4 text-center">Loading more Pokémon...</p>}
    </div>
  );
}
