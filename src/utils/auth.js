export const checkToken = (token) => {
  if (!token) {
    return Promise.reject({ message: "No token provided" });
  }

  return Promise.resolve({
    data: {
      name: "Test User",
      email: "test@example.com",
    },
  });
};

export const register = (userData) => {
  if (!userData) {
    return Promise.reject({ message: " Please enter an email and password!" });
  }

  return Promise.resolve({
    data: {
      name: userData.name,
      email: userData.email,
    },
  });
};

export const saveArticle = (article, keyword) => {
  if (!article) {
    return Promise.reject({ message: "Could not save article" });
  }

  return Promise.resolve({
    data: {
      source: article.source,
      title: article.title,
      publishedAt: article.publishedAt,
      description: article.description,
      urlToImage: article.urlToImage,
      keyword: keyword,
    },
  });
};
