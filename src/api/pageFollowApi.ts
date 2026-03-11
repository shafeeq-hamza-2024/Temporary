import api from "./api";
import { FollowPagePayload } from "@/types/pages/basic.types";

// -------------------------------------
// FOLLOW PAGE
// POST /page-follow/follow/
// -------------------------------------
export const followPage = async (payload: FollowPagePayload): Promise<void> => {
  await api.post("/page-follow/follow/", payload);
};

// -------------------------------------
// UNFOLLOW PAGE
// POST /page-follow/unfollow/
// -------------------------------------
export const unfollowPage = async (
  payload: FollowPagePayload,
): Promise<void> => {
  await api.post("/page-follow/unfollow/", payload);
};
