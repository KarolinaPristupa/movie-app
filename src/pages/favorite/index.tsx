import React from 'react';
import { useFavorites } from '@contexts/FavoritesContext';

import styles from './index.module.scss';
import MovieGrit from '@components/movie-grit';

const Favorite: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Your Favorite Movies</h1>
      {favorites.length > 0 ? (
        <MovieGrit movies={favorites} />
      ) : (
        <h2 className={styles.empty}>
          You haven’t added any movies to favorites yet
        </h2>
      )}
    </div>
  );
};
export default Favorite;
