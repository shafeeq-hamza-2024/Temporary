import api from "./api";

/* =====================================================
   REFERENCES
   ===================================================== */

// ADD REFERENCE
// POST /articles/:id/references/
export const addReference = async (articleId, referencedUserId) => {
  const res = await api.post(`/articles/${articleId}/references/`, {
    referenced_user: referencedUserId,
  });
  return res.data;
};

// LIST REFERENCES OF ARTICLE
// GET /articles/:id/references/
export const getArticleReferences = async (articleId) => {
  const res = await api.get(`/articles/${articleId}/references/`);
  return res.data;
};

// REMOVE REFERENCE
// DELETE /references/:id/
export const deleteReference = async (referenceId) => {
  const res = await api.delete(`/references/${referenceId}/`);
  return res.data;
};
