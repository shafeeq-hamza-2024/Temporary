import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGatcMembers } from "../../api/GatcMembers";

export const useMembers = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["members"],
    queryFn: getGatcMembers,
    staleTime: 1000 * 60 * 2,
    onSuccess: (data) => {
      queryClient.setQueryData(["members"], data);
    },
  });
};

// export const useMember = (id) => {
//   return useQuery({
//     queryKey: ["member", id],
//     queryFn: () => getGatcMemberById(id),
//     enabled: !!id,
//     staleTime: 1000 * 60 * 5,
//   });
// };
