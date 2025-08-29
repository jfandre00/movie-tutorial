import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {

    const { favorites } = useMovieContext();

    if (favorites && favorites.length > 0) {
        return (
            <div className="favorites">
                <h2>Your Favorites</h2>
            <div className="movies-grid">
                {favorites.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            </div>
        );
    }
    return (
        <div className="favorites-empty">
            <h2>No favorites Movies yet</h2>
            <p>Start adding some to see them here!</p>
        </div>
    );
}

export default Favorites;