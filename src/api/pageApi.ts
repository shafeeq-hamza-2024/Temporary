import api from "./api";
import {
  AllPagesItem,
  CreatePagePayload,
  PageDetails,
} from "@/types/pages/basic.types";

// -------------------------------------
// CREATE PAGE
// POST /pages/
// -------------------------------------
export const createPage = async (
  payload: CreatePagePayload,
): Promise<AllPagesItem> => {
  const res = await api.post("/pages/", payload);
  return res.data;
};

// -------------------------------------
// GET ALL PAGES
// GET /pages/
// -------------------------------------
export const getAllPages = async (): Promise<AllPagesItem[]> => {
  const res = await api.get("/pages/");
  return res.data;
};

// -------------------------------------
// GET MY PAGES
// GET /pages/my_pages/
// -------------------------------------
export const getMyPages = async (): Promise<AllPagesItem[]> => {
  const res = await api.get("/pages/my_pages/");
  return res.data;
};

// -------------------------------------
// GET PAGE BY ID
// GET /pages/:id/
// -------------------------------------
export const getPageById = async (id: number): Promise<PageDetails> => {
  const res = await api.get(`/pages/${id}/`);
  return res.data;
};
