import { useQuery } from "@tanstack/react-query";
import { fetchPublicUsers } from "../../api/publicUserApi";

export const usePublicUsers = () => {
  return useQuery({
    queryKey: ["public-users"],
    queryFn: fetchPublicUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

