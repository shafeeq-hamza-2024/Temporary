// src/hooks/ogi/useOgiMeta.js
import { useQuery } from "@tanstack/react-query";
import { getOgiMeta } from "../../api/ogiApi";

export const useOgiMeta = (url) => {
  return useQuery({
    queryKey: ["ogi-meta", url],
    queryFn: () => getOgiMeta(url),
    enabled: !!url, // 🔑 only run when url exists
    staleTime: 1000 * 60 * 10,
  });
};
