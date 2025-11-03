import React from 'react';
import MovieCard from '@components/movie-card';
import { Movie } from '@/types/movie';

import styles from './index.module.scss';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieGridProps {
  movies: Movie[] | null[];
  skeleton?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, skeleton }) => {
  if (skeleton) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard}></div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
