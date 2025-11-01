import React from 'react';
import useMovie from '@/hooks/useMovie';
import styles from './index.module.scss';
import MovieCard from '@components/movie-card';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieGrid: React.FC = () => {
  const { movies, loading, error } = useMovie();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Ошибка загрузки</p>;

  return (
    <div className={styles.grid}>
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
