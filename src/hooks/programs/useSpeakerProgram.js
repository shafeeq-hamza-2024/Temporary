import { useQuery } from "@tanstack/react-query";
import { getSpeakerPrograms } from "../../api/program";

export const useSpeakerPrograms = (speakerId) => {
  return useQuery({
    queryKey: ["speaker-programs", speakerId],
    queryFn: () => getSpeakerPrograms(speakerId),
    enabled: !!speakerId,
  });
};