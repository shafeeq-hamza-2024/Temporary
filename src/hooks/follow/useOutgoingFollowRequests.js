import { useQuery } from "@tanstack/react-query";
import { getOutgoingFollowRequests } from "../../api/followApi";

export const useOutgoingFollowRequests = () => {
  return useQuery({
    queryKey: ["follow", "outgoing"],
    queryFn: getOutgoingFollowRequests,
  });
};
