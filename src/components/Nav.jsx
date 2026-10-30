import logo from "../assets/fes-logo.png";
import { Link } from "react-router-dom";
function Nav({ onSearch }) {
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <img className="logo__img" src={logo} alt="" />
        <h1 className="logo__title">
          Movie<span>Search</span>
        </h1>
      </Link>

      <form
        className="search-form"
        onSubmit={(event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const query = formData.get("search").trim();

  if (query && onSearch) {
    onSearch(query);
  }
}}
      >
        <div className="search-form__group">
          <input
            className="search-form__input"
            name="search"
            placeholder="Search for a movie..."
            aria-label="Search movies"
          />
          <button
            className="search-form__button"
            type="submit"
            aria-label="Search"
          >
            <svg
              className="search-form__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="7" />
              <path d="m15 15 6 6" />
            </svg>
          </button>
        </div>
      </form>
    </nav>
  );
}

export default Nav;