import React from 'react';
import useMovie from '@/hooks/useMovie';
import MovieCard from '@components/movie-card';
import Loader from '@components/loader';
import { Movie } from '@/types/movie';

import styles from './index.module.scss';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

interface MoviesProps {
  movies: Movie[];
}

const MovieGrid: React.FC<MoviesProps> = ({ movies }) => {
  if (!movies.length) return <p>No movies found</p>;

  return (
    <div className={styles.grid}>
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
