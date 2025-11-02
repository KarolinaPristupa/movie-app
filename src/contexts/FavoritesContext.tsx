import { createContext, useContext, useEffect, useState } from 'react';
import type { Movie } from '@/types/movie';

const FAVORITES_KEY = 'favoriteMovies';

interface FavoritesContextType {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      const updated = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: number) => favorites.some((m) => m.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used in <FavoritesProvider>');
  return ctx;
};
