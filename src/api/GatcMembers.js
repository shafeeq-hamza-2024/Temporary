import api from "./api";

export const getGatcMembers = async () => {
    const res = await api.get("/members");
    return res.data;
};

export const getGatcMemberById = async (id) => {
    const res = await api.get(`/members/${id}/`);
    return res.data;
};