import api from "./api";

// -------------------------------------
// SEND FOLLOW REQUEST
// POST /follows/
// -------------------------------------
export const sendFollowRequest = async (followingId) => {
  const res = await api.post("/follows/", {
    following: followingId,
  });
  return res.data;
};

// -------------------------------------
// ACCEPT FOLLOW REQUEST
// POST /follows/:id/accept/
// -------------------------------------
export const acceptFollowRequest = async (requestId) => {
  const res = await api.post(`/follows/${requestId}/accept/`);
  return res.data;
};

// -------------------------------------
// REJECT FOLLOW REQUEST
// POST /follows/:id/reject/
// -------------------------------------
export const rejectFollowRequest = async (requestId) => {
  const res = await api.post(`/follows/${requestId}/reject/`);
  return res.data;
};

// -------------------------------------
// UNFOLLOW USER
// POST /follows/unfollow/
// -------------------------------------
export const unfollowUser = async (followingId) => {
  const res = await api.post("/follows/unfollow/", {
    following: followingId,
  });
  return res.data;
};

// -------------------------------------
// REMOVE FOLLOWER
// POST /follows/remove_follower/
// -------------------------------------
export const removeFollower = async (followerId) => {
  const res = await api.post("/follows/remove_follower/", {
    follower: followerId,
  });
  return res.data;
};


// -------------------------------------
// INCOMING FOLLOW REQUESTS
// GET /follows/incoming/
// -------------------------------------
export const getIncomingFollowRequests = async () => {
  const res = await api.get("/follows/incoming/");
  return res.data;
};

// -------------------------------------
// OUTGOING FOLLOW REQUESTS
// GET /follows/outgoing/
// -------------------------------------
export const getOutgoingFollowRequests = async () => {
  const res = await api.get("/follows/outgoing/");
  return res.data;
};

// -------------------------------------
// MY FOLLOW RELATIONS
// GET /follows/
// -------------------------------------
export const getMyFollows = async () => {
  const res = await api.get("/follows/");
  return res.data;
};

// -------------------------------------
// USER FOLLOWERS
// GET /usersfollow/:id/followers/
// -------------------------------------
export const getUserFollowers = async (userId) => {
  const res = await api.get(`/usersfollow/${userId}/followers/`);
  return res.data;
};

// -------------------------------------
// USER FOLLOWING
// GET /usersfollow/:id/following/
// -------------------------------------
export const getUserFollowing = async (userId) => {
  const res = await api.get(`/usersfollow/${userId}/following/`);
  return res.data;
};


export const getMyFollowing = async () => {
  const res = await api.get("/follows/my-following/");
  return res.data;
};
