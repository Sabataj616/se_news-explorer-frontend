import "./SearchForm.css";
import { useLocation } from "react-router-dom";
import { getNews } from "../../utils/NewsApi";
import { getDateRange } from "../../utils/dateApi";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

function SearchForm({
  onSearchResults,
  setLoadingArticles,
  error,
  setError,
  setHasSearched,
}) {
  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";
  const [searchPerformed, setSearchPerformed] = useState(false);

  const defaultValues = {
    keyword: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);
  const handleSearchChange = (evt) => {
    handleChange(evt);
    setError("");
  };
  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    setError("");
    setSearchPerformed(true);
    setLoadingArticles(true);
    setHasSearched(true);

    if (!values.keyword.trim()) {
      setError("Please enter a keyword");
      setSearchPerformed(false);
      setLoadingArticles(false);
      return;
    }

    const { from, to } = getDateRange();

    getNews(values.keyword, from, to, 100)
      .then((data) => {
        setLoadingArticles(false);
        onSearchResults(data.articles, values.keyword);
      })
      .catch((error) => {
        setLoadingArticles(false);

        setError(error);
      });
  };

  return (
    <div
      className={`search__container ${
        isOnSavedNews ? "search__container-hidden" : ""
      }`}
    >
      <h1 className="search__title">What's going on in the world?</h1>
      <p className="search__subtext">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="search__form" onSubmit={handleSearchSubmit}>
        <input
          name="keyword"
          value={values.keyword}
          id="search-input"
          type="text"
          placeholder="Enter topic"
          className="search__input"
          onChange={handleSearchChange}
        />

        <button type="submit" className="search__button">
          Search
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SearchForm;
