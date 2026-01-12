import api from "./api";   // <-- this is your Axios instance

export const validateLogin = async ({ email, password }) => {
  const response = await api.post("/login/", { email, password });
  return response.data;
};

export const getMe = async () => {
  const res = await api.get("/me/");
  return res.data;
};