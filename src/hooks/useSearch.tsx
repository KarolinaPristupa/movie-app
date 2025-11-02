import { useEffect, useState } from 'react';
import type { Movie } from '@/types/movie';
import axios from 'axios';
import type { MovieResponse } from '@/types/movie-response';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const useSearch = (query: string, delay = 500) => {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!query) {
      setMovie([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get<MovieResponse>(
          `${BASE_URL}/search/movie`,
          {
            params: {
              api_key: API_KEY,
              language: 'en-US',
              query,
              page: 1,
              include_adult: false,
            },
          },
        );
        setMovie(data.results);
      } catch (error) {
        setError('Не удалось загрузить результаты поиска');
      } finally {
        setLoading(false);
      }
    }, delay);
    return () => clearTimeout(handler);
  }, [query, delay]);

  return { movie, loading, error };
};

export default useSearch;
