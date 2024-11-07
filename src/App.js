import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Check if the theme preference is already saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const handleThemeChange = (event) => {
    const theme = event.target.value;
    setIsDarkMode(theme === 'dark');
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark'); // Save preference
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light'); // Save preference
    }
  };

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
          {/* Dropdown for theme selection */}
          <div className="theme-dropdown">
            <label htmlFor="theme-select">Select Theme: </label>
            <select id="theme-select" onChange={handleThemeChange} value={isDarkMode ? 'dark' : 'light'}>
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>
        </header>

        <Routes>
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
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
