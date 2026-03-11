import { useQuery } from "@tanstack/react-query";
import { getPageById } from "@/api/pageApi";
import { PageDetails } from "@/types/pages/basic.types";

export const usePageDetails = (pageId: number) => {
  return useQuery<PageDetails>({
    queryKey: ["page", pageId],
    queryFn: () => getPageById(pageId),
    enabled: !!pageId,
  });
};
