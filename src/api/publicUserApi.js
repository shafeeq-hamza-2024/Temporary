import api from "./api";

/**
 * Fetch all public users
 */
export const fetchPublicUsers = async () => {
  const { data } = await api.get("/public/users/");
  return data;
};

/**
 * Fetch public user by ID
 */


export const fetchPublicUserById = async (id) => {
  const { data } = await api.get(`/public/users/${id}/`);
  return data;
};



export const searchPublicUsers = async (query) => {
  if (!query) return [];

  const { data } = await api.get("/public/users/search/", {
    params: { q: query },
  });

  return data;
};
