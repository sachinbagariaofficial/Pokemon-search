"use client";

import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { POKEMON_TYPE_ENDPOINT } from "../api";
import { PokemonType, SearchFormProps } from "../types/PokemonTypes";

const SearchForm = ({ onSearch, pokemons }: SearchFormProps) => {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  // Fetch Pokémon types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(POKEMON_TYPE_ENDPOINT);
        setTypes(response.data.results);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  // This function is for handling the search
  const handleSearch = () => {
    if (!searchTerm.trim() && !selectedType) {
      setWarning("Please enter a Pokémon name or select a type.");
    } else {
      setWarning("");
      onSearch({ type: "", name: searchTerm });
    }
  };

  // Reset the search result
  const handleReset = () => {
    setSelectedType("");
    setSearchTerm("");
    setWarning("");
    onSearch({ type: "", name: "" });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim()) {
      setWarning("");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 w-full md:sticky md:top-5 z-10 px-6">
      {" "}
      {/* Add sticky class */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 w-full max-w-4xl mb-4">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-40"
        >
          <option value="">Select Type</option>
          {types.map((type: any) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search Pokémon..."
          className="p-2 border border-gray-300 rounded-md flex-grow w-full"
        />

        <button
          onClick={handleSearch}
          className="bg-[#004368] text-white px-4 py-2 rounded-md hover:bg-blue-900 w-full md:w-auto min-w-fit"
        >
          Search Pokemon
        </button>

        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-full md:w-auto min-w-fit"
        >
          Reset
        </button>
      </div>
      {warning && <p className="text-red-500 mt-2">{warning}</p>}
    </div>
  );
};

export default SearchForm;
