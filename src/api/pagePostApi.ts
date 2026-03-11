import api from "./api";
import { PagePost } from "@/types/pages/basic.types";

// -------------------------------------
// GET PAGE POSTS
// GET /page-posts/?page=:pageId
// -------------------------------------
export const getPagePosts = async (pageId: number): Promise<PagePost[]> => {
  const res = await api.get("/page-posts/", { params: { page: pageId } });
  return res.data;
};

// -------------------------------------
// CREATE PAGE POST
// POST /page-posts/ (multipart form data)
// -------------------------------------
export const createPagePost = async (payload: {
  page: number;
  content: string;
  files?: File[];
}): Promise<PagePost> => {
  const formData = new FormData();
  formData.append("page", String(payload.page));
  formData.append("content", payload.content);

  if (payload.files) {
    payload.files.forEach((file) => {
      formData.append("files", file);
    });
  }

  const res = await api.post("/page-posts/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// -------------------------------------
// DELETE PAGE POST
// DELETE /page-posts/:postId/
// -------------------------------------
export const deletePagePost = async (postId: number): Promise<void> => {
  await api.delete(`/page-posts/${postId}/`);
};
