import api from "./api";

// -------------------------------------
// CREATE ARTICLE
// POST /articles/
// -------------------------------------
export const createArticle = async (payload) => {
  const res = await api.post("/articles/", payload);
  return res.data;
};

// -------------------------------------
// LIST ARTICLES
// GET /articles/
// -------------------------------------
export const getArticles = async () => {
  const res = await api.get("/articles/");
  return res.data;
};

// -------------------------------------
// ARTICLE DETAIL
// GET /articles/:id/
// -------------------------------------
export const getArticleById = async (id) => {
  const res = await api.get(`/articles/${id}/`);
  return res.data;
};

// -------------------------------------
// UPDATE ARTICLE
// PUT /articles/:id/
// -------------------------------------
export const updateArticle = async (id, payload) => {
  const res = await api.put(`/articles/${id}/`, payload);
  return res.data;
};

// -------------------------------------
// DELETE ARTICLE
// DELETE /articles/:id/
// -------------------------------------
export const deleteArticle = async (id) => {
  const res = await api.delete(`/articles/${id}/`);
  return res.data;
};

// -------------------------------------
// PUBLISH ARTICLE
// POST /articles/:id/publish/
// -------------------------------------
export const publishArticle = async (id) => {
  const res = await api.post(`/articles/${id}/publish/`);
  return res.data;
};
