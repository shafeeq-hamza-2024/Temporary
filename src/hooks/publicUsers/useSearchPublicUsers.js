import { useQuery } from "@tanstack/react-query";
import { searchPublicUsers } from "../../api/publicUserApi";

export const useSearchPublicUsers = (query) => {
  const cleanedQuery = query?.trim() || "";

  return useQuery({
    queryKey: ["search-public-users", cleanedQuery],
    queryFn: () => searchPublicUsers(cleanedQuery),
    enabled: cleanedQuery.length >= 1, // ✅ only search when meaningful
    staleTime: 30 * 1000,
    keepPreviousData: true, // ✅ prevents dropdown flicker
  });
};
