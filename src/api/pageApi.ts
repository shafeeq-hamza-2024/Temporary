import api from "./api";
import { AllPagesItem, CreatePagePayload } from "@/types/pages/basic.types";

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
