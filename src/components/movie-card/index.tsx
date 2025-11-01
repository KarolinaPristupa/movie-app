import type { Movie } from '@/types/movie';

import styles from './index.module.scss';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className={styles.card}>
      <div className={styles.rating}>{movie.vote_average.toFixed(1)}</div>

      <div className={styles.posterWrap}>
        <img
          className={styles.poster}
          src={movie.poster_path ? IMG_URL + movie.poster_path : 'no-image.png'}
          alt={movie.title}
        />
      </div>

      <div className={styles.hoverInfo}>
        <h4 className={styles.title}>{movie.title}</h4>
        <p className={styles.genres}>{movie.genre_ids.join(', ')}</p>
        <p className={styles.desc}>{movie.overview}</p>
        <p className={styles.date}>{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
