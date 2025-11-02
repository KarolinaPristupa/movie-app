import { useState } from 'react';
import useSearch from '@/hooks/useSearch';
import MovieCard from '@components/movie-card';

import styles from './index.module.scss';
import Loader from '@components/loader';

interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery }) => {
  const { movie: searchResults, loading, error } = useSearch(query);

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />

      {query.trim() && (
        <>
          {loading && <Loader />}
          {error && <p>{error}</p>}
          <div className={styles.resultsGrit}>
            {searchResults.length ? (
              searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <p>No movies found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
