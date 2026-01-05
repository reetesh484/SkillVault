import axios from "axios";
import { getCSRFToken } from "./utils/csrf";
import {
  getGlobalAccessToken,
  setGlobalAccessToken,
  triggerUnauthorized,
} from "./auth/tokenStore";
import { refreshToken } from "./api/auth";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const refreshClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

//session based auth
// api.interceptors.request.use((config) => {
//   const token = getCSRFToken();
//   if (token) {
//     config.headers["X-CSRFToken"] = token;
//   }
//   return config;
// });

//jwt auth
api.interceptors.request.use(
  (config) => {
    const token = getGlobalAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error.config;
    if (status !== 401) {
      return Promise.reject(error);
    }

    if (
      originalRequest._retry ||
      originalRequest.url?.includes("auth/token/refresh")
    ) {
      triggerUnauthorized();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const accessToken: any = await refreshToken();
    if (!accessToken) {
      triggerUnauthorized();
      return Promise.reject(error);
    }
    setGlobalAccessToken(accessToken);
    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
    return api(originalRequest);
  }
);
