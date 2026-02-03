import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
  unfollowUser,
  removeFollower
} from "../../api/followApi";

export const useSendFollow = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: sendFollowRequest,
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
};


export const useAcceptFollow = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: acceptFollowRequest,
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
};


export const useRejectFollow = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: rejectFollowRequest,
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
};


export const useUnfollow = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
};


export const useRemoveFollower = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: removeFollower,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["followers"] });
      qc.invalidateQueries({ queryKey: ["following"] });
      qc.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};
