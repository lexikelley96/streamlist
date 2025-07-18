// File: src/components/TMDBSearch.js
import React, { useState } from 'react';

const TMDB_API_KEY = '5b79218eae4fdbc75f75f43873e48a5a'; 

function TMDBSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const fetchMovies = async () => {
    if (!query) return;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    setResults(data.results || []);
  };

  return (
    <main className="tmdb-search-page">
      <h2>Search Movies</h2>
      <div className="tmdb-search-bar">
        <input
          type="text"
          placeholder="Enter a movie title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchMovies} className="search-btn">Search</button>
      </div>

      <div className="tmdb-results">
        {results.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No results found.</p>
        ) : (
          results.map((movie) => (
            <div key={movie.id} className="tmdb-movie-card">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="tmdb-movie-img"
                />
              )}
              <div className="tmdb-movie-details">
                <h4>{movie.title}</h4>
                <p>{movie.overview || 'No description available.'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default TMDBSearch;
