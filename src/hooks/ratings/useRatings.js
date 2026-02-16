import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  rateArticle,
  getMyArticleRating,
  getArticleRatings,
} from "../../api/articleRatingApi";

/* ===============================
   ARTICLE RATINGS (avg + count)
   =============================== */
export const useArticleRatings = (articleId) => {
  return useQuery({
    queryKey: ["article-ratings", articleId],
    queryFn: () => getArticleRatings(articleId),
    enabled: !!articleId,
  });
};

/* ===============================
   MY ARTICLE RATING
   =============================== */
export const useMyArticleRating = (articleId) => {
  return useQuery({
    queryKey: ["my-article-rating", articleId],
    queryFn: () => getMyArticleRating(articleId),
    enabled: !!articleId,
  });
};

/* ===============================
   RATE / UPDATE ARTICLE
   =============================== */
export const useRateArticle = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, rating }) =>
      rateArticle(articleId, rating),
    onSuccess: (_, { articleId }) => {
      qc.invalidateQueries({ queryKey: ["article-ratings", articleId] });
      qc.invalidateQueries({ queryKey: ["my-article-rating", articleId] });
    },
  });
};
