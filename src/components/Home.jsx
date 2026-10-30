import MovieCard from "./MovieCard";

function Home({
  movies = [],
  sortBy,
  onSortChange,
  isLoading,
  error,
}) {
  return (
    <main className="main">
      <div className="controls">
        <h2>Find your next movie</h2>

        <label htmlFor="sortSelect">
          Sort by:
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
          >
            <option value="default">Default</option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">Title: A–Z</option>
            <option value="za">Title: Z–A</option>
          </select>
        </label>
      </div>

      <div className="movies-grid" aria-busy={isLoading}>
  {isLoading ? (
    Array.from({ length: 10 }, (_, index) => (
      <div
        className="movie-card movie-card--skeleton"
        key={index}
        aria-hidden="true"
      >
        <div className="movie-card__img--skeleton" />
        <div className="movie-card__title--skeleton" />
        <div className="movie-card__year--skeleton" />
      </div>
    ))
  ) : error ? (
    <p role="alert">{error}</p>
  ) : (
    movies.map((movie) => (
      <MovieCard key={movie.imdbID} movie={movie} />
    ))
  )}
</div>
    </main>
  );
}

export default Home;