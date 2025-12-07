const API_BASE = "https://pokeapi.co/api/v2";
export async function fetchPokemonList(limit: number, offset: number) {
    const res=await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error("Failed to fetch pokemon list");
    return res.json();
}
