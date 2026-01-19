import api from "./api";   // <-- this is your Axios instance

export const validateLogin = async ({ email, password }) => {
  const response = await api.post("/login/", { email, password });
  return response.data;
};

export const getMe = async () => {
  const res = await api.get("/me/");
  return res.data;
};

// -------------------------
// VERIFY EMAIL API
// -------------------------
export const verifyEmail = async (token) => {
  const response = await api.post("/verify-email/", { token });
  return response.data;
};

export const resendVerificationEmail = async (email) => {
  const res = await api.post("/resend-verification/", { email });
  return res.data;
};