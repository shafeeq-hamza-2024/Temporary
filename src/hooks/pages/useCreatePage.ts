import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPage } from "@/api/pageApi";
import { AllPagesItem, CreatePagePayload } from "@/types/pages/basic.types";

export const useCreatePage = () => {
  const qc = useQueryClient();

  return useMutation<AllPagesItem, Error, CreatePagePayload>({
    mutationFn: createPage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pages"] });
    },
  });
};
