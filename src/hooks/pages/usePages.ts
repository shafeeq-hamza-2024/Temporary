import { useQuery } from "@tanstack/react-query";
import { getAllPages } from "@/api/pageApi";
import { AllPagesItem } from "@/types/pages/basic.types";

export const usePages = () => {
  return useQuery<AllPagesItem[]>({
    queryKey: ["pages"],
    queryFn: getAllPages,
  });
};
