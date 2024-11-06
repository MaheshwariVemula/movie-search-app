import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/styles.css'; // Import your CSS file
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import { fetchMovies } from './services/api';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the search functionality
  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovies(query);
      setMovies(data.Search || []);
    } catch (e) {
      setError('Failed to fetch movies. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Router>
      <div className="App">
        <h1>Movie Search App</h1>
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={handleSearch} />
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <MovieList movies={movies} />
              </>
            }
          />

          {/* Movie Detail Route */}
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
