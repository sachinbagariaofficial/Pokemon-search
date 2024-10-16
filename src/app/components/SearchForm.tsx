"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const SearchForm = ({ onSearch, pokemons }) => {
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [warning, setWarning] = useState(""); // State for warning message

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        setTypes(response.data.results);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim() && !selectedType) {
      setWarning("Please enter a Pokémon name or select a type."); // Set warning message
    } else {
      setWarning(""); // Clear warning message
      onSearch({ type: selectedType, name: searchTerm });
    }
  };

  const handleReset = () => {
    setSelectedType("");
    setSearchTerm("");
    setWarning(""); // Clear warning message on reset
    onSearch({ type: "", name: "" }); // Reset filter in parent
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim()) {
      setWarning(""); // Clear warning message when typing
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex gap-4 mb-4">
        {/* Dropdown for selecting type */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-40"
        >
          <option value="">Select</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        {/* Search input field */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange} // Use the new input change handler
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md flex-grow"
        />

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-[#004368] text-white px-4 py-2 rounded-md hover:bg-blue-900"
        >
          Search Pokemon
        </button>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {/* Warning message for empty search */}
      {warning && <p className="text-red-500 mt-2">{warning}</p>}
    </div>
  );
};

export default SearchForm;
