// File: src/components/TMDBSearch.js
import React, { useState } from 'react';

const TMDB_API_KEY = '5b79218eae4fdbc75f75f43873e48a5a'; // Replace with your actual API key

function TMDBSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Fetch movies from TMDB based on user query
  const fetchMovies = async () => {
    if (!query) return;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    setResults(data.results || []);
  };

  return (
    <div className="tmdb-search">
      <h2>Search Movies</h2>
      <input
        type="text"
        placeholder="Enter a movie title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchMovies}>Search</button>

      <div className="results">
        {results.map((movie) => (
          <div key={movie.id} className="movie">
            <h3>{movie.title}</h3>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TMDBSearch;
