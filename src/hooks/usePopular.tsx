import type { Movie } from '@/types/movie';
import type { MovieResponse } from '@/types/movie-response';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const getPageSize = () => {
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 900) return 2;
  if (window.innerWidth < 1200) return 3;
  return 4;
};

const usePopular = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<MovieResponse>(
          `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
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
    setCurrentIndex((prev) => (prev + pageSize) % movies.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - pageSize + movies.length) % movies.length,
    );
  };

  const visibleMovies = movies
    .slice(currentIndex, currentIndex + pageSize)
    .concat(
      currentIndex + pageSize > movies.length
        ? movies.slice(0, (currentIndex + pageSize) % movies.length)
        : [],
    );

  const currentPage = Math.floor(currentIndex / pageSize) + 1;
  const totalPages = Math.ceil(movies.length / pageSize);

  return { visibleMovies, loading, error, next, prev, currentPage, totalPages };
};

export default usePopular;
