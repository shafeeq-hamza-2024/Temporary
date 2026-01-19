import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../../api/post";

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,

    // 1️⃣ Optimistic update
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old = []) =>
        old.map((post) =>
          post.id === postId
            ? {
                ...post,
                is_liked: !post.is_liked,
                like_count: post.is_liked
                  ? post.like_count - 1
                  : post.like_count + 1,
              }
            : post
        )
      );

      return { previousPosts };
    },

    // 2️⃣ Rollback on error
    onError: (_err, _postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },

    // 3️⃣ Sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
};
