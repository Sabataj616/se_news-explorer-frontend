import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import About from "../About/About";
import notFound from "../../images/not-found.png";

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
        <div className="main__no-results-section">
          <img
            src={notFound}
            alt="not-found-sad-emoji"
            className="no-results-image"
          />
          <h2 className="main__no-results-title">Nothing Found</h2>
          <p className="main__no-results-description">
            Sorry, but nothing matched your search terms
          </p>
        </div>
      )}
      {hasSearched && (
        <section className="main__news-articles-section">
          {loadingArticles ? (
            <Preloader />
          ) : (
            <>
              {" "}
              {articles.length > 0 && (
                <h2 className="main__search-results">Search Results</h2>
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
                <button className="main__show-more-button" onClick={onShowMore}>
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      )}
      <section className="main__about-section">
        <About />
      </section>
    </main>
  );
}

export default Main;
