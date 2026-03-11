import ParticipantsList from "../../components/participants/ParticipantsList";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function Participants() {
  const {
    data: members = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await api.get("/members/");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return <ParticipantsList members={members} />;
}
