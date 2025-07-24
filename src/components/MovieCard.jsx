
import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext";


function getLongDate(ym) {
  // ym is in the format "YYYY-MM"
  const [year, month] = ym.split('-');
  // Zero-indexed months for JS Date, so subtract 1
  const date = new Date(year, month - 1);
  // Using toLocaleString for full month name
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function MovieCard({movie}) {
    // adding favorite contexts
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();
    const favorite = isFavorite(movie.id);


    // onClick function for button
    function onFavoriteClick(e){
        e.preventDefault()
        if(favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie);
    }

    // Movie card template
    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}></img>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{getLongDate(movie.release_date?.split("-")[0] + "-" + movie.release_date?.split("-")[1])}</p>
        </div>
    </div>
}

export default MovieCard