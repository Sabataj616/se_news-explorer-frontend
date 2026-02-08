import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessRegisterModal from "../SuccessRegisterModal/SuccessRegisterModal";
import SearchForm from "../SearchForm/SearchForm";
import { setToken, getToken } from "../../utils/token";
import CurrentUserContext from "../../context/CurrentUserContext";
import { register } from "../../utils/auth";
import { checkToken } from "../../utils/auth";
import { saveArticle } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoutes";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";
  const [activeModal, setActiveModal] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [foundResults, setFoundResults] = useState([]);
  const [savedArticles, setSavedArticles] = useState(() => {
    const saved = localStorage.getItem("savedArticles");
    return saved ? JSON.parse(saved) : [];
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [keyword, setKeyword] = useState("");
  const hasShownLoginModal = useRef(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogInClick = () => {
    setActiveModal("log-in");
  };
  const handleRegisterClick = () => setActiveModal("register");
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleLogin = ({ email, password, name }) => {
    if (!email || !password) {
      return;
    }

    const simulatedResponse = {
      token: "fake-jwt-token-for-stage-1",
      user: {
        name: name,
        email: email,
      },
    };

    setToken(simulatedResponse.token);
    setCurrentUser(simulatedResponse.user);
    setIsLoggedIn(true);
    closeActiveModal();

    navigate("/");
  };

  const handleRegistration = ({ email, password, name }) => {
    register({ email, password, name })
      .then(() => {
        setIsSuccess(true);
        setActiveModal("register-success");
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setCurrentUser({ name: "", email: "" });
    navigate("/");
  };

  const closeDropdownMenu = () => {
    setIsDropdownOpen(false);
  };
  const handleSearchResults = (articles, keyword) => {
    setArticles(articles);
    setFoundResults(articles.slice(0, 3));
    setHasSearched(true);
    setKeyword(keyword);
  };

  const handleShowMore = () => {
    const currentCount = foundResults.length;
    const nextCount = currentCount + 3;
    setFoundResults(articles.slice(0, nextCount));
  };

  const handleSaveArticle = (article) => {
    saveArticle(article, keyword)
      .then((article) => {
        const articleWithKeyword = {
          ...article.data,
          keyword: keyword,
        };
        const updatedSavedArticles = [...savedArticles, articleWithKeyword];
        setSavedArticles(updatedSavedArticles);
        localStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticles)
        );
      })
      .catch((error) => {
        console.error("Failed to save article:", error);
      });
  };

  const handleRemoveArticle = (articleToRemove) => {
    const updatedSavedArticles = savedArticles.filter(
      (article) => article.title !== articleToRemove.title
    );
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles));
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    checkToken(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (location.state?.from && !isLoggedIn && !hasShownLoginModal.current) {
      hasShownLoginModal.current = true;
      setTimeout(() => setActiveModal("log-in"), 0);
    }
  }, [location, isLoggedIn]);
  useEffect(() => {
    if (!activeModal) return;
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
        closeDropdownMenu();
      }
    };

    const handleOverlayClick = (e) => {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleOverlayClick);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [activeModal]);

  const onToggleModal = () => {
    if (activeModal === "log-in") {
      setActiveModal("register");
    } else if (activeModal === "register-success") {
      setActiveModal("log-in");
    } else {
      setActiveModal("log-in");
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <div
            className={`hero-section ${
              isOnSavedNews ? "hero-section-hidden" : ""
            }`}
          >
            <Header
              handleLogInClick={handleLogInClick}
              handleRegisterClick={handleRegisterClick}
              isOpen={activeModal}
              isLoggedIn={isLoggedIn}
              isDropdownOpen={isDropdownOpen}
              toggleMenu={toggleDropdown}
              closeDropdownMenu={closeDropdownMenu}
              handleSignOut={handleSignOut}
              isOnSavedNews={isOnSavedNews}
            />

            {!isOnSavedNews && (
              <SearchForm
                onSearchResults={handleSearchResults}
                setLoadingArticles={setLoadingArticles}
                setError={setError}
                error={error}
                setHasSearched={setHasSearched}
                handleRemoveArticle={handleRemoveArticle}
                keyword={keyword}
              />
            )}
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  isLoggedIn={isLoggedIn}
                  handleRegisterClick={handleRegisterClick}
                  articles={foundResults}
                  displayedResults={articles}
                  onShowMore={handleShowMore}
                  hasSearched={hasSearched}
                  loadingArticles={loadingArticles}
                  error={error}
                  handleSaveArticle={handleSaveArticle}
                  handleRemoveArticle={handleRemoveArticle}
                  savedArticles={savedArticles}
                />
              }
            />

            <Route
              path="/saved-news"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedNews
                    savedArticles={savedArticles}
                    handleRemoveArticle={handleRemoveArticle}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
          <LoginModal
            isOpen={activeModal === "log-in"}
            closeActiveModal={closeActiveModal}
            onLogin={handleLogin}
            activeModal={activeModal}
            onToggleModal={onToggleModal}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            closeActiveModal={closeActiveModal}
            onRegister={handleRegistration}
            activeModal={activeModal}
            onToggleModal={onToggleModal}
          />
          <SuccessRegisterModal
            isOpen={activeModal === "register-success"}
            isSuccess={isSuccess}
            closeActiveModal={closeActiveModal}
            onToggleModal={onToggleModal}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
