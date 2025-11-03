import type { Movie } from '@/types/movie';
import type { MovieResponse } from '@/types/movie-response';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const CACHE_KEY = 'popularMoviesCache';

const useMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const cached = localStorage.getItem(CACHE_KEY);

      if (cached) {
        setMovies(JSON.parse(cached));
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get<MovieResponse>(
          `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
        );
        setMovies(data.results);
        localStorage.setItem(CACHE_KEY, JSON.stringify(data.results));
      } catch (err) {
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useMovie;
