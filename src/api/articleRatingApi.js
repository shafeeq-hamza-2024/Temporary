import api from "./api";

/* =====================================================
   RATINGS
   ===================================================== */

// RATE / UPDATE RATING
// POST /articles/:id/rate/
export const rateArticle = async (articleId, rating) => {
  const res = await api.post(`/articles/${articleId}/rate/`, {
    rating,
  });
  return res.data;
};

// GET MY RATING
// GET /articles/:id/my-rating/
export const getMyArticleRating = async (articleId) => {
  const res = await api.get(`/articles/${articleId}/my-rating/`);
  return res.data;
};

// GET ARTICLE RATINGS (avg + count)
// GET /articles/:id/ratings/
export const getArticleRatings = async (articleId) => {
  const res = await api.get(`/articles/${articleId}/ratings/`);
  return res.data;
};
