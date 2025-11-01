import { useEffect, useState } from 'react';
import type { Genre } from '@/types/genres';
import type { GenresResponse } from '@/types/genrese-response';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<GenresResponse>(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
        );
        setGenres(data.genres);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  return { genres, loading, error };
};

export default useGenres;
