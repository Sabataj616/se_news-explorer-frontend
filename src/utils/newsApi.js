const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const handleServerResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(
        "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
      );
};
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

export const getNews = (q, from, to, pageSize) => {
  return fetch(
    `${newsApiBaseUrl}?q=${q}&apiKey=${apiKey}&from=${from}&to=${to}&pageSize=${pageSize}`
  ).then(handleServerResponse);
};
