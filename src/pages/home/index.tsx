import MovieGrit from '@components/movie-grit';
import Pagination from '@components/pagination';

import styles from './index.module.scss';
import Search from '@components/search';
import MovieGrid from '@components/movie-grit';
import { useState } from 'react';

const Home = () => {
  const [query, setQuery] = useState('');

  return (
    <div>
      <h1 className={styles.heroTitle}>Dive into the World of Cinema</h1>
      <h2 className={styles.subTitle}>The Greatest Movies of All Time</h2>
      <Pagination />
      <Search query={query} setQuery={setQuery} />

      {query.trim() ? null : (
        <>
          <h2 className={styles.subTitle}>Latest Releases</h2>
          <MovieGrit />
        </>
      )}
    </div>
  );
};
export default Home;
