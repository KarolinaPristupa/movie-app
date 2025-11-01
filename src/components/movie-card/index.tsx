import type { Movie } from '@/types/movie';
import React from 'react';
import useFavorites from '@/hooks/useFavorites';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useGenres from '@/hooks/useGenres';
import Loader from '@components/loader';

import styles from './index.module.scss';

const IMG_URL = 'https://image.tmdb.org/t/p/w300';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { genres, loading, error } = useGenres();
  const { toggleFavorite, isFavorite } = useFavorites();

  if (loading) return <Loader />;
  if (error) return <p>Ошибка загрузки</p>;

  const genreNames = movie.genre_ids
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={() => toggleFavorite(movie)}>
        {isFavorite(movie.id) ? (
          <AiFillHeart className={styles.heartIcon} />
        ) : (
          <AiOutlineHeart className={styles.heartIcon} />
        )}
      </div>

      <div className={styles.posterWrap}>
        <img
          className={styles.poster}
          src={movie.poster_path ? IMG_URL + movie.poster_path : 'no-image.png'}
          alt={movie.title}
          loading="lazy"
        />
      </div>

      <div className={styles.hoverInfo}>
        <h4 className={styles.title}>{movie.title}</h4>
        <div className={styles.rating}>{movie.vote_average.toFixed(1)}</div>
        <p className={styles.genres}>{genreNames}</p>
        <p className={styles.desc}>{movie.overview}</p>
        <p className={styles.date}>{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
