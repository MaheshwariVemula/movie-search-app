import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/styles.css';
import './css/themes.css';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import { fetchMovies } from './services/api';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

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
        <header>
          <h1>Movie Search App</h1>
          <button onClick={toggleTheme}>
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </header>

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
