import usePopular from '@/hooks/usePopular';
import Loader from '@components/loader';

import styles from './index.module.scss';
import MovieCard from '@components/movie-card';

const Pagination: React.FC = () => {
  const { visibleMovies, loading, error, next, prev, currentPage, totalPages } =
    usePopular(4);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.moviePagination}>
      <div className={styles.moviesGrid}>
        {visibleMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
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
