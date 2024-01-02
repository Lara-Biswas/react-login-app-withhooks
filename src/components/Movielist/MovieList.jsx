import { useState, useEffect } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://hoblist.com/api/movieList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: "movies",
            language: "kannada",
            genre: "all",
            sort: "voting",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        const moviesList = data.result || [];
        setMovies(moviesList);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies List</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <div
            key={movie._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              width: "300px",
            }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h2>{movie.title}</h2>
            <p>Genre: {movie.genre}</p>
            <p>Language: {movie.language}</p>
            <p>Voting Count: {movie.totalVoted}</p>
            <button onClick={() => handleWatchTrailer(movie)}>
              Watch Trailer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const handleWatchTrailer = (movie) => {
  // Handle watch trailer action
  console.log(`Watch trailer for ${movie.title}`);
};

export default MovieList;
