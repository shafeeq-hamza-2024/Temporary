import axios from "axios";

// export const siteURL = "http://68.178.168.255:9006"
// export const siteURL = "http://127.0.0.1:8000";

export const siteURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: `${siteURL}/api`,
});


// ===============================
// REQUEST INTERCEPTOR (JWT)
// ===============================
api.interceptors.request.use(
  (config) => {
    // 1️⃣ Cache-busting for GET requests
    if (config.method?.toLowerCase() === "get") {
      config.params = {
        ...(config.params || {}),
        _t: Date.now(),
      };
    }

    // 2️⃣ Attach JWT access token (EXCEPT public routes)
    const accessToken = localStorage.getItem("access");

    const publicEndpoints = [
      "/login/",
      "/register/",
      "/verify-email/",
      "/resend-verification/",
    ];

    const isPublic = publicEndpoints.some((url) =>
      config.url?.includes(url)
    );

    if (accessToken && !isPublic) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
