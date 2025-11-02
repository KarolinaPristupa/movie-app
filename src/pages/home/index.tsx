import { useState } from 'react';
import MovieGrid from '@components/movie-grit';
import Loader from '@components/loader';
import useMovie from '@/hooks/useMovie';
import useSearch from '@/hooks/useSearch';
import Pagination from '@components/pagination';
import Search from '@components/search';

import styles from './index.module.scss';

const Home = () => {
  const [query, setQuery] = useState('');
  const { movies: popularMovies, loading: loadingPopular } = useMovie();
  const { movie: searchResults, loading: loadingSearch } = useSearch(query);

  const moviesToShow = query.trim() ? searchResults : popularMovies;
  const loading = query.trim() ? loadingSearch : loadingPopular;

  return (
    <div>
      <h1 className={styles.heroTitle}>Dive into the World of Cinema</h1>
      <h2 className={styles.subTitle}>The Greatest Movies of All Time</h2>

      <Pagination />

      <Search query={query} setQuery={setQuery} />

      {loading && <Loader />}
      {!loading && moviesToShow.length > 0 ? (
        <>
          <h2 className={styles.subTitle}>Latest Releases</h2>
          <MovieGrid movies={moviesToShow} />
        </>
      ) : (
        <p className={styles.subTitle}>
          {query.trim()
            ? 'No movies found for this search.'
            : 'No movies available.'}
        </p>
      )}
    </div>
  );
};

export default Home;
