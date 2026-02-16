import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  publishArticle,
} from "../../api/articleApi";


/* ===============================
   LIST ARTICLES
   =============================== */
export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
};

/* ===============================
   ARTICLE DETAIL
   =============================== */
export const useArticle = (id) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id),
    enabled: !!id,
  });
};

/* ===============================
   CREATE ARTICLE
   =============================== */
export const useCreateArticle = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

/* ===============================
   UPDATE ARTICLE
   =============================== */
export const useUpdateArticle = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateArticle(id, payload),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      qc.invalidateQueries({ queryKey: ["article", variables.id] });
    },
  });
};

/* ===============================
   DELETE ARTICLE
   =============================== */
export const useDeleteArticle = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

/* ===============================
   PUBLISH ARTICLE
   =============================== */
export const usePublishArticle = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: publishArticle,
    onSuccess: (_, articleId) => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      qc.invalidateQueries({ queryKey: ["article", articleId] });
    },
  });
};
