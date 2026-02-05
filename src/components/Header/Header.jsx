import "./Header.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/NewsExplorer.png";
import Navigation from "../Navigation/Navigation";
import hamburger from "../../assets/menu.png";
import blkhamburger from "../../assets/blkhamburger.png";
import logout from "../../assets/logout.png";
import logoutblk from "../../assets/logoutblk.png";
import Logoblk from "../../assets/NewsExplorerblk.png";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({
  handleLogInClick,
  isOpen,
  isLoggedIn,
  isDropdownOpen,
  toggleMenu,
  closeDropdownMenu,
  handleSignOut,
  isOnSavedNews,
}) {
  

  const currentUser = useContext(CurrentUserContext);
  return (
    <header
    className={`header ${
      isDropdownOpen 
        ? "header--dropdown-version" 
        : isOnSavedNews 
        ? "header--saved-news" 
        : ""
    }`}
    >
      <Link to="/">
        <img
          src={isOnSavedNews && !isDropdownOpen ? Logoblk : Logo}
          alt="news logo"
          className="header__logo"
        />
      </Link>
      {isDropdownOpen && !isOpen && (
        <button
          onClick={closeDropdownMenu}
          type="button"
          className="menu__white-close-btn"
        ></button>
      )}
      <div className="header__sign-in-container">
        <Navigation
          isLoggedIn={isLoggedIn}
          closeDropdownMenu={closeDropdownMenu}
        />
        {!isLoggedIn && (
          <button
            type="button"
            className="header__sign-in-btn"
            onClick={handleLogInClick}
          >
            Sign In
          </button>
        )}
        {isLoggedIn && (
          <button
            type="button"
            className={`header__username-btn ${
              isOnSavedNews ? "header__username-btn-saved-news" : ""
            }`}
          >
            <img
              src={isOnSavedNews ? logoutblk : logout}
              alt="logout-icon"
              className="header__logout-btn"
              onClick={handleSignOut}
            />
            {currentUser?.name || "User"}
          </button>
        )}
      </div>
      {!isOpen && !isDropdownOpen && (
        <img
          src={isOnSavedNews ? blkhamburger : hamburger}
          alt="hamburger-icon"
          className="header__menu-btn"
          onClick={toggleMenu}
        />
      )}
      {isDropdownOpen && (
        <div className="header__dropdown">
          <Link
            to="/"
            className="header__dropdown-link"
            onClick={closeDropdownMenu}
          >
            Home
          </Link>
          {!isLoggedIn ? (
            <button className="header__dropdown-btn" onClick={handleLogInClick}>
              Sign In
            </button>
          ) : (
            <button className="header__dropdown-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
export default Header;
