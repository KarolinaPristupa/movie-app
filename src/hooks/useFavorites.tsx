import { useEffect, useState } from 'react';
import type { Movie } from '@/types/movie';

const FAVORITES_KEY = 'favoriteMovies';

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const addFavorite = (movie: Movie) => {
    if (!favorites.find((favorite) => favorite.id === movie.id)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    }
  };

  const removeFavorite = (movieId: number) => {
    const updated = favorites.filter((favorite) => favorite.id !== movieId);
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const toggleFavorite = (movie: Movie) => {
    if (favorites.find((favorite) => favorite.id === movie.id)) {
      return removeFavorite(movie.id);
    } else addFavorite(movie);
  };

  const isFavorite = (movieId: number) =>
    favorites.some((m) => m.id === movieId);

  return { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite };
};

export default useFavorites;
