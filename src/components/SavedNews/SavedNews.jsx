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
    <div className="saved__container">
      <div className="Upper">
        <p className="upper__description">Saved articles</p>
        <h1 className="upper__title">
          {currentUser?.name || "User"}, you have {savedArticles?.length || 0}{" "}
          saved articles
        </h1>

        <p className="keywords__text">
          By keywords:
          {uniqueKeywords.map((keyword, index) => (
            <span key={index}>
              {keyword}
              {index < uniqueKeywords.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
      <div className="lower">
        {savedArticles.map((article) => (
          <NewsCard
            key={article.title}
            article={article}
            handleRemoveArticle={handleRemoveArticle}
            savedArticles={savedArticles}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedNews;
