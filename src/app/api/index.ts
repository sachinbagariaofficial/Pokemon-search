// Base Api for PokeAPI 
export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

// Api for  specific endpoints
export const POKEMON_DETAILS_ENDPOINT = (name: string) => `${POKEAPI_BASE_URL}/pokemon/${name}`;
export const POKEMON_TYPE_ENDPOINT = `${POKEAPI_BASE_URL}/type`;
export const POKEMON_LIST_ENDPOINT = (offset: number, limit: number) => `${POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`;
