import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../api/authApi";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};
