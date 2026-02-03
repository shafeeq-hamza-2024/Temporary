import { useQuery } from "@tanstack/react-query";
import { getUserFollowers } from "../../api/followApi";

export const useUserFollowers = (userId) => {
  return useQuery({
    queryKey: ["followers", userId],
    queryFn: () => getUserFollowers(userId),
    enabled: !!userId,
  });
};

