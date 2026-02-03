import { useQuery } from "@tanstack/react-query";
import { getIncomingFollowRequests } from "../../api/followApi";

export const useIncomingFollowRequests = () => {
  return useQuery({
    queryKey: ["follow", "incoming"],
    queryFn: getIncomingFollowRequests,
  });
};

