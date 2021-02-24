import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
   return (
      <div className="movie-list">
         {movies.map((movie) => (
            <Link
               key={movie.id}
               to={`/movies/${movie.id}`}
               style={{ textDecoration: "none", color: "inherit" }}
            >
               <MovieCard movie={movie} />
            </Link>
         ))}
      </div>
   );
}

export default MovieList;
