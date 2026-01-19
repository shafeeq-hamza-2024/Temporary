import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    // 🔐 Clear JWT tokens
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // 👤 Clear cached user
    localStorage.removeItem("user");

    // 🧹 Clear all React Query cache
    queryClient.clear();

    // 🚀 Redirect to login
    navigate("/login", { replace: true });
  };
}
