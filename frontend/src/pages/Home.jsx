import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import '../css/Home.css';

function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // const movies = [
    //     { id:1, title: "John Wick", release_date: "2014" },
    //     { id:2, title: "The Matrix", release_date: "1999" },
    //     { id:3, title: "Inception", release_date: "2010" },
    //     { id:4, title: "Interstellar", release_date: "2014" },
    //     { id:5, title: "John Lennon", release_date: "1980" }
    // ];

    // We want to get the movies from a public API instead of hardcoding them
    // This will allow us to have a dynamic list of movies that can be updated without changing the code
    // themoviedb.org

    // useEffect will be used to fetch popular movies when the component mounts
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies. Please try again later.");
            }
            finally {
               setLoading(false); // Set loading to false after fetching movies
            }
        };
        loadPopularMovies();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior which is to reload the page after submission
        
        if(!searchQuery.trim()) return; // If the search query is empty or only whitespace, do nothing
        if(loading) return; // If already loading, do nothing

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.log(err);
            setError("Failed to search movies. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home" >
            <form onSubmit={handleSearch} className="search-form">
                <input 
                type="text" 
                placeholder="Search for movies..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // this is how you update the state with the input's value. Each time I type, the state is updated and we will rerender the component
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {/* if there is an error, display the error message */}


            {loading? <div className="loading">Loading...</div> : 
            (<div className="movies-grid">
                {movies.map((movie) => (
                    // movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && 
                    // <MovieCard key={movie.id} movie={movie} />
                    // // This is a conditional rendering. If the movie title starts with the search query, the MovieCard component is rendered.

                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            )}
        </div>
    );
}

export default Home;