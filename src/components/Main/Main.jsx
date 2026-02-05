import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../../Preloader/Preloader";
import About from "../About/About";
import notFound from "../../assets/not-found.png";

function Main({
  isLoggedIn,
  handleRegisterClick,
  articles,
  onShowMore,
  hasSearched,
  loadingArticles,
  displayedResults,
  handleSaveArticle,
  handleRemoveArticle,
  savedArticles,
}) {
  return (
    <main className="main">
      {hasSearched && articles.length === 0 && !loadingArticles && (
        <div className="no-results-section">
          <img
            src={notFound}
            alt="not-found-sad-emoji"
            className="no-results-image"
          />
          <h1 className="no-results-title">Nothing Found</h1>
          <p className="no-results-description">
            Sorry, but nothing matched your search terms
          </p>
        </div>
      )}
      {hasSearched && (
        <section className="news-articles-section">
          {loadingArticles ? (
            <Preloader />
          ) : (
            <>
              {" "}
              {articles.length > 0 && (
                <h1 className="search__results">Search Results</h1>
              )}
              <NewsCardList
                newsArticles={articles}
                isLoggedIn={isLoggedIn}
                handleRegisterClick={handleRegisterClick}
                handleSaveArticle={handleSaveArticle}
                handleRemoveArticle={handleRemoveArticle}
                savedArticles={savedArticles}
              />
              {articles.length < displayedResults.length && (
                <button className="show-more__button" onClick={onShowMore}>
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      )}
      <section className="about-section">
        <About />
      </section>
    </main>
  );
}

export default Main;
