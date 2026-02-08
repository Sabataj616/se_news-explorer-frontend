import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  newsArticles,
  isLoggedIn,
  handleRegisterClick,
  handleSaveArticle,
  handleRemoveArticle,
  savedArticles,
}) {
  return (
    <section className="news-card-list">
      {newsArticles.map((article) => (
        <NewsCard
          key={article.url}
          article={article}
          isLoggedIn={isLoggedIn}
          handleRegisterClick={handleRegisterClick}
          handleSaveArticle={handleSaveArticle}
          handleRemoveArticle={handleRemoveArticle}
          savedArticles={savedArticles}
        />
      ))}
    </section>
  );
}
export default NewsCardList;
