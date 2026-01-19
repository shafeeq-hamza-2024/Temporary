import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../api/post";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onSuccess: (_, postId) => {
      // Remove post from cache lists
      queryClient.setQueryData(["posts"], (old) =>
        old ? old.filter((post) => post.id !== postId) : []
      );

      queryClient.setQueryData(["my_latest_posts"], (old) =>
        old ? old.filter((post) => post.id !== postId) : []
      );

      // Remove single post cache
      queryClient.removeQueries({ queryKey: ["post", postId] });
    },
  });
};
