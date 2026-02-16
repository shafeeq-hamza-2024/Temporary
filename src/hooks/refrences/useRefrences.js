import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addReference,
  getArticleReferences,
  deleteReference,
} from "../../api/articleReferenceApi";

/* ===============================
   LIST REFERENCES
   =============================== */
export const useArticleReferences = (articleId) => {
  return useQuery({
    queryKey: ["article-references", articleId],
    queryFn: () => getArticleReferences(articleId),
    enabled: !!articleId,
  });
};

/* ===============================
   ADD REFERENCE
   =============================== */
export const useAddReference = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, referencedUserId }) =>
      addReference(articleId, referencedUserId),
    onSuccess: (_, { articleId }) => {
      qc.invalidateQueries({ queryKey: ["article-references", articleId] });
    },
  });
};

/* ===============================
   DELETE REFERENCE
   =============================== */
export const useDeleteReference = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteReference,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["article-references"] });
    },
  });
};
