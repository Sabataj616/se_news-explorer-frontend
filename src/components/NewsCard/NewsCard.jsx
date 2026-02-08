import "./NewsCard.css";
import saveIcon from "../../images/saveicon.png";
import saveIconBlk from "../../images/saveiconblk.png";
import saveIconBlue from "../../images/saveIconBlue.png";
import deleteIcon from "../../images/deleteIcon.png";
import deleteIconHovered from "../../images/deleteIconHovered.png";
import { useState } from "react";
import { formatDateForAPI } from "../../utils/dateApi";
import { useLocation } from "react-router-dom";
function NewsCard({
  article,
  isLoggedIn,
  handleRegisterClick,
  handleSaveArticle,
  handleRemoveArticle,
  savedArticles,
}) {
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const isSaved = savedArticles.some((saved) => saved.title === article.title);
  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";

  return (
    <article className="newscard">
      <div className="newscard__top">
        <img
          src={article.urlToImage}
          alt="article image"
          className="newscard__image"
        />
        <div className="newscard__save-container">
          {!isOnSavedNews && (
            <button
              onMouseEnter={() => setIsSaveHovered(true)}
              onMouseLeave={() => setIsSaveHovered(false)}
              onClick={
                isLoggedIn
                  ? () => {
                      if (isSaved) {
                        handleRemoveArticle(article);
                      } else {
                        handleSaveArticle(article);
                      }
                    }
                  : handleRegisterClick
              }
              className="newscard__save-button"
            >
              <img
                src={
                  isSaved
                    ? saveIconBlue
                    : isSaveHovered
                    ? saveIconBlk
                    : saveIcon
                }
                alt="save-icon"
                className="newscard__save-icon"
              />
            </button>
          )}
          {isOnSavedNews && (
            <button
              onMouseEnter={() => setIsDeleteHovered(true)}
              onMouseLeave={() => setIsDeleteHovered(false)}
              onClick={() => {
                handleRemoveArticle(article);
              }}
              className="newscard__save-button"
            >
              <img
                src={isDeleteHovered ? deleteIconHovered : deleteIcon}
                alt="delete-icon"
                className="newscard__save-icon"
              />
            </button>
          )}
          {(isSaveHovered || isDeleteHovered) && (
            <div className="newscard__tooltip">
              {isSaveHovered && !isLoggedIn && "Sign in to save articles"}
              {isSaveHovered && isLoggedIn && "Save article"}
              {isDeleteHovered && "Remove from saved"}
            </div>
          )}
        </div>
      </div>
      <div className="newscard__content">
        <p className="newscard__date">
          {formatDateForAPI(article.publishedAt)}
        </p>
        <h2 className="newscard__title">{article.title}</h2>
        <p className="newscard__description">{article.description}</p>
        <p className="newscard__source">
          {article.source?.name || "Unknown Source"}
        </p>
      </div>
    </article>
  );
}

export default NewsCard;
