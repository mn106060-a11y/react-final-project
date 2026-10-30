import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
function App() {
  const [sortBy, setSortBy] = useState("default");
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
async function searchMovies(query) {
  setIsLoading(true);
  navigate("/");
  setError("");
  setMovies([]);

  try {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=movie`
    );

    if (!response.ok) {
      throw new Error("Unable to load movies. Please try again.");
    }

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "No movies found.");
    }

    setMovies(data.Search || []);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
}
const sortedMovies = [...movies].sort((a, b) => {
  if (sortBy === "newest") {
    return Number(b.Year) - Number(a.Year);
  }
  if (sortBy === "oldest") {
    return Number(a.Year) - Number(b.Year);
  }
  if (sortBy === "az") {
    return a.Title.localeCompare(b.Title);
  }
  if (sortBy === "za") {
    return b.Title.localeCompare(a.Title);
  }
  return 0;
});
  return (
    <>
      <Nav onSearch={searchMovies} />
      <Routes>
  <Route
    path="/"
    element={
      <Home
        movies={sortedMovies}
        sortBy={sortBy}
        onSortChange={setSortBy}
        isLoading={isLoading}
        error={error}
      />
    }
  />
  <Route path="/movie/:id" element={<MovieDetails />} />
</Routes>
      <footer>
        <p>Movie Search — Built by Miguel Navarrete</p>
      </footer>
    </>
  );
}

export default App;