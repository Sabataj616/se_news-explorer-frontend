import "./Navigation.css";
import { Link } from "react-router-dom";
import Logo from "../../images/NewsExplorer.png";
import { useLocation } from "react-router-dom";

function Navigation({ isLoggedIn, closeDropdownMenu }) {
  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";
  return (
    <nav className="navigation">
      <Link to="/" onClick={closeDropdownMenu}>
        <button
          type="button"
          className={`navigation__home-btn ${
            isOnSavedNews ? "navigation__home-btn-black" : ""
          }`}
        >
          Home
        </button>
      </Link>
      {isLoggedIn && (
        <Link to="/saved-news">
          <button
            type="button"
            className={`navigation__saved-articles-btn ${
              isOnSavedNews ? "navigation__saved-articles-btn-black" : ""
            }`}
          >
            Saved articles
          </button>
        </Link>
      )}
    </nav>
  );
}

export default Navigation;
