import type { Movie } from '@/types/movie';
import type { MovieResponse } from '@/types/movie-response';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const usePopular = (pageSize = 4) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
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

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const visibleMovies = movies
    .map((_, i) => movies[(currentIndex + i) % movies.length])
    .slice(0, pageSize);

  const currentPage = Math.floor(currentIndex / pageSize) + 1;
  const totalPages = Math.ceil(movies.length / pageSize);

  return { visibleMovies, loading, error, next, prev, currentPage, totalPages };
};

export default usePopular;
