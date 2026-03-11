import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followPage, unfollowPage } from "@/api/pageFollowApi";
import { FollowPagePayload } from "@/types/pages/basic.types";

export const useFollowPage = (pageId: number) => {
  const qc = useQueryClient();

  return useMutation<void, Error, FollowPagePayload>({
    mutationFn: followPage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["page", pageId] });
      qc.invalidateQueries({ queryKey: ["pages"] });
    },
  });
};

export const useUnfollowPage = (pageId: number) => {
  const qc = useQueryClient();

  return useMutation<void, Error, FollowPagePayload>({
    mutationFn: unfollowPage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["page", pageId] });
      qc.invalidateQueries({ queryKey: ["pages"] });
    },
  });
};
