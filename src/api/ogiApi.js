// src/api/ogiApi.js
import api from "./api";

export const getOgiMeta = async (url) => {
  const res = await api.post("/og-meta/", { url });
  return res.data;
};
