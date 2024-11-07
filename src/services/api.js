// Replace axios with fetch for making API requests

const API_KEY = '3b27d924';  // Make sure to add your API key
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error; // Propagate error so it can be handled by the calling function
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};


// import axios from 'axios';

// const API_KEY = '3b27d924';
// const BASE_URL = 'https://www.omdbapi.com/';

// export const fetchMovies = async (query) => {
//   const response = await axios.get(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
//   return response.data;
// };

// export const fetchMovieDetails = async (id) => {
//   const response = await axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
//   return response.data;
// };

