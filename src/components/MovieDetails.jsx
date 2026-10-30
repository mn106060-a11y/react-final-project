import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function MovieDetails() {
  const { id } = useParams();
const [movie, setMovie] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState("");
const [failedPoster, setFailedPoster] = useState(null);
useEffect(() => {
  const controller = new AbortController();

  async function loadMovie() {
    setIsLoading(true);
    setError("");
    setMovie(null);

    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(id)}&plot=full`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Unable to load movie details.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found.");
      }

      if (!controller.signal.aborted) {
        setMovie(data);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setError(error.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }

  loadMovie();

  return () => controller.abort();
}, [id]);
  return (
    <main className="main">
      <div className="movie-details__container">
        <div className="movie-details__back">
  <Link to="/" className="movie-details__back-link">
    ← Back to results
  </Link>
</div>
        {isLoading ? (
  <div role="status" aria-label="Loading movie details">
  <div className="movie-details__content" aria-hidden="true">
    <div className="movie-details__poster--wrapper">
      <div className="movie-details__poster--skeleton" />
      <div className="movie-details__title--skeleton" />
      <div className="movie-details__info-line--skeleton" />
    </div>

    <div className="movie-details__text--wrapper">
      {Array.from({ length: 6 }, (_, index) => (
        <div className="movie-details__detail--skeleton" key={index}>
          <div className="movie-details__detail-title--skeleton" />
          <div className="movie-details__detail-text--skeleton" />
          <div className="movie-details__detail-text--skeleton" />
        </div>
      ))}
    </div>
  </div>
</div>
) : error ? (
  <p role="alert">{error}</p>
) : movie ? (
  <div className="movie-details__content">
  <div className="movie-details__poster--wrapper">
    {movie.Poster &&
    movie.Poster !== "N/A" &&
    failedPoster !== movie.Poster ? (
      <img
        className="movie-details__poster"
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        onError={() => setFailedPoster(movie.Poster)}
      />
    ) : (
      <div className="movie-details__poster-placeholder">
        Movie poster not available
      </div>
    )}

    <div className="movie-details__info">
      <h2 className="movie-details__title">{movie.Title}</h2>
      <p className="movie-details__year">{movie.Year}</p>
    </div>
  </div>

  <div className="movie-details__text--wrapper">
    {[
      ["Plot", movie.Plot],
      ["Genre", movie.Genre],
      ["Runtime", movie.Runtime],
      ["Director", movie.Director],
      ["Actors", movie.Actors],
      ["IMDb rating", movie.imdbRating],
    ].map(([label, value]) => (
      <div className="movie-details__detail" key={label}>
        <h3>{label}</h3>
        <p>{value && value !== "N/A" ? value : "Not available"}</p>
      </div>
    ))}
  </div>
</div>
) : null}
      </div>
    </main>
  );
}

export default MovieDetails;