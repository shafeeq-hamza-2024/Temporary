import api from "./api";
import {
  AllPagesItem,
  CreatePagePayload,
  PageDetails,
} from "@/types/pages/basic.types";

// -------------------------------------
// CREATE PAGE
// POST /pages/ (multipart/form-data for image uploads)
// -------------------------------------
export const createPage = async (
  payload: CreatePagePayload,
): Promise<AllPagesItem> => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  const res = await api.post("/pages/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
