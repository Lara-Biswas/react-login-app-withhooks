import React, { useState, useEffect } from "react";
import "./MoviesList.css";

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
      {movies.map((movie, index) => (
        <div
          key={movie._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            width: "500px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                marginRight: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button onClick={() => console.log(`Vote for ${movie.title}`)}>
                ▲
              </button>
              <p>{movie.totalVoted}</p>
              <button
                onClick={() => console.log(`Vote against ${movie.title}`)}
              >
                ▼
              </button>
              <div>Votes</div>
            </div>
            <div style={{ width: "110px" }}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div style={{ marginLeft: "10px", flex: "1", lineHeight: 0.3 }}>
              <h3>{movie.title}</h3>
              <p>
                <span style={{ color: "grey" }}>Genre:</span> {movie.genre}
              </p>
              <p>
                <span style={{ color: "grey" }}>Director:</span>{" "}
                {movie.director && movie.director.join(", ")}
              </p>
              <p className="ellipsis-paragraph">
                <span style={{ color: "grey" }}>Starring:</span>{" "}
                {movie.stars && movie.stars.join(", ")}
              </p>
              <p>
                {movie.language} {"|"}{" "}
                {new Date(movie.releasedDate * 1000).toLocaleDateString(
                  "en-US",
                  { day: "numeric", month: "short" }
                )}
                {movie.runTime && ` | ${movie.runTime} mins`}
              </p>
              <p>
                {movie.pageViews} views | Voted by {movie.totalVoted} People
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => console.log(`Watch trailer for ${movie.title}`)}
            >
              Watch Trailer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
