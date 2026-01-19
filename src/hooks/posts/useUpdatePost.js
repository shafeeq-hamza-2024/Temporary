import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../../api/post";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,

    onSuccess: (updatedPost) => {
      // Update single post cache
      queryClient.setQueryData(["post", updatedPost.id], updatedPost);

      // Refresh posts list
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["my_latest_posts"] });
    },
  });
};
