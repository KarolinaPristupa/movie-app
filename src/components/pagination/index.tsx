import usePopular from '@/hooks/usePopular';
import Loader from '@components/loader';

import styles from './index.module.scss';
import MovieCard from '@components/movie-card';
import React from 'react';

const Pagination: React.FC = () => {
  const { visibleMovies, loading, error, next, prev, currentPage, totalPages } =
    usePopular();

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.moviePagination}>
      <div className={styles.moviesGrid}>
        {visibleMovies.map((movie) => (
          <div key={movie.id} className={styles.fadeWrap}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <div className={styles.paginationControls}>
        <button onClick={prev} className={styles.arrowBtn}>
          ⬅
        </button>
        <span className={styles.pageInfo}>
          {currentPage} / {totalPages}
        </span>
        <button onClick={next} className={styles.arrowBtn}>
          ➡
        </button>
      </div>
    </div>
  );
};

export default Pagination;
