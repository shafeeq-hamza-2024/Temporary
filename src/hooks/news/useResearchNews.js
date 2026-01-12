import { useQuery } from "@tanstack/react-query";
import { getResearchNews } from "../../api/news";

export const useResearchNews = () => {
  return useQuery({
    queryKey: ["research-news"],
    queryFn: getResearchNews,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
