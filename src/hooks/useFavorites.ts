import { useEffect, useState } from "react";

const STORAGE_KEY = "pokedex_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name) // remove
        : [...prev, name] // add
    );
  };

  const isFavorite = (name: string) => favorites.includes(name);

  return { favorites, toggleFavorite, isFavorite };
}
