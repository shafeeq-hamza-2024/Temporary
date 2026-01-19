import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail } from "../api/authApi";

export const useResendVerification = () => {
  return useMutation({
    mutationFn: resendVerificationEmail,
  });
};
