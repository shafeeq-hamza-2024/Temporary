import { useQuery } from "@tanstack/react-query";
import { getAllPages, getMyPages } from "@/api/pageApi";
import { AllPagesItem } from "@/types/pages/basic.types";

export const usePages = () => {
  return useQuery<AllPagesItem[]>({
    queryKey: ["pages"],
    queryFn: getAllPages,
  });
};

export const useMyPages = () => {
  return useQuery<AllPagesItem[]>({
    queryKey: ["pages", "my_pages"],
    queryFn: getMyPages,
  });
};
