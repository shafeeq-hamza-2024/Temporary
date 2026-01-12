import api from "./api";

export const getQRcode = async (url) => {
  const res = await api.post(`/qr/`, {url});
  return res.data;
};