import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPagePosts, createPagePost, deletePagePost } from "@/api/pagePostApi";
import { PagePost, CreatePagePostPayload } from "@/types/pages/basic.types";

export const usePagePosts = (pageId: number) => {
  return useQuery<PagePost[]>({
    queryKey: ["pagePosts", pageId],
    queryFn: () => getPagePosts(pageId),
    enabled: !!pageId,
  });
};

export const useCreatePagePost = (pageId: number) => {
  const qc = useQueryClient();

  return useMutation<PagePost, Error, CreatePagePostPayload>({
    mutationFn: createPagePost,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pagePosts", pageId] });
    },
  });
};

export const useDeletePagePost = (pageId: number) => {
  const qc = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deletePagePost,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pagePosts", pageId] });
    },
  });
};
