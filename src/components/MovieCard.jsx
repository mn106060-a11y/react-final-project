import { useState } from "react";
import { Link } from "react-router-dom";
function MovieCard({ movie }) {
  const [failedPoster, setFailedPoster] = useState(null);

  const hasPoster =
    movie.Poster &&
    movie.Poster !== "N/A" &&
    failedPoster !== movie.Poster;

  return (
    <Link className="movie-card" to={`/movie/${movie.imdbID}`}>
      {hasPoster ? (
        <img
          className="movie-card__img"
          src={movie.Poster}
          alt={`${movie.Title} poster`}
          onError={() => setFailedPoster(movie.Poster)}
        />
      ) : (
        <div className="movie-card__poster-placeholder">
          Movie poster not available
        </div>
      )}

      <h3 className="movie-card__title">{movie.Title}</h3>
      <p className="movie-card__year">{movie.Year}</p>
    </Link>
  );
}

export default MovieCard;