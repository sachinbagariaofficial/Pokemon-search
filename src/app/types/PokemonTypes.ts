export type BreadcrumbsType = {
    pokemonName: string
}

export type HeaderType = {
    title: string
}

export type PokemonDetailsProps = {
    params: {
        name: string;
    };
};

export type PokemonType = {
    type: {
        name: string;

    };
};

export type PokemonStat = {
    stat: {
        name: string;
    };
};

export type PokemonAbility = {
    ability: {
        name: string;
    };
};

export type PokemonData = {
    id: number;
    name: string;
    types: PokemonType[];
    stats: PokemonStat[];
    abilities: PokemonAbility[];
    moves: string[]
};

export type SearchFormProps = {
    onSearch: (filters: { type: string; name: string }) => void;
    pokemons: any[];
};




export interface Pokemon {
    name: string;
    url: string;
    types?: PokemonType[];
}


export interface Filter {
    type: string;
    name: string;
}
