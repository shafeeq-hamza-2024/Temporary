import { useQuery } from "@tanstack/react-query";
import { fetchPublicUserById } from "../../api/publicUserApi";

export const usePublicUserProfile = (id) => {
  return useQuery({
    queryKey: ["public-user-profile", id],
    queryFn: () => fetchPublicUserById(id),
    enabled: !!id,
  });
};
