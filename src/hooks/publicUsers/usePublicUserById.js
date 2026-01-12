import { useQuery } from "@tanstack/react-query";
import { fetchPublicUserById } from "../../api/publicUserApi";

export const usePublicUserById = (userId) => {
  return useQuery({
    queryKey: ["public-user", userId],
    queryFn: () => fetchPublicUserById(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
