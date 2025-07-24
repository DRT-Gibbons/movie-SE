import MovieCard from "../components/MovieCard"
import {useState, useEffect} from "react";
import {searchMovies, getPopularMovies} from "../services/api";
import "../css/Home.css";

function Home() {
    // const variable to maintain the state
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            }
            finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        // e.preventDefault() prevents field from being cleared
        e.preventDefault();
        // Making sure search doesn't work on empty strings or while already loading.
        if(!searchQuery.trim()) return;
        if(loading) return;

        setLoading(true);
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch(err){
            console.log(err);
            setError("Failed to search movies...");
        } finally{
            setLoading(false);
        }
    };

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            {/* searchQuery + setSearchQuery function allows for on the fly state updating */}
            <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="submit" className="search-button">Submit</button>
        </form>

        {error && <div className="error-message">{error}</div>}


        {/* If we're loading, display loading, else display movie grid */}
        {loading ? (<div className="loading">Loading...</div>
        ) : (
        <div className="movies-grid">
            {movies.map((movie) => (
                // Conditional using state (only gets rendered if the movie title starts with whatever is typed and the id exists)
                
                <MovieCard movie={movie} key = {movie.id}/>
            ))}
        </div>
        )}
    </div>

}

export default Home