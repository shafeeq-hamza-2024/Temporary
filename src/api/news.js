import api from "./api";

export const getResearchNews = async () => {
  const res = await api.get("/news/");
  return res.data;
};
