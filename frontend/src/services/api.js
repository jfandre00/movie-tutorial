// it's called api.js because we will be using normal JavaScript fetch API to make HTTP requests
// it is a good practice to separate API calls into their own module for better maintainability and reusability

const API_KEY = "68bfe6f93745b80d668396355404dce0";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    // we will write a request to the TMDB API to get popular movies
    // fetch is a function that makes HTTP requests
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

    const data = await response.json();
    // inside the response, we have a results array that contains the movies

    return data.results;
};

export const searchMovies = async (query) => {
    // we will write a request to the TMDB API to search for movies by a query string

    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`); 

    const data = await response.json();

    return data.results;
};