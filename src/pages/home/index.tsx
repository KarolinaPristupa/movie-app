import { useState, useEffect } from 'react';
import MovieGrid from '@components/movie-grit';
import Loader from '@components/loader';
import useMovie from '@/hooks/useMovie';
import useSearch from '@/hooks/useSearch';
import Pagination from '@components/pagination';
import Search from '@components/search';

import styles from './index.module.scss';

const Home = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // debounce search input (500ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(t);
  }, [query]);

  const { movies: popularMovies, loading: loadingPopular } = useMovie();
  const { movie: searchResults, loading: loadingSearch } =
    useSearch(debouncedQuery);

  const moviesToShow = debouncedQuery.trim() ? searchResults : popularMovies;
  const loading = debouncedQuery.trim() ? loadingSearch : loadingPopular;

  return (
    <div>
      <h1 className={styles.heroTitle}>Dive into the World of Cinema</h1>
      <h2 className={styles.subTitle}>The Greatest Movies of All Time</h2>

      <Pagination />

      <Search query={query} setQuery={setQuery} />

      {loading ? (
        <MovieGrid movies={Array(8).fill(null)} skeleton />
      ) : moviesToShow.length > 0 ? (
        <>
          <h2 className={styles.subTitle}>Latest Releases</h2>
          <MovieGrid movies={moviesToShow} />
        </>
      ) : debouncedQuery.trim() ? (
        <p className={styles.subTitle}>No movies found for this search.</p>
      ) : (
        <p className={styles.subTitle}>No movies available.</p>
      )}
    </div>
  );
};

export default Home;
