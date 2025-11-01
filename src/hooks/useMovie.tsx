import type { Movie } from '@/types/movie';
import type { MovieResponse } from '@/types/movie-response';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const useMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<MovieResponse>(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        );
        setMovies(data.results);
      } catch (error) {
        setError(`Не удалось загрузить список фильмов. Ошибка: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useMovie;
