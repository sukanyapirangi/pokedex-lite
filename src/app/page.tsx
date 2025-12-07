"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchPokemonList } from "@/lib/api";
import { useFavorites } from "@/hooks/useFavorites";



export default function Home() {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
  const { data: session } = useSession();


    
  useEffect(() => {
    async function loadData() {
      try {
        const limit = 20;
        const offset = page * limit;
        const data = await fetchPokemonList(limit, offset);

        const detailedPromises = data.results.map((p: any) =>
          fetch(p.url).then((res) => res.json())
       );

      const detailedData = await Promise.all(detailedPromises);

      const formatted = detailedData.map((poke: any) => ({
      name: poke.name,
      image: poke.sprites.front_default,
      types: poke.types.map((t: any) => t.type.name),
    }));

setPokemon(formatted);


// Fetch Types
        const typeRes = await fetch("https://pokeapi.co/api/v2/type");
        const typeData = await typeRes.json();
        setTypes(typeData.results.map((t: any) => t.name));

      } catch (err) {
        setError("Failed to load Pokémon");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [page]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
     <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Pokedex Lite</h1>
      <div className="flex justify-end mb-4">
  {session ? (
    <div className="flex items-center gap-2">
      <span className="text-sm">Hi, {session.user?.name}</span>
      <button
        onClick={() => signOut()}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  ) : (
    <button
      onClick={() => signIn("google")}
      className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
    >
      Login with Google
    </button>
  )}
</div>


      <div className="text-center mb-4">
  <input
    type="text"
    placeholder="Search Pokémon..."
    className="border p-2 rounded w-60"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>

      
    <div className="text-center mb-4">
     <select
    className="border p-2 rounded w-60"
    value={selectedType}
    onChange={(e) => setSelectedType(e.target.value)}
  >
    <option value="">All Types</option>
    {types.map((t) => (
      <option key={t} value={t}>
        {t}
      </option>
    ))}
  </select>
</div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pokemon
  .filter((p: any) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  .filter((p: any) => selectedType ? p.types.includes(selectedType) : true)
  .sort((a: any, b: any) => {
    return (isFavorite(b.name) ? 1 : 0) - (isFavorite(a.name) ? 1 : 0);
  })
           .map((p: any) => (

            <div
            key={p.name}
             onClick={async () => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`);
               const fullData = await res.json();
                setSelectedPokemon({
                       ...p,
                 stats: fullData.stats,
                  abilities: fullData.abilities,
                    });
                     }}
                    className="cursor-pointer bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-x1"
                   >

              <img src={p.image} alt={p.name} className="w-20 h-20 mb-2" />

              <button
  onClick={(e) => {
    e.stopPropagation();
    if (!session) {
      alert("Please login to add favorites!");
      return;
    }
    toggleFavorite(p.name);
  }}
  className="text-xl mb-2"
>
  {isFavorite(p.name) ? "⭐" : "☆"}
</button>


              <h2 className="capitalize font-semibold">{p.name}</h2>
              <div className="flex gap-1 mt-1">
  {p.types.map((t: string) => (
    <span
      key={t}
      className="px-2 py-1 rounded text-white text-xs capitalize"
      style={{
        backgroundColor:
          t === "fire" ? "#F08030" :
          t === "water" ? "#6890F0" :
          t === "grass" ? "#78C850" :
          t === "electric" ? "#F8D030" :
          t === "poison" ? "#A040A0" :
          t === "ground" ? "#E0C068" :
          t === "flying" ? "#A890F0" :
          t === "psychic" ? "#F85888" :
          t === "bug" ? "#A8B820" :
          t === "rock" ? "#B8A038" :
          t === "ghost" ? "#705898" :
          t === "dragon" ? "#7038F8" :
          "#999"
      }}
    >
      {t}
    </span>
  ))}
</div>

            </div>
          ))}
      </div>
      
      
      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>

        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      {selectedPokemon && (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
      
      <button
        onClick={() => setSelectedPokemon(null)}
        className="absolute top-2 right-2 text-xl"
      >
        ✖
      </button>

      <img
        src={selectedPokemon.image}
        alt={selectedPokemon.name}
        className="w-28 h-28 mx-auto mb-3"
      />

      <h2 className="text-2xl capitalize font-bold mb-2">
        {selectedPokemon.name}
      </h2>

      <p className="text-gray-600 mb-2">
        Types: {selectedPokemon.types.join(", ")}
      </p>

      <h3 className="font-bold mt-3">Stats</h3>
      <ul className="text-sm">
        {selectedPokemon.stats.map((s: any) => (
          <li key={s.stat.name}>
            {s.stat.name.toUpperCase()}: {s.base_stat}
          </li>
        ))}
      </ul>

      <h3 className="font-bold mt-3">Abilities</h3>
      <ul className="text-sm">
        {selectedPokemon.abilities.map((a: any) => (
          <li key={a.ability.name}>
            {a.ability.name}
          </li>
                   ))}
                      </ul>
                   </div>
                  </div>
                 )}
                 </main>
      </>
  );
}