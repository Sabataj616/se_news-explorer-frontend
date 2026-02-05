import "./NewsCard.css";
import saveIcon from "../../assets/saveicon.png";
import saveIconBlk from "../../assets/Saveiconblk.png";
import saveIconBlue from "../../assets/saveIconBlue.png";
import deleteIcon from "../../assets/deleteIcon.png";
import deleteIconHovered from "../../assets/deleteIconHovered.png";
import { useState } from "react";
import { formatDateForAPI } from "../../utils/dateApi";
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
  const isOnSavedNews = location.pathname === "/saved-news";

  return (
    <div className="newscard__container">
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
        <h3 className="newscard__date">
          {formatDateForAPI(article.publishedAt)}
        </h3>
        <h1 className="newscard__title">{article.title}</h1>
        <p className="newscard__description">{article.description}</p>
        <h3 className="newscard__source">
          {article.source?.name || "Unknown Source"}
        </h3>
      </div>
    </div>
  );
}

export default NewsCard;
