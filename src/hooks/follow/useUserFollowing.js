import { useQuery } from "@tanstack/react-query";
import { getUserFollowing } from "../../api/followApi";

export const useUserFollowing = (userId) => {
  return useQuery({
    queryKey: ["following", userId],
    queryFn: () => getUserFollowing(userId),
    enabled: !!userId,
  });
};
