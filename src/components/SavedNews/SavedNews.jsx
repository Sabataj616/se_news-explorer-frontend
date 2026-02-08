import "./SavedNews.css";

import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import NewsCard from "../NewsCard/NewsCard";

function SavedNews({ savedArticles, handleRemoveArticle }) {
  const currentUser = useContext(CurrentUserContext);
  const uniqueKeywords = [
    ...new Set(savedArticles.map((article) => article.keyword)),
  ];
  return (
    <section className="saved">
      <div className="saved__upper">
        <p className="saved__upper-description">Saved articles</p>
        <h2 className="saved__upper-title">
          {currentUser?.name || "User"}, you have {savedArticles?.length || 0}{" "}
          saved articles
        </h2>

        <p className="saved__keywords">
          By keywords:
          {uniqueKeywords.map((keyword, index) => (
            <span key={index}>
              {keyword}
              {index < uniqueKeywords.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
      <div className="saved__lower">
        {savedArticles.map((article) => (
          <NewsCard
            key={article.title}
            article={article}
            handleRemoveArticle={handleRemoveArticle}
            savedArticles={savedArticles}
          />
        ))}
      </div>
    </section>
  );
}

export default SavedNews;
